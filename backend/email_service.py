import os
import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
from typing import Optional
from dotenv import load_dotenv
import httpx
from database import mark_email_notified

# Explicitly load environment variables
load_dotenv()

logger = logging.getLogger("elab.email")

def generate_email_html(name: str, email: str, message: str, timestamp_str: str) -> str:
    """Generates an archival Lab Notebook styled HTML email template."""
    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #eee8d8; margin: 0; padding: 24px; color: #171b20; }}
    .container {{ max-width: 600px; margin: 0 auto; background: #fdfbf5; border: 1px solid #d4cbb3; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }}
    .header {{ background: #122a43; color: #f4efdf; padding: 20px 24px; border-bottom: 2px solid #cf4a45; }}
    .header h1 {{ margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 0.08em; font-family: 'Courier New', monospace; }}
    .header p {{ margin: 4px 0 0; font-size: 12px; color: #a9c5dc; letter-spacing: 0.06em; font-family: 'Courier New', monospace; }}
    .content {{ padding: 24px; }}
    .meta-box {{ background: rgba(18, 42, 67, 0.04); border: 1px dashed #c5bda9; border-radius: 4px; padding: 14px 18px; margin-bottom: 20px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6; }}
    .meta-label {{ color: #a6312f; font-weight: bold; display: inline-block; width: 90px; }}
    .message-box {{ background: #ffffff; border: 1px solid #dcd5c0; border-left: 4px solid #a6312f; padding: 18px; border-radius: 0 4px 4px 0; margin-bottom: 24px; font-size: 15px; line-height: 1.6; color: #23272d; white-space: pre-wrap; }}
    .btn-container {{ text-align: center; margin: 24px 0 12px; }}
    .reply-btn {{ display: inline-block; background: #122a43; color: #f4efdf !important; text-decoration: none; padding: 12px 28px; border-radius: 4px; font-weight: 600; font-size: 14px; letter-spacing: 0.06em; font-family: 'Courier New', monospace; border: 1px solid #cf4a45; }}
    .footer {{ padding: 16px 24px; background: #eee8d8; border-top: 1px solid #d4cbb3; font-size: 11px; color: #67655d; font-family: 'Courier New', monospace; text-align: center; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>[S/LAB TRANSMISSION DETECTED]</h1>
      <p>NEW SIGNAL LOGGED TO S/LAB PORTFOLIO ARCHIVE</p>
    </div>
    <div class="content">
      <div class="meta-box">
        <div><span class="meta-label">SENDER:</span> <strong>{name}</strong></div>
        <div><span class="meta-label">EMAIL:</span> <a href="mailto:{email}" style="color: #122a43; font-weight: bold;">{email}</a></div>
        <div><span class="meta-label">TIME (UTC):</span> {timestamp_str}</div>
        <div><span class="meta-label">STATUS:</span> <span style="color: #2b8a3e; font-weight: bold;">[STORED IN NEON DB]</span></div>
      </div>

      <div style="font-size: 12px; font-family: 'Courier New', monospace; color: #67655d; margin-bottom: 8px; letter-spacing: 0.08em;">
        TRANSMISSION PAYLOAD:
      </div>
      <div class="message-box">{message}</div>

      <div class="btn-container">
        <a href="mailto:{email}?subject=Re: S/LAB Portfolio Transmission" class="reply-btn">
          REPLY TO {name.upper()}
        </a>
      </div>
    </div>
    <div class="footer">
      S/LAB PORTFOLIO DISPATCH SYSTEM - SECURE NEON POSTGRESQL &bull; {datetime.utcnow().year}
    </div>
  </div>
</body>
</html>
"""

def send_notification_via_resend(
    api_key: str,
    to_email: str,
    from_email: str,
    subject: str,
    html_content: str,
    text_content: str
) -> bool:
    """Dispatches email notification via Resend REST API."""
    print(f"[Email Service / Resend] Preparing email payload for {to_email} from {from_email}...")
    try:
        url = "https://api.resend.com/emails"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "from": from_email,
            "to": [to_email],
            "subject": subject,
            "html": html_content,
            "text": text_content
        }
        with httpx.Client(timeout=10.0) as client:
            resp = client.post(url, json=payload, headers=headers)
            print(f"[Email Service / Resend] Response Status: {resp.status_code}")
            if resp.status_code in (200, 201):
                print(f"[Email Service / Resend] [OK] Email successfully sent! Response: {resp.json()}")
                return True
            else:
                print(f"[Email Service / Resend] [ERROR] Resend returned error ({resp.status_code}): {resp.text}")
                return False
    except Exception as e:
        print(f"[Email Service / Resend] [ERROR] Exception occurred while sending via Resend: {e}")
        return False

def send_notification_via_smtp(
    host: str,
    port: int,
    user: str,
    password: str,
    to_email: str,
    subject: str,
    html_content: str,
    text_content: str
) -> bool:
    """Dispatches email notification via standard SMTP."""
    print(f"[Email Service / SMTP] Connecting to SMTP host {host}:{port} for {to_email}...")
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"S/LAB Signal <{user}>"
        msg["To"] = to_email
        msg["Reply-To"] = to_email

        msg.attach(MIMEText(text_content, "plain"))
        msg.attach(MIMEText(html_content, "html"))

        if port == 465:
            with smtplib.SMTP_SSL(host, port, timeout=12.0) as server:
                server.login(user, password)
                server.sendmail(user, [to_email], msg.as_string())
        else:
            with smtplib.SMTP(host, port, timeout=12.0) as server:
                server.starttls()
                server.login(user, password)
                server.sendmail(user, [to_email], msg.as_string())

        print(f"[Email Service / SMTP] [OK] Email dispatched successfully to {to_email}")
        return True
    except Exception as e:
        print(f"[Email Service / SMTP] [ERROR] SMTP dispatch failed: {e}")
        return False

def send_contact_email_notification(
    name: str,
    email: str,
    message: str,
    submission_id: Optional[int] = None
) -> bool:
    """
    Main dispatch function designed to run inside FastAPI BackgroundTasks.
    """
    print(f"[Email Service] Background notification triggered for transmission from: {name} <{email}>")
    to_email = os.getenv("NOTIFICATION_EMAIL") or os.getenv("SMTP_USER")
    if not to_email:
        print("[Email Service] [WARN] Neither NOTIFICATION_EMAIL nor SMTP_USER is set in environment or .env!")
        return False

    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    subject = f"[S/LAB SIGNAL] New transmission from {name}"
    
    text_content = f"""
S/LAB PORTFOLIO TRANSMISSION RECEIVED
------------------------------------
Sender: {name}
Email: {email}
Time (UTC): {now_str}
DB Record: #{submission_id or 'N/A'}

Message:
{message}
------------------------------------
Reply directly to: {email}
"""
    html_content = generate_email_html(name, email, message, now_str)

    success = False

    # 1. Try Resend if configured
    resend_key = os.getenv("RESEND_API_KEY")
    if resend_key:
        print("[Email Service] RESEND_API_KEY found. Using Resend API...")
        from_email = os.getenv("RESEND_FROM_EMAIL", "S/LAB Signal <onboarding@resend.dev>")
        success = send_notification_via_resend(resend_key, to_email, from_email, subject, html_content, text_content)
    else:
        print("[Email Service] RESEND_API_KEY not found. Checking for SMTP configuration...")

    # 2. Try SMTP if Resend is not configured or failed
    if not success:
        smtp_user = os.getenv("SMTP_USER")
        smtp_pass = os.getenv("SMTP_PASSWORD")
        smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.getenv("SMTP_PORT", "587"))

        if smtp_user and smtp_pass:
            print("[Email Service] SMTP credentials found. Using SMTP...")
            success = send_notification_via_smtp(
                smtp_host, smtp_port, smtp_user, smtp_pass, to_email, subject, html_content, text_content
            )

    # 3. Update DB flag if record ID is available
    if success and submission_id:
        mark_email_notified(submission_id)

    return success

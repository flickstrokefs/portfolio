import os
import sys
from dotenv import load_dotenv

# 1. Load Environment Variables
load_dotenv()

print("=" * 60)
print("S/LAB BACKEND: END-TO-END CONTACT & NOTIFICATION TEST")
print("=" * 60)

db_url = os.getenv("DATABASE_URL")
resend_key = os.getenv("RESEND_API_KEY")
notification_email = os.getenv("NOTIFICATION_EMAIL")
smtp_user = os.getenv("SMTP_USER")

print(f"DATABASE_URL:       {'[CONFIGURED]' if db_url else '[MISSING]'}")
if db_url:
    masked = db_url.split('@')[-1] if '@' in db_url else '***'
    print(f"  -> Host:          {masked}")
print(f"NOTIFICATION_EMAIL: {notification_email or '[MISSING]'}")
print(f"RESEND_API_KEY:     {f'{resend_key[:8]}...' if resend_key else '[MISSING]'}")
print(f"SMTP_USER:          {smtp_user or '[MISSING]'}")
print("-" * 60)

from database import init_db, save_contact_submission, get_connection
from email_service import send_contact_email_notification

# 2. Test DB Initialization
print("\n[STEP 1] Testing Neon Database Connection & Table Init...")
init_success = init_db()
if not init_success:
    print("[ERROR] Database connection or initialization failed.")
    sys.exit(1)

# 3. Test Inserting Record
print("\n[STEP 2] Inserting Test Signal Record into Neon DB...")
test_name = "Signal Test Agent"
test_email = "tester@example.com"
test_msg = "This is a live transmission test verifying Neon DB storage and Resend notification."

sub_id = save_contact_submission(test_name, test_email, test_msg, "127.0.0.1", "TestScript/1.0")
if not sub_id:
    print("[ERROR] Unable to insert record into Neon DB.")
    sys.exit(1)
print(f"[OK] Record #{sub_id} successfully created in Neon PostgreSQL!")

# 4. Test Email Dispatch
print(f"\n[STEP 3] Testing Email Notification Dispatch to: {notification_email}...")
if not notification_email and not smtp_user:
    print("[WARN] Set NOTIFICATION_EMAIL in backend/.env to test email dispatch.")
else:
    email_sent = send_contact_email_notification(test_name, test_email, test_msg, sub_id)
    if email_sent:
        print("[OK] SUCCESS: Email notification dispatched!")
    else:
        print("[ERROR] FAILED: Email notification was not sent. Check the error log above.")

# 5. Verify in DB
print(f"\n[STEP 4] Verifying Record #{sub_id} in Neon DB...")
conn = get_connection()
if conn:
    with conn.cursor() as cur:
        cur.execute(
            "SELECT id, name, email, message, created_at, email_notified FROM contact_submissions WHERE id = %s;",
            (sub_id,)
        )
        row = cur.fetchone()
        print(f"Queried Row in Neon: {row}")
    conn.close()

print("\n" + "=" * 60)
print("TEST RUN COMPLETE!")
print("=" * 60)

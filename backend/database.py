import os
import logging
from datetime import datetime
from typing import Optional
from dotenv import load_dotenv
import psycopg2

# Explicitly load .env file from the backend directory
load_dotenv()

logger = logging.getLogger("elab.database")

def get_db_url() -> Optional[str]:
    url = os.getenv("DATABASE_URL")
    if not url:
        print("[Neon DB] [WARN] DATABASE_URL is not set in environment or .env file!")
        return None
    
    # Standardize postgres:// to postgresql://
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    
    masked_url = url.split('@')[-1] if '@' in url else '***'
    print(f"[Neon DB] Connecting to host: {masked_url}")
    return url

def get_connection():
    db_url = get_db_url()
    if not db_url:
        return None
    try:
        conn = psycopg2.connect(db_url, sslmode="require")
        return conn
    except Exception as e:
        print(f"[Neon DB] [ERROR] Connection error: {e}")
        logger.error(f"[Neon DB] Connection failed: {e}")
        return None

def init_db():
    """Auto-creates the contact_submissions table in Neon PostgreSQL if connected."""
    print("[Neon DB] Initializing database schema...")
    conn = get_connection()
    if not conn:
        print("[Neon DB] [WARN] Cannot initialize tables: No valid DB connection.")
        return False

    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS contact_submissions (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        message TEXT NOT NULL,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        ip_address VARCHAR(100),
                        user_agent TEXT,
                        email_notified BOOLEAN DEFAULT FALSE
                    );
                    CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
                    ON contact_submissions(created_at DESC);
                """)
        print("[Neon DB] [OK] Schema verified: 'contact_submissions' table is READY.")
        return True
    except Exception as e:
        print(f"[Neon DB] [ERROR] Table creation error: {e}")
        logger.error(f"[Neon DB] Failed to initialize table: {e}")
        return False
    finally:
        conn.close()

def save_contact_submission(
    name: str,
    email: str,
    message: str,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None
) -> Optional[int]:
    """Inserts a new transmission record into Neon PostgreSQL."""
    print(f"[Neon DB] Attempting to insert submission from: {name} <{email}>")
    conn = get_connection()
    if not conn:
        print("[Neon DB] [ERROR] Cannot save submission: DB connection is None.")
        return None

    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO contact_submissions (name, email, message, ip_address, user_agent)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    (name, email, message, ip_address, user_agent)
                )
                submission_id = cur.fetchone()[0]
                print(f"[Neon DB] [OK] SUCCESS: Stored submission record ID #{submission_id}")
                return submission_id
    except Exception as e:
        print(f"[Neon DB] [ERROR] Insert failed: {e}")
        logger.error(f"[Neon DB] Insert failed: {e}")
        return None
    finally:
        conn.close()

def mark_email_notified(submission_id: int) -> bool:
    """Updates the record flag to indicate email reminder was dispatched."""
    conn = get_connection()
    if not conn:
        return False

    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    "UPDATE contact_submissions SET email_notified = TRUE WHERE id = %s;",
                    (submission_id,)
                )
                print(f"[Neon DB] Marked record #{submission_id} as email_notified = TRUE")
                return True
    except Exception as e:
        print(f"[Neon DB] [ERROR] Update email_notified failed for #{submission_id}: {e}")
        return False
    finally:
        conn.close()

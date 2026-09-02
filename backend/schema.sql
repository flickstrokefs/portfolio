-- ==============================================================================
-- S/LAB Portfolio: Neon PostgreSQL Database Schema
-- Run this in your Neon SQL Editor or let the FastAPI backend auto-initialize it.
-- ==============================================================================

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

-- Index for chronological sorting and fast dashboard querying
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
ON contact_submissions(created_at DESC);

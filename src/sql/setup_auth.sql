-- SQL Script to ensure the people table has the necessary columns for authentication
-- This script adds the password and email columns if they don't exist

-- Add email column if it doesn't exist (assuming it might be missing)
ALTER TABLE people
ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE NOT NULL;

-- Add password column if it doesn't exist
ALTER TABLE people
ADD COLUMN IF NOT EXISTS password VARCHAR(255) NOT NULL;

-- Example: Insert a test user with hashed password
-- Password is: 'password123'
-- Use the hashPassword utility script to generate your own hashed passwords
-- Run: node src/utils/hashPassword.js yourPasswordHere

-- INSERT INTO people (name, email, password, document_type_id, document_number)
-- VALUES (
--   'Test User',
--   'test@example.com',
--   '$2a$10$YourHashedPasswordHere',
--   1,
--   '12345678'
-- );

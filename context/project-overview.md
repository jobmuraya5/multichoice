# Project Overview

## Goal
Build a secure, premium-looking Next.js dashboard deployed on Vercel that monitors payment transactions stored in Supabase and triggers the Finaswift STK-push API for pending payments every 2 minutes.

## Core Features
1. **Automated STK Pushes**: A Vercel Cron function checks Supabase for 'pending' transactions every 2 minutes and fires an API request to Finaswift.
2. **Payment Dashboard**: A beautiful, dark-mode, glassmorphism UI for administrators to view total collected amounts, pending transactions, and recent STK pushes.
3. **Data Source**: Supabase PostgreSQL database serves as the single source of truth for transaction statuses.

## Target Audience
Administrators and finance teams who need to track STK pushes and payment statuses in real time.

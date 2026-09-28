# Supabase Setup Guide — Digital Plant Knowledge System

This guide outlines how to configure the **Supabase** cloud database for the **Digital Plant Knowledge System (DPKS)**.

---

## Step 1: Create a Free Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in or create an account.
2. Click **New Project**.
3. Fill in the details:
   - **Name:** `Digital-Plant-Knowledge-System` (or `DPKS-Niah`)
   - **Database Password:** (Choose a secure password and save it)
   - **Region:** Select `Southeast Asia (Singapore)` for lowest latency to Sarawak / Malaysia.
4. Click **Create new project** and wait 1–2 minutes for provisioning to finish.

---

## Step 2: Run the Schema & Seed Scripts

1. In your Supabase project dashboard, open the **SQL Editor** from the left navigation bar (icon `>_`).
2. Click **New query**.
3. Open [`supabase/schema.sql`](./schema.sql), copy its entire content, paste it into the SQL Editor, and click **Run** (green button).
   - This creates the `species`, `observations`, `iot_nodes`, and `profiles` tables, enables Row-Level Security (RLS) policies, and creates the `botanical-photos` storage bucket.
4. Click **New query** again.
5. Open [`supabase/seed.sql`](./seed.sql), copy its entire content, paste it into the SQL Editor, and click **Run**.
   - This seeds the database with the 6 authentic Niah National Park plant species, sample field observations, and IoT sensor nodes.

---

## Step 3: Connect Frontend to Supabase

1. In Supabase Dashboard, go to **Project Settings** (gear icon) -> **API**.
2. Find the **Project URL** and the **`anon` `public` API key**.
3. In your local repository `Digital-Plant-Knowledge-System/`, create a file named `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...
   ```
4. Restart your Next.js development server:
   ```powershell
   npm run dev
   ```
5. The application will automatically detect the Supabase credentials and transition from local mock data to your live Supabase cloud database!

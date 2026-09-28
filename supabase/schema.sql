-- ==============================================================================
-- Digital Plant Knowledge System (DPKS) — Supabase PostgreSQL Schema
-- Client / Field: Sarawak Forestry Corporation (SFC) — Niah National Park
-- Unit / Context: COS30049 Computing Technology Innovation Project
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ------------------------------------------------------------------------------
-- 1. Profiles Table (Extends Supabase auth.users with RBAC roles)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'visitor' CHECK (role IN ('visitor', 'botanist', 'conservation_officer', 'admin')),
    agency TEXT DEFAULT 'Sarawak Forestry Corporation',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. Plant Species Registry Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.species (
    id TEXT PRIMARY KEY,
    scientific_name TEXT NOT NULL,
    common_name TEXT NOT NULL,
    family TEXT NOT NULL,
    genus TEXT NOT NULL,
    species TEXT NOT NULL,
    author TEXT,
    local_names TEXT[] DEFAULT '{}',
    conservation_status TEXT NOT NULL CHECK (conservation_status IN ('Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern')),
    iucn_code TEXT NOT NULL CHECK (iucn_code IN ('CR', 'EN', 'VU', 'NT', 'LC')),
    sarawak_protection_status TEXT NOT NULL CHECK (sarawak_protection_status IN ('Totally Protected', 'Protected', 'Unrestricted')),
    growth_habit TEXT NOT NULL,
    height_range TEXT,
    habitat TEXT,
    niah_zone TEXT,
    coordinates_rough JSONB NOT NULL DEFAULT '{"lat": 3.82, "lng": 113.78, "bufferKm": 4.0}',
    coordinates_exact JSONB NOT NULL DEFAULT '{"lat": 3.82, "lng": 113.78, "accuracyMeters": 5.0}',
    description TEXT,
    morphology JSONB NOT NULL DEFAULT '{"leaves": "", "bark": "", "flowers": "", "fruit": ""}',
    ecological_significance TEXT,
    threats TEXT[] DEFAULT '{}',
    photos JSONB NOT NULL DEFAULT '[]',
    qr_uuid TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. Field Ground-Truthing Observations Table (Mobile App -> Cloud Sync)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.observations (
    id TEXT PRIMARY KEY DEFAULT ('obs-' || to_char(NOW(), 'YYYY') || '-' || substr(md5(random()::text), 1, 6)),
    species_id TEXT REFERENCES public.species(id) ON DELETE SET NULL,
    suggested_scientific_name TEXT NOT NULL,
    suggested_family TEXT NOT NULL,
    botanist_name TEXT NOT NULL,
    botanist_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    photo_url TEXT,
    notes TEXT,
    gps_location JSONB NOT NULL,
    review_notes TEXT,
    reviewed_by TEXT,
    reviewed_at TIMESTAMPTZ
);

-- ------------------------------------------------------------------------------
-- 4. IoT Sensor Nodes & Telemetry Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.iot_nodes (
    node_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    zone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'online' CHECK (status IN ('online', 'warning', 'threat_triggered', 'offline')),
    battery_percent INTEGER DEFAULT 100,
    last_heartbeat TIMESTAMPTZ DEFAULT NOW(),
    temperature_c NUMERIC(5, 2),
    humidity_percent NUMERIC(5, 2),
    soil_moisture_percent NUMERIC(5, 2),
    pir_movement_detected BOOLEAN DEFAULT FALSE,
    tilt_alert BOOLEAN DEFAULT FALSE,
    threat_details TEXT
);

-- ------------------------------------------------------------------------------
-- 5. Row-Level Security (RLS) Policies
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.species ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iot_nodes ENABLE ROW LEVEL SECURITY;

-- Species Policies:
-- Anyone (Public & Logged-out) can read species
CREATE POLICY "Public read access for species"
    ON public.species FOR SELECT
    USING (true);

-- Only authenticated staff can insert/update/delete species
CREATE POLICY "Staff can manage species"
    ON public.species FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Observations Policies:
-- Public can view approved observations (for QR / public catalog linkage)
CREATE POLICY "Public read approved observations"
    ON public.observations FOR SELECT
    USING (status = 'approved');

-- Authenticated users (botanists/officers) can read all observations
CREATE POLICY "Authenticated users view all observations"
    ON public.observations FOR SELECT
    TO authenticated
    USING (true);

-- Authenticated botanists can insert observations
CREATE POLICY "Botanists can submit observations"
    ON public.observations FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Conservation Officers and Admins can update/review observations
CREATE POLICY "Officers can review observations"
    ON public.observations FOR UPDATE
    TO authenticated
    USING (true);

-- IoT Nodes Policies:
-- Anyone can view node metrics in dashboard
CREATE POLICY "Allow read access to IoT telemetry"
    ON public.iot_nodes FOR SELECT
    USING (true);

-- Authenticated devices/admins can insert/update telemetry
CREATE POLICY "Allow update access to IoT nodes"
    ON public.iot_nodes FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 6. Trigger to automatically create profile on Supabase auth signup
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role, agency)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'visitor'),
        COALESCE(NEW.raw_user_meta_data->>'agency', 'Sarawak Forestry Corporation')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 7. Supabase Storage Bucket Setup
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('botanical-photos', 'botanical-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Public Read
CREATE POLICY "Public read botanical photos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'botanical-photos');

-- Storage Policy: Authenticated Upload
CREATE POLICY "Authenticated upload botanical photos"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'botanical-photos');

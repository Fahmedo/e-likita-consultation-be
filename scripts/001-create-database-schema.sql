-- e-Likita Hospital Consultation Assistant Database Schema
-- This script creates the initial database structure

-- Create database (run this separately if needed)
-- CREATE DATABASE e_likita;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE consultation_status AS ENUM (
    'started',
    'patient_info_completed',
    'symptoms_assessed',
    'follow_ups_completed',
    'completed'
);

CREATE TYPE urgency_level AS ENUM (
    'low',
    'moderate',
    'high',
    'emergency'
);

CREATE TYPE recommendation_type AS ENUM (
    'self_care',
    'pharmacy_visit',
    'gp_appointment',
    'urgent_care',
    'emergency_room',
    'specialist_referral'
);

-- Create patients table
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
    phone_number VARCHAR(15),
    email VARCHAR(255),
    address TEXT,
    emergency_contact_name VARCHAR(50),
    emergency_contact_phone VARCHAR(15),
    medical_history TEXT,
    current_medications TEXT,
    allergies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create consultations table
CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    status consultation_status DEFAULT 'started',
    urgency_level urgency_level,
    chief_complaint TEXT,
    present_illness_history TEXT,
    pain_scale INTEGER CHECK (pain_scale >= 1 AND pain_scale <= 10),
    additional_notes TEXT,
    vital_signs JSONB,
    follow_up_instructions TEXT,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create symptoms table
CREATE TABLE symptoms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    related_symptoms TEXT[],
    risk_factors JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create symptom_assessments table
CREATE TABLE symptom_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
    symptom_id UUID REFERENCES symptoms(id),
    symptom_name VARCHAR(100) NOT NULL,
    severity INTEGER CHECK (severity >= 1 AND severity <= 10),
    duration INTEGER,
    duration_unit VARCHAR(20) CHECK (duration_unit IN ('hours', 'days', 'weeks', 'months')),
    description TEXT,
    triggers TEXT,
    relieving_factors TEXT,
    associated_symptoms JSONB,
    location JSONB,
    is_chief_complaint BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create recommendation_templates table
CREATE TABLE recommendation_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type recommendation_type NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium',
    instructions TEXT,
    precautions TEXT,
    follow_up_timeframe TEXT,
    trigger_symptoms TEXT[],
    trigger_conditions TEXT[],
    criteria JSONB,
    resources JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create recommendations table
CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
    type recommendation_type NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium',
    instructions TEXT,
    precautions TEXT,
    follow_up_timeframe TEXT,
    resources JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_patients_name ON patients(first_name, last_name);
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_consultations_patient_id ON consultations(patient_id);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created_at ON consultations(created_at);
CREATE INDEX idx_symptoms_name ON symptoms(name);
CREATE INDEX idx_symptoms_category ON symptoms(category);
CREATE INDEX idx_symptom_assessments_consultation_id ON symptom_assessments(consultation_id);
CREATE INDEX idx_symptom_assessments_symptom_id ON symptom_assessments(symptom_id);
CREATE INDEX idx_recommendations_consultation_id ON recommendations(consultation_id);
CREATE INDEX idx_recommendations_type ON recommendations(type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_symptoms_updated_at BEFORE UPDATE ON symptoms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recommendation_templates_updated_at BEFORE UPDATE ON recommendation_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Seed initial data for e-Likita Hospital Consultation Assistant

-- Insert common symptoms
INSERT INTO symptoms (name, description, category, related_symptoms) VALUES
('Fever', 'Elevated body temperature above normal range', 'General', ARRAY['chills', 'sweating', 'fatigue']),
('Headache', 'Pain in the head or upper neck', 'Neurological', ARRAY['nausea', 'sensitivity to light', 'dizziness']),
('Chest Pain', 'Discomfort or pain in the chest area', 'Cardiovascular', ARRAY['shortness of breath', 'sweating', 'nausea']),
('Cough', 'Sudden expulsion of air from the lungs', 'Respiratory', ARRAY['sore throat', 'fever', 'shortness of breath']),
('Shortness of Breath', 'Difficulty breathing or feeling breathless', 'Respiratory', ARRAY['chest pain', 'wheezing', 'fatigue']),
('Nausea', 'Feeling of sickness with inclination to vomit', 'Gastrointestinal', ARRAY['vomiting', 'dizziness', 'abdominal pain']),
('Abdominal Pain', 'Pain in the stomach area', 'Gastrointestinal', ARRAY['nausea', 'vomiting', 'bloating']),
('Dizziness', 'Feeling unsteady or lightheaded', 'Neurological', ARRAY['headache', 'nausea', 'fatigue']),
('Fatigue', 'Extreme tiredness or exhaustion', 'General', ARRAY['weakness', 'drowsiness', 'difficulty concentrating']),
('Sore Throat', 'Pain or irritation in the throat', 'Respiratory', ARRAY['cough', 'fever', 'difficulty swallowing']);

-- Insert recommendation templates
INSERT INTO recommendation_templates (
    name, type, title, description, priority, instructions, precautions, 
    follow_up_timeframe, trigger_symptoms, criteria
) VALUES
(
    'Emergency Chest Pain',
    'emergency_room',
    'Seek Emergency Care Immediately',
    'Chest pain can indicate a serious cardiac condition requiring immediate medical attention.',
    'urgent',
    'Call emergency services (911) or go to the nearest emergency room immediately. Do not drive yourself.',
    'Do not ignore chest pain, especially if accompanied by shortness of breath, sweating, or nausea.',
    'Immediate',
    ARRAY['chest pain', 'chest discomfort'],
    '{"urgencyLevels": ["high", "emergency"], "severityRange": {"min": 7}}'::jsonb
),
(
    'High Fever Management',
    'urgent_care',
    'Seek Urgent Medical Care for High Fever',
    'High fever may indicate a serious infection requiring prompt medical evaluation.',
    'high',
    'Visit an urgent care center or emergency room if fever is above 103°F (39.4°C).',
    'Monitor for signs of dehydration, difficulty breathing, or altered mental status.',
    'Within 2-4 hours',
    ARRAY['fever', 'high temperature'],
    '{"urgencyLevels": ["high"], "severityRange": {"min": 8}}'::jsonb
),
(
    'Moderate Fever Self-Care',
    'self_care',
    'Home Management for Moderate Fever',
    'Moderate fever can often be managed at home with proper care and monitoring.',
    'medium',
    'Rest, drink plenty of fluids, and consider over-the-counter fever reducers as appropriate. Monitor temperature regularly.',
    'Seek medical care if fever persists for more than 3 days or exceeds 103°F (39.4°C).',
    'Monitor for 24-48 hours',
    ARRAY['fever'],
    '{"urgencyLevels": ["low", "moderate"], "severityRange": {"max": 7}}'::jsonb
),
(
    'Persistent Cough',
    'gp_appointment',
    'Schedule Appointment for Persistent Cough',
    'A persistent cough should be evaluated by a healthcare provider to determine the underlying cause.',
    'medium',
    'Schedule an appointment with your primary care provider within the next few days.',
    'Seek immediate care if cough is accompanied by blood, severe shortness of breath, or high fever.',
    'Within 2-3 days',
    ARRAY['cough', 'persistent cough'],
    '{"urgencyLevels": ["moderate"]}'::jsonb
),
(
    'Severe Headache',
    'urgent_care',
    'Urgent Care for Severe Headache',
    'Severe headaches, especially if sudden or different from usual patterns, require prompt evaluation.',
    'high',
    'Visit urgent care or emergency room for evaluation, especially if headache is sudden, severe, or accompanied by other symptoms.',
    'Seek immediate care if headache is accompanied by fever, stiff neck, confusion, or vision changes.',
    'Within 2-4 hours',
    ARRAY['headache', 'severe headache'],
    '{"urgencyLevels": ["high"], "severityRange": {"min": 8}}'::jsonb
),
(
    'Mild Headache Self-Care',
    'self_care',
    'Self-Care for Mild Headache',
    'Mild headaches can often be managed with rest and over-the-counter medications.',
    'low',
    'Rest in a quiet, dark room. Stay hydrated and consider over-the-counter pain relievers as appropriate.',
    'Seek medical care if headaches become frequent, severe, or are accompanied by other concerning symptoms.',
    'Monitor for 24 hours',
    ARRAY['headache', 'mild headache'],
    '{"urgencyLevels": ["low"], "severityRange": {"max": 5}}'::jsonb
);

-- Insert sample patient (for testing purposes)
INSERT INTO patients (
    first_name, last_name, date_of_birth, gender, phone_number, email, address
) VALUES (
    'John',
    'Doe',
    '1985-06-15',
    'male',
    '+1-555-0123',
    'john.doe@email.com',
    '123 Main Street, Anytown, ST 12345'
);

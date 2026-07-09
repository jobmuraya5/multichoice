-- Create a settings table to store the automation toggle state
CREATE TABLE public.settings (
    id INT PRIMARY KEY,
    auto_process_enabled BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the initial configuration row (ID = 1)
INSERT INTO public.settings (id, auto_process_enabled) VALUES (1, false);

-- Function to update the updated_at timestamp (optional, reusing from previous)
CREATE OR REPLACE FUNCTION update_settings_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION update_settings_updated_at_column();

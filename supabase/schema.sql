-- Create the transactions table
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    msisdn VARCHAR(20) NOT NULL,
    reference VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    finaswift_response JSONB -- optional column to store the API response for debugging
);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function on update
CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Optional: Enable Row Level Security (RLS) if you plan to query directly from the frontend securely,
-- but since this is an admin dashboard, we can use the Service Role Key or require authenticated users.
-- ALter table public.transactions enable row level security;

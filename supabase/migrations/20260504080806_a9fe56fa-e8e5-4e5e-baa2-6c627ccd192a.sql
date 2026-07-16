
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  concern TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone (anon + authenticated) can insert a lead
CREATE POLICY "Anyone can submit a lead"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND char_length(phone) BETWEEN 5 AND 32
    AND (concern IS NULL OR char_length(concern) <= 64)
    AND (source IS NULL OR char_length(source) <= 128)
  );

-- No SELECT/UPDATE/DELETE policies = no public read/modify access

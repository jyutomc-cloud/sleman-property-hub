-- Create enum for property type
CREATE TYPE public.property_type AS ENUM ('rumah', 'tanah');

-- Create sellers table
CREATE TABLE public.sellers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type property_type NOT NULL DEFAULT 'rumah',
  price BIGINT NOT NULL,
  location TEXT NOT NULL,
  kecamatan TEXT NOT NULL,
  land_area INTEGER NOT NULL,
  building_area INTEGER,
  bedrooms INTEGER,
  bathrooms INTEGER,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  seller_id UUID REFERENCES public.sellers(id) ON DELETE SET NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Properties are publicly readable"
  ON public.properties FOR SELECT USING (true);

CREATE POLICY "Sellers are publicly readable"
  ON public.sellers FOR SELECT USING (true);

-- Anyone can insert (for sell form)
CREATE POLICY "Anyone can insert properties"
  ON public.properties FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert sellers"
  ON public.sellers FOR INSERT WITH CHECK (true);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX idx_properties_type ON public.properties(type);
CREATE INDEX idx_properties_kecamatan ON public.properties(kecamatan);
CREATE INDEX idx_properties_featured ON public.properties(featured);
CREATE INDEX idx_properties_price ON public.properties(price);

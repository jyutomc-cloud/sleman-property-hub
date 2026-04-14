import { supabase } from "@/integrations/supabase/client";

export interface Property {
  id: string;
  title: string;
  type: "rumah" | "tanah";
  price: number;
  location: string;
  kecamatan: string;
  landArea: number;
  buildingArea?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  description: string;
  longDescription: string;
  images: string[];
  seller: {
    id: string;
    name: string;
    phone: string;
    photo: string | null;
  } | null;
  featured: boolean;
}

export function formatPrice(price: number): string {
  return "Rp " + price.toLocaleString("id-ID");
}

export function getWhatsAppUrl(phone: string, propertyTitle: string): string {
  const message = encodeURIComponent(`Halo saya tertarik dengan ${propertyTitle} di SLM Properti`);
  return `https://wa.me/${phone}?text=${message}`;
}

function mapRow(row: any): Property {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    price: row.price,
    location: row.location,
    kecamatan: row.kecamatan,
    landArea: row.land_area,
    buildingArea: row.building_area,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    description: row.description,
    longDescription: row.long_description,
    images: row.images,
    seller: row.sellers ? {
      id: row.sellers.id,
      name: row.sellers.name,
      phone: row.sellers.phone,
      photo: row.sellers.photo,
    } : null,
    featured: row.featured,
  };
}

export async function fetchProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, sellers(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, sellers(*)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

export async function fetchFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, sellers(*)")
    .eq("featured", true)
    .limit(6);
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function insertProperty(property: {
  title: string;
  type: "rumah" | "tanah";
  price: number;
  location: string;
  kecamatan: string;
  landArea: number;
  buildingArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  longDescription: string;
  images: string[];
  sellerName: string;
  sellerPhone: string;
}): Promise<void> {
  // Insert seller first
  const { data: seller, error: sellerError } = await supabase
    .from("sellers")
    .insert({ name: property.sellerName, phone: property.sellerPhone })
    .select()
    .single();
  if (sellerError) throw sellerError;

  const { error } = await supabase.from("properties").insert({
    title: property.title,
    type: property.type,
    price: property.price,
    location: property.location,
    kecamatan: property.kecamatan || "Sleman",
    land_area: property.landArea,
    building_area: property.buildingArea || null,
    bedrooms: property.bedrooms || null,
    bathrooms: property.bathrooms || null,
    description: property.description,
    long_description: property.longDescription || property.description,
    images: property.images,
    seller_id: seller.id,
  });
  if (error) throw error;
}

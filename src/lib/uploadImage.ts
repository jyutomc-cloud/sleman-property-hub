import { supabase } from "@/integrations/supabase/client";

export async function uploadPropertyImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const path = `properties/${fileName}`;

  const { error } = await supabase.storage
    .from("property-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const { data } = supabase.storage
    .from("property-images")
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  const uploads = files.map((f) => uploadPropertyImage(f));
  return Promise.all(uploads);
}

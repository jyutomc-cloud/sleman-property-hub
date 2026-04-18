import { useState } from "react";
import { Upload, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { formatPrice, insertProperty } from "@/data/properties";
import { uploadMultipleImages } from "@/lib/uploadImage";

interface FormData {
  type: "rumah" | "tanah";
  title: string;
  price: string;
  location: string;
  kecamatan: string;
  landArea: string;
  buildingArea: string;
  bedrooms: string;
  bathrooms: string;
  description: string;
  sellerName: string;
  sellerPhone: string;
}

const kecamatanList = ["Ngaglik", "Depok", "Gamping", "Mlati", "Tempel", "Turi", "Seyegan", "Berbah"];

const initial: FormData = {
  type: "rumah", title: "", price: "", location: "", kecamatan: "",
  landArea: "", buildingArea: "", bedrooms: "", bathrooms: "",
  description: "", sellerName: "", sellerPhone: "",
};

export default function JualPropertiPage() {
  const [form, setForm] = useState<FormData>(initial);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const set = (key: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (imageFiles.length + files.length > 10) {
      toast.error("Maksimal 10 foto");
      return;
    }
    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreviews((prev) => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.title.trim()) e.title = "Judul wajib diisi";
    if (!form.price || Number(form.price) <= 0) e.price = "Harga wajib diisi";
    if (!form.location.trim()) e.location = "Lokasi wajib diisi";
    if (!form.kecamatan) e.kecamatan = "Kecamatan wajib dipilih";
    if (!form.landArea || Number(form.landArea) <= 0) e.landArea = "Luas tanah wajib diisi";
    if (!form.description.trim()) e.description = "Deskripsi wajib diisi";
    if (!form.sellerName.trim()) e.sellerName = "Nama wajib diisi";
    if (!/^62\d{8,13}$/.test(form.sellerPhone)) e.sellerPhone = "Format nomor WA: 62xxx (contoh: 628123456789)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }
    setIsSubmitting(true);
    try {
      let imageUrls: string[] = ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"];
      
      if (imageFiles.length > 0) {
        toast.info("Mengupload gambar...");
        imageUrls = await uploadMultipleImages(imageFiles);
      }

      await insertProperty({
        title: form.title,
        type: form.type,
        price: Number(form.price),
        location: form.location,
        kecamatan: form.kecamatan,
        landArea: Number(form.landArea),
        buildingArea: form.buildingArea ? Number(form.buildingArea) : undefined,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
        description: form.description,
        longDescription: form.description,
        images: imageUrls,
        sellerName: form.sellerName,
        sellerPhone: form.sellerPhone,
      });
      setSubmitted(true);
      toast.success("Properti berhasil disubmit!");
    } catch (err) {
      toast.error("Gagal menyimpan properti. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container flex flex-col items-center justify-center py-20 text-center">
          <CheckCircle className="h-16 w-16 text-primary" />
          <h2 className="mt-4 text-2xl font-bold">Properti Berhasil Disubmit!</h2>
          <p className="mt-2 text-muted-foreground">Properti Anda sudah tersimpan dan foto telah diupload ke cloud.</p>
          <Button className="mt-6" onClick={() => { setSubmitted(false); setForm(initial); setImageFiles([]); setImagePreviews([]); }}>
            Tambah Properti Lain
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const inputCls = "h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const errorCls = "mt-1 text-xs text-destructive";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container max-w-3xl py-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Jual Properti</h1>
        <p className="mt-1 text-muted-foreground">Pasang iklan properti Anda secara gratis — foto tersimpan permanen di cloud</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Tipe Properti *</label>
              <select value={form.type} onChange={(e) => set("type", e.target.value as "rumah" | "tanah")} className={inputCls + " mt-1"}>
                <option value="rumah">Rumah</option>
                <option value="tanah">Tanah</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Kecamatan *</label>
              <select value={form.kecamatan} onChange={(e) => set("kecamatan", e.target.value)} className={inputCls + " mt-1"}>
                <option value="">Pilih Kecamatan</option>
                {kecamatanList.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
              {errors.kecamatan && <p className={errorCls}>{errors.kecamatan}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Judul Iklan *</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputCls + " mt-1"} placeholder="Rumah Minimalis 2 Lantai Ngaglik" maxLength={40} />
            {errors.title && <p className={errorCls}>{errors.title}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Harga (Rp) *</label>
            <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} className={inputCls + " mt-1"} placeholder="850000000" />
            {form.price && Number(form.price) > 0 && <p className="mt-1 text-xs text-muted-foreground">{formatPrice(Number(form.price))}</p>}
            {errors.price && <p className={errorCls}>{errors.price}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Lokasi Detail *</label>
            <textarea value={form.location} onChange={(e) => set("location", e.target.value)} className={inputCls + " mt-1 h-20 py-2"} placeholder="Jl. Kaliurang Km 12, Ngaglik, Sleman" />
            {errors.location && <p className={errorCls}>{errors.location}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Luas Tanah (m²) *</label>
              <input type="number" value={form.landArea} onChange={(e) => set("landArea", e.target.value)} className={inputCls + " mt-1"} />
              {errors.landArea && <p className={errorCls}>{errors.landArea}</p>}
            </div>
            {form.type === "rumah" && (
              <div>
                <label className="text-sm font-medium">Luas Bangunan (m²)</label>
                <input type="number" value={form.buildingArea} onChange={(e) => set("buildingArea", e.target.value)} className={inputCls + " mt-1"} />
              </div>
            )}
          </div>

          {form.type === "rumah" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Kamar Tidur</label>
                <input type="number" value={form.bedrooms} onChange={(e) => set("bedrooms", e.target.value)} className={inputCls + " mt-1"} />
              </div>
              <div>
                <label className="text-sm font-medium">Kamar Mandi</label>
                <input type="number" value={form.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} className={inputCls + " mt-1"} />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Deskripsi Lengkap *</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} className={inputCls + " mt-1 h-32 py-2"} placeholder="Deskripsikan properti Anda secara detail..." />
            {errors.description && <p className={errorCls}>{errors.description}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Foto Properti (max 10) — disimpan permanen di cloud</label>
            <div className="mt-2 rounded-lg border-2 border-dashed p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Drag & drop atau klik untuk upload</p>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="mt-2 text-sm" />
            </div>
            {imagePreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {imagePreviews.map((img, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-md">
                    <img src={img} alt="" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 group-hover:opacity-100">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg border bg-accent/50 p-4">
            <h3 className="font-semibold">Data Penjual</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Nama *</label>
                <input value={form.sellerName} onChange={(e) => set("sellerName", e.target.value)} className={inputCls + " mt-1"} placeholder="Nama Lengkap" />
                {errors.sellerName && <p className={errorCls}>{errors.sellerName}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">Nomor WhatsApp *</label>
                <input value={form.sellerPhone} onChange={(e) => set("sellerPhone", e.target.value)} className={inputCls + " mt-1"} placeholder="6285137387259" />
                {errors.sellerPhone && <p className={errorCls}>{errors.sellerPhone}</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => { if (validate()) setShowPreview(!showPreview); }}>
              {showPreview ? "Tutup Preview" : "Preview"}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Mengupload & Menyimpan..." : "Submit Properti"}
            </Button>
          </div>
        </form>

        {showPreview && (
          <div className="mt-6 rounded-lg border bg-card p-6">
            <h3 className="font-bold text-lg">{form.title || "Judul Properti"}</h3>
            <p className="text-primary font-bold mt-1">{form.price ? formatPrice(Number(form.price)) : "Rp -"}</p>
            <p className="text-sm text-muted-foreground mt-1">{form.location}</p>
            <p className="text-sm mt-3">{form.description}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

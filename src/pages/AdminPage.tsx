import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Trash2, Star, StarOff, LogOut, Search, Edit2, Eye, X, Upload, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProperties } from "@/hooks/useProperties";
import { Property, formatPrice } from "@/data/properties";
import { supabase } from "@/integrations/supabase/client";
import { uploadMultipleImages } from "@/lib/uploadImage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQueryClient } from "@tanstack/react-query";

interface EditForm {
  title: string;
  price: string;
  description: string;
  longDescription: string;
  location: string;
  kecamatan: string;
  landArea: string;
  buildingArea: string;
  bedrooms: string;
  bathrooms: string;
  type: "rumah" | "tanah";
  images: string[];
}

function EditModal({ property, onClose, onSaved }: { property: Property; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<EditForm>({
    title: property.title,
    price: String(property.price),
    description: property.description,
    longDescription: property.longDescription,
    location: property.location,
    kecamatan: property.kecamatan,
    landArea: String(property.landArea),
    buildingArea: property.buildingArea ? String(property.buildingArea) : "",
    bedrooms: property.bedrooms ? String(property.bedrooms) : "",
    bathrooms: property.bathrooms ? String(property.bathrooms) : "",
    type: property.type,
    images: [...property.images],
  });
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const set = (key: keyof EditForm, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const removeExistingImage = (idx: number) => setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const handleNewImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const total = form.images.length + newFiles.length + files.length;
    if (total > 10) { toast.error("Maksimal 10 foto"); return; }
    const arr = Array.from(files);
    setNewFiles((p) => [...p, ...arr]);
    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => setNewPreviews((p) => [...p, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (idx: number) => {
    setNewFiles((p) => p.filter((_, i) => i !== idx));
    setNewPreviews((p) => p.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.price || Number(form.price) <= 0) {
      toast.error("Judul dan harga wajib diisi");
      return;
    }
    setSaving(true);
    try {
      let allImages = [...form.images];
      if (newFiles.length > 0) {
        toast.info("Mengupload gambar baru...");
        const uploaded = await uploadMultipleImages(newFiles);
        allImages = [...allImages, ...uploaded];
      }
      if (allImages.length === 0) {
        allImages = ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"];
      }

      const { error } = await supabase.from("properties").update({
        title: form.title,
        price: Number(form.price),
        description: form.description,
        long_description: form.longDescription,
        location: form.location,
        kecamatan: form.kecamatan,
        land_area: Number(form.landArea),
        building_area: form.buildingArea ? Number(form.buildingArea) : null,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        type: form.type,
        images: allImages,
      }).eq("id", property.id);

      if (error) throw error;
      toast.success("Properti berhasil diperbarui!");
      onSaved();
    } catch (err) {
      toast.error("Gagal menyimpan perubahan");
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const kecamatanList = ["Ngaglik", "Depok", "Gamping", "Mlati", "Tempel", "Turi", "Seyegan", "Berbah"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/50 p-4 pt-16">
      <div className="w-full max-w-2xl rounded-lg border bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Edit Properti</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>

        <div className="mt-6 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Tipe Properti</label>
              <select value={form.type} onChange={(e) => set("type", e.target.value as "rumah" | "tanah")} className={inputCls + " mt-1"}>
                <option value="rumah">Rumah</option>
                <option value="tanah">Tanah</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Kecamatan</label>
              <select value={form.kecamatan} onChange={(e) => set("kecamatan", e.target.value)} className={inputCls + " mt-1"}>
                {kecamatanList.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Judul</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputCls + " mt-1"} maxLength={40} />
          </div>

          <div>
            <label className="text-sm font-medium">Harga (Rp)</label>
            <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} className={inputCls + " mt-1"} />
            {form.price && Number(form.price) > 0 && <p className="mt-1 text-xs text-muted-foreground">{formatPrice(Number(form.price))}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Lokasi</label>
            <input value={form.location} onChange={(e) => set("location", e.target.value)} className={inputCls + " mt-1"} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Luas Tanah (m²)</label>
              <input type="number" value={form.landArea} onChange={(e) => set("landArea", e.target.value)} className={inputCls + " mt-1"} />
            </div>
            <div>
              <label className="text-sm font-medium">Luas Bangunan (m²)</label>
              <input type="number" value={form.buildingArea} onChange={(e) => set("buildingArea", e.target.value)} className={inputCls + " mt-1"} />
            </div>
          </div>

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

          <div>
            <label className="text-sm font-medium">Deskripsi Singkat</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} className={inputCls + " mt-1 h-20 py-2"} />
          </div>

          <div>
            <label className="text-sm font-medium">Deskripsi Lengkap</label>
            <textarea value={form.longDescription} onChange={(e) => set("longDescription", e.target.value)} className={inputCls + " mt-1 h-32 py-2"} />
          </div>

          {/* Existing images */}
          <div>
            <label className="text-sm font-medium">Foto Saat Ini</label>
            {form.images.length > 0 ? (
              <div className="mt-2 grid grid-cols-5 gap-2">
                {form.images.map((img, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-md">
                    <img src={img} alt="" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removeExistingImage(i)} className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 group-hover:opacity-100">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-1 text-xs text-muted-foreground">Tidak ada foto</p>
            )}
          </div>

          {/* Add new images */}
          <div>
            <label className="text-sm font-medium">Tambah Foto Baru</label>
            <div className="mt-2 rounded-lg border-2 border-dashed p-4 text-center">
              <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
              <input type="file" accept="image/*" multiple onChange={handleNewImages} className="mt-2 text-sm" />
            </div>
            {newPreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-5 gap-2">
                {newPreviews.map((img, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-md">
                    <img src={img} alt="" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removeNewImage(i)} className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 group-hover:opacity-100">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { data: properties = [], isLoading } = useProperties();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "rumah" | "tanah">("all");
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-destructive">Akses Ditolak</h1>
          <p className="mt-2 text-muted-foreground">Anda tidak memiliki akses admin. Hubungi administrator untuk mendapatkan akses.</p>
          <Button className="mt-4" onClick={() => navigate("/")}>Kembali ke Beranda</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const filtered = properties.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || p.type === filterType;
    return matchSearch && matchType;
  });

  const toggleFeatured = async (id: string, current: boolean) => {
    const { error } = await supabase.from("properties").update({ featured: !current }).eq("id", id);
    if (error) {
      toast.error("Gagal mengubah status unggulan");
    } else {
      toast.success(current ? "Dihapus dari unggulan" : "Ditambahkan ke unggulan");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    }
  };

  const deleteProperty = async (id: string, title: string) => {
    if (!confirm(`Hapus properti "${title}"?`)) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) {
      toast.error("Gagal menghapus properti");
    } else {
      toast.success("Properti berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const inputCls = "h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Admin Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Kelola semua properti SLM Properti</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/jual-properti")}>
              + Tambah Properti
            </Button>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Keluar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Properti</p>
            <p className="text-2xl font-bold text-primary">{properties.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Rumah</p>
            <p className="text-2xl font-bold text-primary">{properties.filter((p) => p.type === "rumah").length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Tanah</p>
            <p className="text-2xl font-bold text-primary">{properties.filter((p) => p.type === "tanah").length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className={inputCls + " pl-9"} placeholder="Cari properti..." />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value as any)} className={inputCls + " w-auto"}>
            <option value="all">Semua Tipe</option>
            <option value="rumah">Rumah</option>
            <option value="tanah">Tanah</option>
          </select>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="mt-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 animate-pulse rounded bg-muted" />)}
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Properti</th>
                  <th className="hidden p-3 text-left font-medium sm:table-cell">Tipe</th>
                  <th className="hidden p-3 text-left font-medium md:table-cell">Lokasi</th>
                  <th className="p-3 text-left font-medium">Harga</th>
                  <th className="p-3 text-center font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b transition-colors hover:bg-muted/30">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="h-12 w-16 rounded object-cover" />
                        <div>
                          <p className="font-medium line-clamp-1">{p.title}</p>
                          <p className="text-xs text-muted-foreground sm:hidden">{p.type === "rumah" ? "Rumah" : "Tanah"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden p-3 sm:table-cell">
                      <Badge variant={p.type === "rumah" ? "default" : "secondary"}>
                        {p.type === "rumah" ? "Rumah" : "Tanah"}
                      </Badge>
                    </td>
                    <td className="hidden p-3 text-muted-foreground md:table-cell">{p.kecamatan}</td>
                    <td className="p-3 font-medium text-primary">{formatPrice(p.price)}</td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/properti/${p.id}`)} title="Lihat">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setEditingProperty(p)} title="Edit">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => toggleFeatured(p.id, p.featured)} title={p.featured ? "Hapus dari unggulan" : "Jadikan unggulan"}>
                          {p.featured ? <Star className="h-4 w-4 fill-amber-500 text-amber-500" /> : <StarOff className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteProperty(p.id, p.title)} title="Hapus" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">Tidak ada properti ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingProperty && (
        <EditModal
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
          onSaved={() => {
            setEditingProperty(null);
            queryClient.invalidateQueries({ queryKey: ["properties"] });
          }}
        />
      )}

      <Footer />
    </div>
  );
}

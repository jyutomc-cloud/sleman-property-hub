import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Trash2, Star, StarOff, LogOut, Search, Edit2, Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProperties } from "@/hooks/useProperties";
import { formatPrice } from "@/data/properties";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { data: properties = [], isLoading } = useProperties();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "rumah" | "tanah">("all");
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
                        <Button variant="ghost" size="icon" onClick={() => toggleFeatured(p.id, p.featured)} title={p.featured ? "Hapus dari unggulan" : "Jadikan unggulan"}>
                          {p.featured ? <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> : <StarOff className="h-4 w-4" />}
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
      <Footer />
    </div>
  );
}

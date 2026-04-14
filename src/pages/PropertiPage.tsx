import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SearchFilter from "@/components/SearchFilter";
import { useProperties } from "@/hooks/useProperties";

const PAGE_SIZE = 9;

export default function PropertiPage() {
  const [searchParams] = useSearchParams();
  const [type, setType] = useState(searchParams.get("type") || "");
  const [kecamatan, setKecamatan] = useState(searchParams.get("kecamatan") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(1);

  const { data: properties = [], isLoading } = useProperties();

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (type && p.type !== type) return false;
      if (kecamatan && p.kecamatan !== kecamatan) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [properties, type, kecamatan, minPrice, maxPrice, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(0, page * PAGE_SIZE);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Semua Properti</h1>
        <p className="mt-1 text-muted-foreground">{filtered.length} properti ditemukan</p>

        <div className="mt-6">
          <SearchFilter
            type={type} setType={setType}
            kecamatan={kecamatan} setKecamatan={setKecamatan}
            minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            search={search} setSearch={setSearch}
          />
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}

        {!isLoading && paginated.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">Tidak ada properti yang sesuai filter.</p>
        )}

        {page < totalPages && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

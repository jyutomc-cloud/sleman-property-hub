import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchFilterProps {
  type: string;
  setType: (v: string) => void;
  kecamatan: string;
  setKecamatan: (v: string) => void;
  minPrice: string;
  setMinPrice: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
}

const kecamatanList = ["Ngaglik", "Depok", "Gamping", "Mlati", "Tempel", "Turi", "Seyegan", "Berbah"];

export default function SearchFilter(props: SearchFilterProps) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari properti..."
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Type */}
        <select
          value={props.type}
          onChange={(e) => props.setType(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Semua Tipe</option>
          <option value="rumah">Rumah</option>
          <option value="tanah">Tanah</option>
        </select>

        {/* Kecamatan */}
        <select
          value={props.kecamatan}
          onChange={(e) => props.setKecamatan(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Semua Lokasi</option>
          {kecamatanList.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>

        {/* Price Range */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Harga Min"
            value={props.minPrice}
            onChange={(e) => props.setMinPrice(e.target.value)}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="number"
            placeholder="Harga Max"
            value={props.maxPrice}
            onChange={(e) => props.setMaxPrice(e.target.value)}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>
  );
}

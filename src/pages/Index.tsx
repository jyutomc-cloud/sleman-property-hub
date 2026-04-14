import { Link } from "react-router-dom";
import { Search, Shield, MapPin, Users, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { useState } from "react";

const stats = [
  { label: "Properti Tersedia", value: "30+", icon: TrendingUp },
  { label: "Klien Puas", value: "50+", icon: Users },
  { label: "Tahun Pengalaman", value: "5+", icon: Shield },
];

const values = [
  { icon: Shield, title: "Terpercaya", desc: "Semua properti terverifikasi dengan legalitas lengkap dan transparan" },
  { icon: MapPin, title: "Lokasi Strategis", desc: "Pilihan properti di lokasi terbaik kawasan Sleman, Yogyakarta" },
  { icon: Users, title: "Tim Profesional", desc: "Didukung tim agen berpengalaman yang siap membantu Anda" },
  { icon: TrendingUp, title: "Harga Terbaik", desc: "Penawaran harga kompetitif dengan nilai investasi yang menjanjikan" },
];

export default function HomePage() {
  const featured = properties.filter((p) => p.featured).slice(0, 6);
  const [heroSearch, setHeroSearch] = useState("");

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
            alt="Properti Sleman"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 container text-center">
          <h1 className="text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl animate-fade-in">
            Temukan Properti Impian<br />di Sleman
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Rumah & Tanah Kavling Terbaik di Yogyakarta
          </p>
          <div className="mx-auto mt-8 flex max-w-lg animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari berdasarkan lokasi, tipe..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="h-12 w-full rounded-l-lg border-0 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Link to={`/properti${heroSearch ? `?search=${heroSearch}` : ""}`}>
              <Button className="h-12 rounded-l-none rounded-r-lg px-6">Cari</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-accent py-8">
        <div className="container flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Properti Unggulan</h2>
            <p className="mt-1 text-muted-foreground">Pilihan properti terbaik untuk Anda</p>
          </div>
          <Link to="/properti">
            <Button variant="outline" className="hidden sm:flex">
              Lihat Semua <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/properti">
            <Button>Lihat Semua Properti</Button>
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="bg-accent py-16">
        <div className="container">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Kenapa Memilih Kami</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-muted-foreground">SLM Properti adalah mitra terbaik untuk menemukan properti impian Anda di Sleman</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center">
        <div className="container">
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">Punya Properti untuk Dijual?</h2>
          <p className="mx-auto mt-2 max-w-md text-primary-foreground/80">Pasang iklan properti Anda secara gratis dan jangkau ribuan calon pembeli</p>
          <Link to="/jual-properti">
            <Button variant="secondary" size="lg" className="mt-6">
              Jual Properti Sekarang
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

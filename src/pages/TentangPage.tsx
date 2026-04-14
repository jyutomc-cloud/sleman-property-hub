import { Target, Eye, Users, MapPin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const team = [
  { name: "Budi Santoso", role: "Founder & CEO", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Siti Rahayu", role: "Marketing Manager", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Ahmad Wijaya", role: "Senior Agent", photo: "https://randomuser.me/api/portraits/men/65.jpg" },
  { name: "Dewi Lestari", role: "Customer Relations", photo: "https://randomuser.me/api/portraits/women/68.jpg" },
];

const testimonials = [
  { name: "Pak Hendra", text: "SLM Properti sangat membantu saya menemukan rumah idaman di Ngaglik. Prosesnya cepat dan transparan. Sangat merekomendasikan!", rating: 5 },
  { name: "Ibu Ratna", text: "Jual tanah melalui SLM Properti sangat mudah. Tim mereka profesional dan responsif. Tanah saya laku dalam waktu 2 minggu!", rating: 5 },
  { name: "Mas Doni", text: "Pelayanan excellent! Agen-agennya ramah dan sangat memahami pasar properti di Sleman. Terima kasih SLM Properti!", rating: 5 },
];

export default function TentangPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary py-16 text-center text-primary-foreground">
        <div className="container">
          <h1 className="text-3xl font-bold sm:text-4xl">Tentang SLM Properti</h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Mitra terpercaya Anda dalam menemukan properti impian di Sleman, Yogyakarta sejak 2019
          </p>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mt-4 text-xl font-bold">Visi</h2>
            <p className="mt-2 text-muted-foreground">
              Menjadi platform properti nomor satu di Sleman dan Yogyakarta yang menghubungkan penjual dan pembeli dengan cara yang mudah, transparan, dan terpercaya.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mt-4 text-xl font-bold">Misi</h2>
            <ul className="mt-2 space-y-2 text-muted-foreground">
              <li>• Menyediakan listing properti terverifikasi dan berkualitas</li>
              <li>• Memberikan pelayanan profesional kepada setiap klien</li>
              <li>• Memudahkan proses jual beli properti dengan teknologi modern</li>
              <li>• Membangun kepercayaan melalui transparansi dan integritas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-accent py-16">
        <div className="container">
          <h2 className="text-center text-2xl font-bold">Tim Kami</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">Profesional berpengalaman yang siap membantu Anda</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <div key={t.name} className="rounded-lg bg-card p-6 text-center shadow-sm">
                <img src={t.photo} alt={t.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
                <h3 className="mt-4 font-semibold">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16">
        <h2 className="text-center text-2xl font-bold">Apa Kata Klien Kami</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-lg border bg-card p-6">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">"{t.text}"</p>
              <p className="mt-3 font-semibold text-sm">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="bg-accent py-16">
        <div className="container">
          <h2 className="text-center text-2xl font-bold">Lokasi Kantor Kami</h2>
          <p className="mt-2 text-center text-muted-foreground flex items-center justify-center gap-1">
            <MapPin className="h-4 w-4" /> Jl. Kaliurang Km 9, Sleman, Yogyakarta
          </p>
          <div className="mt-6 overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63246.37903686442!2d110.35!3d-7.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59b4d63e62e1%3A0x1234567890abcdef!2sSleman%2C+Yogyakarta!5e0!3m2!1sen!2sid!4v1700000000000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi SLM Properti"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

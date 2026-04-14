import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function KontakPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Mohon lengkapi semua field");
      return;
    }
    toast.success("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const inputCls = "h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-primary py-16 text-center text-primary-foreground">
        <div className="container">
          <h1 className="text-3xl font-bold sm:text-4xl">Hubungi Kami</h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Ada pertanyaan? Jangan ragu untuk menghubungi kami</p>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="text-xl font-bold">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium">Nama *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls + " mt-1"} placeholder="Nama Lengkap" />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls + " mt-1"} placeholder="email@contoh.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Nomor Telepon</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls + " mt-1"} placeholder="08xxx" />
              </div>
              <div>
                <label className="text-sm font-medium">Pesan *</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputCls + " mt-1 h-32 py-2"} placeholder="Tulis pesan Anda..." />
              </div>
              <Button type="submit">Kirim Pesan</Button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Informasi Kontak</h2>
            <div className="space-y-4">
              {[
                { icon: MapPin, label: "Alamat", value: "Jl. Kaliurang Km 9, Sleman, Yogyakarta 55581" },
                { icon: Phone, label: "Telepon", value: "+62 851-3738-7259" },
                { icon: Mail, label: "Email", value: "info@slmproperti.com" },
                { icon: Clock, label: "Jam Operasional", value: "Senin - Sabtu, 08:00 - 17:00 WIB" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 rounded-lg border bg-card p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="rounded-lg border bg-card p-4">
              <p className="font-medium text-sm mb-3">Ikuti Kami</p>
              <div className="flex gap-3">
                {["Instagram", "Facebook", "YouTube"].map((s) => (
                  <a key={s} href="#" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63246.37903686442!2d110.35!3d-7.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59b4d63e62e1%3A0x1234567890abcdef!2sSleman%2C+Yogyakarta!5e0!3m2!1sen!2sid!4v1700000000000"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Lokasi SLM Properti"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

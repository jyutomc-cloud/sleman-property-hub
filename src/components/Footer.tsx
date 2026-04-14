import { Link } from "react-router-dom";
import { Home, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground">
                <Home className="h-4 w-4 text-primary" />
              </div>
              <span className="text-lg font-bold">SLM Properti</span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Platform jual beli properti terpercaya di Sleman, Yogyakarta. Temukan rumah dan tanah impian Anda bersama kami.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Menu</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-primary-foreground">Beranda</Link></li>
              <li><Link to="/properti" className="hover:text-primary-foreground">Properti</Link></li>
              <li><Link to="/jual-properti" className="hover:text-primary-foreground">Jual Properti</Link></li>
              <li><Link to="/tentang" className="hover:text-primary-foreground">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Properti */}
          <div>
            <h3 className="mb-4 font-semibold">Properti</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/properti?type=rumah" className="hover:text-primary-foreground">Rumah Dijual</Link></li>
              <li><Link to="/properti?type=tanah" className="hover:text-primary-foreground">Tanah Dijual</Link></li>
              <li><Link to="/properti?kecamatan=Ngaglik" className="hover:text-primary-foreground">Properti Ngaglik</Link></li>
              <li><Link to="/properti?kecamatan=Depok" className="hover:text-primary-foreground">Properti Depok</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="mb-4 font-semibold">Kontak</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>📍 Jl. Kaliurang Km 9, Sleman, Yogyakarta</li>
              <li>📞 +62 851-3738-7259</li>
              <li>✉️ info@slmproperti.com</li>
              <li>🕐 Senin - Sabtu, 08:00 - 17:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-primary-foreground/20 pt-8">
          <p className="text-sm text-primary-foreground/60">© 2024 SLM Properti. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

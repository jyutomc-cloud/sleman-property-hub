import { useParams, Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties, formatPrice, getWhatsAppUrl } from "@/data/properties";
import { useState } from "react";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-lg text-muted-foreground">Properti tidak ditemukan.</p>
          <Link to="/properti" className="mt-4 inline-block text-primary underline">Kembali ke daftar</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const similar = properties.filter((p) => p.type === property.type && p.id !== property.id).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <Link to="/properti" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ChevronLeft className="h-4 w-4" /> Kembali
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="overflow-hidden rounded-lg">
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`overflow-hidden rounded-md border-2 transition-colors ${i === activeImage ? "border-primary" : "border-transparent"}`}
                >
                  <img src={img} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>

            {/* Info */}
            <div className="mt-6">
              <div className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                {property.type === "rumah" ? "Rumah" : "Tanah"}
              </div>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{property.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" /> {property.location}
              </p>
              <p className="mt-3 text-3xl font-bold text-primary">{formatPrice(property.price)}</p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-accent p-3 text-center">
                  <Maximize className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 text-sm font-medium">LT {property.landArea}m²</p>
                </div>
                {property.buildingArea && (
                  <div className="rounded-lg bg-accent p-3 text-center">
                    <Maximize className="mx-auto h-5 w-5 text-primary" />
                    <p className="mt-1 text-sm font-medium">LB {property.buildingArea}m²</p>
                  </div>
                )}
                {property.bedrooms && (
                  <div className="rounded-lg bg-accent p-3 text-center">
                    <Bed className="mx-auto h-5 w-5 text-primary" />
                    <p className="mt-1 text-sm font-medium">{property.bedrooms} Kamar Tidur</p>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="rounded-lg bg-accent p-3 text-center">
                    <Bath className="mx-auto h-5 w-5 text-primary" />
                    <p className="mt-1 text-sm font-medium">{property.bathrooms} Kamar Mandi</p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold">Deskripsi</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{property.longDescription}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={property.seller.photo}
                    alt={property.seller.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{property.seller.name}</p>
                    <p className="text-sm text-muted-foreground">Agen Properti</p>
                  </div>
                </div>
                <a
                  href={getWhatsAppUrl(property.seller.phone, property.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-medium text-whatsapp-foreground transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.359 0-4.542-.803-6.272-2.15l-.438-.35-3.091 1.036 1.036-3.091-.35-.438A9.948 9.948 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                  </svg>
                  Chat WhatsApp Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold">Properti Serupa</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

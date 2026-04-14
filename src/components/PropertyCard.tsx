import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Property, formatPrice, getWhatsAppUrl } from "@/data/properties";
import { Badge } from "@/components/ui/badge";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/properti/${property.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            {property.type === "rumah" ? "Rumah" : "Tanah"}
          </Badge>
        </div>
      </Link>

      <div className="p-4">
        <p className="text-lg font-bold text-primary">{formatPrice(property.price)}</p>
        <Link to={`/properti/${property.id}`}>
          <h3 className="mt-1 line-clamp-1 font-semibold text-card-foreground hover:text-primary">
            {property.title}
          </h3>
        </Link>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {property.location}
        </p>

        <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" /> LT {property.landArea}m²
          </span>
          {property.buildingArea && (
            <span className="flex items-center gap-1">
              <Maximize className="h-3.5 w-3.5" /> LB {property.buildingArea}m²
            </span>
          )}
          {property.bedrooms && (
            <span className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" /> {property.bedrooms} KT
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" /> {property.bathrooms} KM
            </span>
          )}
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{property.description}</p>

        <a
          href={getWhatsAppUrl(property.seller.phone, property.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp py-2.5 text-sm font-medium text-whatsapp-foreground transition-opacity hover:opacity-90"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.359 0-4.542-.803-6.272-2.15l-.438-.35-3.091 1.036 1.036-3.091-.35-.438A9.948 9.948 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
          </svg>
          Hubungi Penjual
        </a>
      </div>
    </div>
  );
}

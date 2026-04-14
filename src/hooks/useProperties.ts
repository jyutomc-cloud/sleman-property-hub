import { useQuery } from "@tanstack/react-query";
import { fetchProperties, fetchFeaturedProperties, fetchPropertyById } from "@/data/properties";

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });
}

export function useFeaturedProperties() {
  return useQuery({
    queryKey: ["properties", "featured"],
    queryFn: fetchFeaturedProperties,
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ["properties", id],
    queryFn: () => fetchPropertyById(id),
    enabled: !!id,
  });
}

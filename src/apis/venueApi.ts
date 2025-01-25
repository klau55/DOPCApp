const BASE_URL =
  "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues";

interface VenueStaticResponse {
  venue_raw: {
    location: {
      coordinates: [number, number];
    };
  };
}

interface DeliveryRange {
  min: number;
  max: number;
  a: number;
  b: number;
}

interface VenueDynamicResponse {
  venue_raw: {
    delivery_specs: {
      order_minimum_no_surcharge: number;
      delivery_pricing: {
        base_price: number;
        distance_ranges: DeliveryRange[];
      };
    };
  };
}
export const fetchVenueStatic = async (
  venueSlug: string,
): Promise<VenueStaticResponse> => {
  const response = await fetch(`${BASE_URL}/${venueSlug}/static`);
  if (!response.ok) {
    throw new Error(`Failed to fetch static info for ${venueSlug}`);
  }
  return response.json();
};

export const fetchVenueDynamic = async (
  venueSlug: string,
): Promise<VenueDynamicResponse> => {
  const response = await fetch(`${BASE_URL}/${venueSlug}/dynamic`);
  if (!response.ok) {
    throw new Error(`Failed to fetch dynamic info for ${venueSlug}`);
  }
  return response.json();
};

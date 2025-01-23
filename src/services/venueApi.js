const BASE_URL = "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues";
export const fetchVenueStatic = async (venueSlug) => {
    const response = await fetch(`${BASE_URL}/${venueSlug}/static`);
    if (!response.ok) {
        throw new Error(`Failed to fetch static info for ${venueSlug}`);
    }
    return response.json();
};
export const fetchVenueDynamic = async (venueSlug) => {
    const response = await fetch(`${BASE_URL}/${venueSlug}/dynamic`);
    if (!response.ok) {
        throw new Error(`Failed to fetch dynamic info for ${venueSlug}`);
    }
    return response.json();
};

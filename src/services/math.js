/**
 * Approximate the straight-line distance in meters
 */
export const calculateDistanceMeters = (lat1, lng1, lat2, lng2) => {
    const R = 6371000; // Earth radius in meters
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
};
const toRadians = (value) => {
    return (value * Math.PI) / 180;
};
/**
 * Returns { a, b } if found, or null if the distance is not deliverable.
 */
export const findDistanceRange = (distance, distanceRanges) => {
    for (const range of distanceRanges) {
        if (range.max === 0) {
            if (distance >= range.min) {
                return null;
            }
        }
        if (distance >= range.min && distance < range.max) {
            return { a: range.a, b: range.b };
        }
    }
    return null;
};
/**
 *   basePrice + a + (b * distance / 10), round to nearest integer
 */
export const calculateDeliveryFee = (basePrice, a, b, distance) => {
    const distanceComponent = Math.round((b * distance) / 10);
    return basePrice + a + distanceComponent;
};
/**
 * Small order surcharge = order_minimum_no_surcharge - cartValue (never below 0)
 */
export const calculateSmallOrderSurcharge = (cartValue, minNoSurcharge) => {
    const diff = minNoSurcharge - cartValue;
    return diff > 0 ? diff : 0;
};

/**
 * Approximate the straight-line distance in meters
 */

export const calculateDistanceMeters = (
	lat1: number,
	lng1: number,
	lat2: number,
	lng2: number
	): number => {
	// Convert lat/long differences to radians
	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLng = (lng2 - lng1) * (Math.PI / 180);

	const avgLat = ((lat1 + lat2) / 2) * (Math.PI / 180);

	// Approximate meters per radian at Earth’s surface
	// ~6371 km is Earth radius
	const earthRadius = 6371000; // meters

	// Equirectangular approximation:
	const x = Math.cos(avgLat) * dLng;
	const distance = Math.sqrt(dLat * dLat + x * x) * earthRadius;

	return Math.round(distance);
};


interface DistanceRange {
	min: number;
	max: number;
	a: number;
	b: number;
}
	
/**
 * Returns { a, b } if found, or null if the distance is not deliverable.
 */
export const findDistanceRange = (
		distance: number,
		distanceRanges:DistanceRange[]
	): {a: number; b: number} | null => {
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
}
	
	/**
	 *   basePrice + a + (b * distance / 10), round to nearest integer
	 */
	export const calculateDeliveryFee = (
		basePrice: number,
		a: number,
		b: number,
		distance:number
	): number => {
		const distanceComponent = Math.round((b * distance) / 10);
		return basePrice + a + distanceComponent;
	}
	
	/**
	 * Small order surcharge = order_minimum_no_surcharge - cartValue (never below 0)
	 */
	export const calculateSmallOrderSurcharge = (
		cartValue: number,
		minNoSurcharge: number
	): number => {
		const diff = minNoSurcharge - cartValue;
		return diff > 0 ? diff : 0;
	}
	
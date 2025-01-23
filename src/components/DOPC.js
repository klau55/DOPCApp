import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { fetchVenueStatic, fetchVenueDynamic } from "../services/venueApi";
import { calculateDistanceMeters, findDistanceRange, calculateDeliveryFee, calculateSmallOrderSurcharge, } from "../services/math";
import validateInputs from "../services/validation";
import DOPCForm from "./DOPCForm";
import PriceBreakdown from "./PriceBreakdown";
const DOPC = () => {
    const [venueSlug, setVenueSlug] = useState("home-assignment-venue-helsinki");
    const [cartValue, setCartValue] = useState("");
    const [userLatitude, setUserLatitude] = useState("60.17094");
    const [userLongitude, setUserLongitude] = useState("24.93087");
    const [priceBreakdown, setPriceBreakdown] = useState(null);
    const [error, setError] = useState(null);
    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by this browser");
            return;
        }
        navigator.geolocation.getCurrentPosition((pos) => {
            setUserLatitude(String(pos.coords.latitude));
            setUserLongitude(String(pos.coords.longitude));
        }, (err) => {
            setError(err.message);
        });
    };
    const handleCalculate = async () => {
        setError(null);
        setPriceBreakdown(null);
        // Validate form fields
        const validationError = validateInputs({
            venueSlug,
            cartValue,
            userLatitude,
            userLongitude,
        });
        if (validationError) {
            setError(validationError);
            return;
        }
        try {
            // Convert to cents
            const cartValueCents = Math.round(parseFloat(cartValue) * 100);
            const latUser = parseFloat(userLatitude);
            const lngUser = parseFloat(userLongitude);
            // Fetch data
            const staticData = await fetchVenueStatic(venueSlug);
            const dynamicData = await fetchVenueDynamic(venueSlug);
            // Extract fields
            const [lngVenue, latVenue] = staticData.venue_raw.location.coordinates;
            const { order_minimum_no_surcharge, delivery_pricing } = dynamicData.venue_raw.delivery_specs;
            const { base_price, distance_ranges } = delivery_pricing;
            // Distance
            const distance = calculateDistanceMeters(latUser, lngUser, latVenue, lngVenue);
            // Check range
            const distanceRange = findDistanceRange(distance, distance_ranges);
            if (!distanceRange) {
                setError(`Delivery not possible! Too far: ${distance} m away.`);
                return;
            }
            // Surcharges
            const smallOrderSurcharge = calculateSmallOrderSurcharge(cartValueCents, order_minimum_no_surcharge);
            const deliveryFee = calculateDeliveryFee(base_price, distanceRange.a, distanceRange.b, distance);
            const totalPrice = cartValueCents + smallOrderSurcharge + deliveryFee;
            setPriceBreakdown({
                cartValue: cartValueCents,
                smallOrderSurcharge,
                deliveryFee,
                deliveryDistance: distance,
                totalPrice,
            });
        }
        catch (err) { // Changed from any to unknown
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("An unexpected error occurred.");
            }
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(DOPCForm, { venueSlug: venueSlug, setVenueSlug: setVenueSlug, cartValue: cartValue, setCartValue: setCartValue, userLatitude: userLatitude, setUserLatitude: setUserLatitude, userLongitude: userLongitude, setUserLongitude: setUserLongitude, onGetLocation: handleGetLocation, onCalculate: handleCalculate, handleCalculate: handleCalculate }), error && _jsx("p", { className: "error", children: error }), priceBreakdown && _jsx(PriceBreakdown, { breakdown: priceBreakdown })] }));
};
export default DOPC;

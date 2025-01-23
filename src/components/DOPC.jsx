import { useState } from "react";
import {
	fetchVenueStatic,
	fetchVenueDynamic,
} from "../services/venueApi";
import {
	calculateDistanceMeters,
	findDistanceRange,
	calculateDeliveryFee,
	calculateSmallOrderSurcharge,
} from "../services/math";
import "../index.css";
import validateInputs from "../services/validation"

function DeliveryPriceForm() {
	const [venueSlug, setVenueSlug] = useState("home-assignment-venue-helsinki");
	const [cartValue, setCartValue] = useState("10");
	const [userLatitude, setUserLatitude] = useState("60.17094");
	const [userLongitude, setUserLongitude] = useState("24.93087");

	const [priceBreakdown, setPriceBreakdown] = useState(null);
	const [error, setError] = useState(null);

	const handleGetLocation = () => {
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by this browser");
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setUserLatitude(String(pos.coords.latitude));
				setUserLongitude(String(pos.coords.longitude));
			},
			(err) => {
				setError(err.message);
			}
		);
	};
	const handleCalculate = async () => {
		setError(null);
		setPriceBreakdown(null);

		const validationError = validateInputs({
			venueSlug,
			cartValue,
			userLatitude,
			userLongitude
		});

		if (validationError) {
			setError(validationError);
			return;
		}

		try {
			//	convert to cents
			const cartValueCents = Math.round(parseFloat(cartValue) * 100);
			const latUser = parseFloat(userLatitude);
			const lngUser = parseFloat(userLongitude);

			//	fetch static & dynamic
			const staticData = await fetchVenueStatic(venueSlug);
			const dynamicData = await fetchVenueDynamic(venueSlug);

			//	get coordinates & delivery specs
			const [lngVenue, latVenue] = staticData.venue_raw.location.coordinates;
			const deliverySpecs = dynamicData.venue_raw.delivery_specs;
			const { order_minimum_no_surcharge, delivery_pricing } = deliverySpecs;
			const { base_price, distance_ranges } = delivery_pricing;

			//	distance calculation
			const distance = calculateDistanceMeters(
				latUser,
				lngUser,
				latVenue,
				lngVenue
			);
			console.log('latVenue & lngVenue: ', latVenue, lngVenue);
			//	check if delivery is possible
			const distanceRange = findDistanceRange(distance, distance_ranges);
			if (!distanceRange) {
				setError(`Delivery not possible! Location is too far: ${distance}m away.`);
				return;
			}

			//	small order surcharge calculation
			const smallOrderSurcharge = calculateSmallOrderSurcharge(
				cartValueCents,
				order_minimum_no_surcharge
			);

			//	delivery fee calculation
			const deliveryFee = calculateDeliveryFee(
				base_price,
				distanceRange.a,
				distanceRange.b,
				distance
			);

			const totalPrice = cartValueCents + smallOrderSurcharge + deliveryFee;
			setPriceBreakdown({
				cartValue: cartValueCents,
				smallOrderSurcharge,
				deliveryFee,
				deliveryDistance: distance,
				totalPrice,
			});
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<>
			<div>
				Venue slug
				<input
					data-test-id="venueSlug"
					type="text"
					value={venueSlug}
					onChange={(e) => setVenueSlug(e.target.value)}
				/>
			</div>

			<div>
				Cart value (EUR)
				<input
					data-test-id="cartValue"
					type="text"
					value={cartValue}
					onChange={(e) => setCartValue(e.target.value)}
				/>
			</div>

			<div>
				User latitude
				<input
					data-test-id="userLatitude"
					type="text"
					value={userLatitude}
					onChange={(e) => setUserLatitude(e.target.value)}
				/>
			</div>

			<div>
				User longitude
				<input
					data-test-id="userLongitude"
					type="text"
					value={userLongitude}
					onChange={(e) => setUserLongitude(e.target.value)}
				/>
			</div>
			<div className="button-container">
			<button onClick={handleGetLocation} data-test-id="getLocation">
				Get location
			</button>

			<button onClick={handleCalculate} data-test-id="calculateDeliveryPrice">
				Calculate delivery price
			</button>
			</div>
			{error && <p className="error">{error}</p>}

			{priceBreakdown && (
				<div className="price-breakdown">
					<h2>Price breakdown</h2>
					<p>
						Cart Value:{" "}
						<span data-raw-value={priceBreakdown.cartValue}>
							{priceBreakdown.cartValue / 100} €
						</span>
					</p>
					<p>
						Delivery fee:{" "}
						<span data-raw-value={priceBreakdown.deliveryFee}>
							{(priceBreakdown.deliveryFee / 100).toFixed(2)} €
						</span>
					</p>
					<p>
						Delivery distance:{" "}
						<span data-raw-value={priceBreakdown.deliveryDistance}>
							{priceBreakdown.deliveryDistance} m
						</span>
					</p>
					<p>
						Small order surcharge:{" "}
						<span data-raw-value={priceBreakdown.smallOrderSurcharge}>
							{(priceBreakdown.smallOrderSurcharge / 100).toFixed(2)} €
						</span>
					</p>
					<p>
						Total price:{" "}
						<span data-raw-value={priceBreakdown.totalPrice}>
							{(priceBreakdown.totalPrice / 100).toFixed(2)} €
						</span>
					</p>
				</div>
			)}
		</>
	);
}

export default DeliveryPriceForm;

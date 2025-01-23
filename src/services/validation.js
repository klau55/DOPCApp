function isDigitsOnly(value) {
	const pattern = /^\d+(?:\.\d+)?$/;
	return pattern.test(value);
}

export default function validateInputs({
	venueSlug,
	cartValue,
	userLatitude,
	userLongitude,
}) {
	switch (true) {
		case !venueSlug.trim():
			return "Venue slug is required";
		case !cartValue.trim():
			return "Cart value is required";
		case !isDigitsOnly(cartValue):
			return "Cart value must be a number";
		case Number.isNaN(cartValue) || cartValue <= 0:
			return "Cart value must be a positive number";
		case !userLatitude.trim():
			return "User latitude is required";
		case Number.isNaN(parseFloat(userLatitude)) || parseFloat(userLatitude) < -90 || parseFloat(userLatitude) > 90:
			return "Latitude must be a valid number between -90 and 90";
		case !userLongitude.trim():
			return "User longitude is required";
		case Number.isNaN(parseFloat(userLongitude)) || parseFloat(userLongitude) < -180 || parseFloat(userLongitude) > 180:
			return "Longitude must be a valid number between -180 and 180";

		default:
			return null;
	}
}
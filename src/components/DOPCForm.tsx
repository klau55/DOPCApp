import React from "react";

interface DOPCFormProps {
  venueSlug: string;
  setVenueSlug: React.Dispatch<React.SetStateAction<string>>;
  cartValue: string;
  setCartValue: React.Dispatch<React.SetStateAction<string>>;
  userLatitude: string;
  setUserLatitude: React.Dispatch<React.SetStateAction<string>>;
  userLongitude: string;
  setUserLongitude: React.Dispatch<React.SetStateAction<string>>;
  handleCalculate: () => void;

  onGetLocation: () => void;
  onCalculate: () => void;
}

const DOPCForm: React.FC<DOPCFormProps> = ({
  venueSlug,
  setVenueSlug,
  cartValue,
  setCartValue,
  userLatitude,
  setUserLatitude,
  userLongitude,
  setUserLongitude,
  onGetLocation,
  onCalculate,
}) => {
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
        <button onClick={onGetLocation} data-test-id="getLocation">
          Get location
        </button>

        <button onClick={onCalculate} data-test-id="calculateDeliveryPrice">
          Calculate delivery price
        </button>
      </div>
    </>
  );
};

export default DOPCForm;

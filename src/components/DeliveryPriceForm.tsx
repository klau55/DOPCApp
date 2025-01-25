import React from "react";

interface DeliveryPriceFormProps {
  venueSlug: string;
  setVenueSlug: React.Dispatch<React.SetStateAction<string>>;
  cartValue: string;
  setCartValue: React.Dispatch<React.SetStateAction<string>>;
  userLatitude: string;
  setUserLatitude: React.Dispatch<React.SetStateAction<string>>;
  userLongitude: string;
  setUserLongitude: React.Dispatch<React.SetStateAction<string>>;

  onGetLocation: () => void;
  onCalculate: () => void;
}

const DeliveryPriceForm: React.FC<DeliveryPriceFormProps> = ({
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
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>Venue slug</label>
        <input
          data-test-id="venueSlug"
          type="text"
          required = {true}
          value={venueSlug}
          onChange={(e) => setVenueSlug(e.target.value)}
        />
      </div>

      <div>
        <label>Cart value (EUR)</label>
        <input
          data-test-id="cartValue"
          type="text"
          required = {true}
          value={cartValue}
          onChange={(e) => setCartValue(e.target.value)}
        />
      </div>

      <div>
        <label>User latitude</label>
        <input
          data-test-id="userLatitude"
          type="text"
          required = {true}
          value={userLatitude}
          onChange={(e) => setUserLatitude(e.target.value)}
        />
      </div>

      <div>
        <label>User longitude</label>
        <input
          data-test-id="userLongitude"
          type="text"
          required = {true}
          value={userLongitude}
          onChange={(e) => setUserLongitude(e.target.value)}
        />
      </div>

      <div className="button-container">
        <button type="button" onClick={onGetLocation} data-test-id="getLocation">
          Get location
        </button>

        <button onClick={onCalculate} data-test-id="calculateDeliveryPrice">
          Calculate delivery price
        </button>
      </div>
    </form>
  );
};

export default DeliveryPriceForm;

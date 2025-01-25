import React from "react";

interface PriceBreakdownData {
  cartValue: number;
  smallOrderSurcharge: number;
  deliveryFee: number;
  deliveryDistance: number;
  totalPrice: number;
}

interface PriceBreakdownProps {
  breakdown: PriceBreakdownData;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ breakdown }) => {
  const {
    cartValue,
    smallOrderSurcharge,
    deliveryFee,
    deliveryDistance,
    totalPrice,
  } = breakdown;

  return (
    <div className="price-breakdown">
      <h2>Price breakdown</h2>
      <p>
        Cart Value: <span data-raw-value={cartValue}>{cartValue / 100} €</span>
      </p>
      <p>
        Delivery fee:{" "}
        <span data-raw-value={deliveryFee}>
          {(deliveryFee / 100).toFixed(2)} €
        </span>
      </p>
      <p>
        Delivery distance:{" "}
        <span data-raw-value={deliveryDistance}>{deliveryDistance} m</span>
      </p>
      <p>
        Small order surcharge:{" "}
        <span data-raw-value={smallOrderSurcharge}>
          {(smallOrderSurcharge / 100).toFixed(2)} €
        </span>
      </p>
      <p>
        Total price:{" "}
        <span data-raw-value={totalPrice}>
          {(totalPrice / 100).toFixed(2)} €
        </span>
      </p>
    </div>
  );
};

export default PriceBreakdown;

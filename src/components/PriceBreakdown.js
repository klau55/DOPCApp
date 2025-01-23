import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PriceBreakdown = ({ breakdown }) => {
    const { cartValue, smallOrderSurcharge, deliveryFee, deliveryDistance, totalPrice, } = breakdown;
    return (_jsxs("div", { className: "price-breakdown", children: [_jsx("h2", { children: "Price breakdown" }), _jsxs("p", { children: ["Cart Value:", " ", _jsxs("span", { "data-raw-value": cartValue, children: [cartValue / 100, " \u20AC"] })] }), _jsxs("p", { children: ["Delivery fee:", " ", _jsxs("span", { "data-raw-value": deliveryFee, children: [(deliveryFee / 100).toFixed(2), " \u20AC"] })] }), _jsxs("p", { children: ["Delivery distance:", " ", _jsxs("span", { "data-raw-value": deliveryDistance, children: [deliveryDistance, " m"] })] }), _jsxs("p", { children: ["Small order surcharge:", " ", _jsxs("span", { "data-raw-value": smallOrderSurcharge, children: [(smallOrderSurcharge / 100).toFixed(2), " \u20AC"] })] }), _jsxs("p", { children: ["Total price:", " ", _jsxs("span", { "data-raw-value": totalPrice, children: [(totalPrice / 100).toFixed(2), " \u20AC"] })] })] }));
};
export default PriceBreakdown;

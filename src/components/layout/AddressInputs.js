import React from "react";

export default function AddressInputs({
  addressProps,
  setAddressProp,
  disabled = false,
}) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;

  return (
    <>
      <label>Phone number</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone || ""}
        onChange={(e) => setAddressProp("phone", e.target.value)}
      />
      <label>Street Address</label>
      <input
        type="text"
        placeholder="Street Address"
        value={streetAddress || ""}
        onChange={(e) => setAddressProp("streetAddress", e.target.value)}
        disabled={disabled}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city || ""}
            onChange={(e) => setAddressProp("city", e.target.value)}
          />
        </div>
        <div>
          <label>Postal code</label>
          <input
            type="text"
            placeholder="Postal code"
            value={postalCode || ""}
            onChange={(e) => setAddressProp("postalCode", e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        placeholder="Country"
        value={country || ""}
        onChange={(e) => setAddressProp("country", e.target.value)}
        disabled={disabled}
      />
    </>
  );
}

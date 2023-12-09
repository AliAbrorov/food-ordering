"use client";

import React, { useState } from "react";
import EditableImage from "./EditableImage";
import useProfile from "../UseProfile";
import AddressInputs from "./AddressInputs";

export default function UserForm({ user, onSave, userImage }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: LoggedInUserData } = useProfile();

  console.log(admin);

  function handleAddressChange(propName, value) {
    if (propName === "city") setCity(value);
    if (propName === "phone") setPhone(value);
    if (propName === "country") setCountry(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
  }

  return (
    <div className="md:flex gap-4 items-center">
      <div className="self-start">
        <div className="p-2 rounded-lg relative">
          <EditableImage userImage={userImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            admin,
            streetAddress,
            city,
            country,
            postalCode,
          })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="First and Last name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user.email}
          placeholder="email"
        />
        <AddressInputs
          addressProps={{
            streetAddress,
            phone,
            postalCode,
            city,
            country,
          }}
          setAddressProp={handleAddressChange}
        />

        <div>
          <label
            className="p-2 inline-flex items-center gap-2 mb-2"
            htmlFor="adminCb"
          >
            <input
              id="adminCb"
              type="checkbox"
              className=""
              value={"1"}
              checked={admin}
              onChange={(ev) => setAdmin(ev.target.checked)}
            />
            <span>Admin</span>
          </label>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

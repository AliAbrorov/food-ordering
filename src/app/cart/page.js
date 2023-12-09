"use client";

import { CartContext, cartProductPrice } from "@/components/AppContext";
import Loader from "@/components/Loader";
import useProfile from "@/components/UseProfile";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";

import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed!");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { streetAddress, postalCode, phone, country, city } = profileData;

      const addressFormProfile = {
        streetAddress,
        postalCode,
        phone,
        country,
        city,
      };

      setAddress(addressFormProfile);
    }
  }, [profileData]);

  let subTotal = 0;
  for (const p of cartProducts) {
    subTotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => {
      return { ...prevAddress, [propName]: value };
    });
  }

  async function proceedToCheckout(e) {
    e.preventDefault();
    // address and shopping car products

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  // if (cartProducts?.length === 0) {
  //   return (
  //     <section className="mt-8 text-center">
  //       <SectionHeaders mainHeader={"Cart"} />

  //     </section>
  //   );
  // }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>

      {/* {cartProducts?.length === 0 && (
  <p className="mt-4">Your shopping cart is empty</p>
)} */}

      <div className="grid grid-cols-2 gap-8  mt-8">
        <div>
          {cartProducts?.length === 0 && (
            <div>No Products in your shooping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((cartProduct, index) => (
              <CartProduct
                key={cartProduct._id}
                onRemove={removeCartProduct}
                index={index}
                cartProduct={cartProduct}
              />
            ))}
          <div className="py-2 justify-end items-center pr-16 flex">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery: <br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subTotal}
              <br />
              $5
              <br />${subTotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button className="primary">Pay ${subTotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { CartContext, cartProductPrice } from "@/components/AppContext";
import Loader from "@/components/Loader";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl text-center mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Your order"} />
        <div className="my-4 mb-8">
          <p>Thanks for your order</p>
          <p>We will call you when your order will be on the way</p>
        </div>
        {loadingOrder && <Loader />}
        {order && (
          <div className="grid md:grid-cols-2 md:gap-16">
            <div>
              {order.cartProducts.map((product) => (
                <CartProduct cartProduct={product} key={product._id} />
              ))}
              <div className="text-right py-2 text-gray-500">
                Subtotal:{" "}
                <span className="text-black font-bold w-8 inline-block">
                  ${subtotal}
                </span>{" "}
                <br />
                Delivery:{" "}
                <span className="text-black font-bold w-8 inline-block">
                  $5
                </span>{" "}
                <br />
                Total:{" "}
                <span className="text-black inline-block font-bold w-8">
                  ${subtotal + 5}
                </span>{" "}
                <br />
              </div>
            </div>
            <div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <AddressInputs addressProps={order} disabled={true} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

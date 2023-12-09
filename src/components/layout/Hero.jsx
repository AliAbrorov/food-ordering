import Image from "next/image";
import React from "react";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="md:py-12 py-4">
        <h1 className="text-4xl font-semibold ">
          Everything
          <br /> is better
          <br /> with a <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 uppercase justify-center ">
            Order now
            <Right />
          </button>
          <button className="flex items-center gap-2 py-2 px-4 text-gray-600 font-semibold border-0 ">
            Learn More
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image src="/pizza.png" alt="pizza" fill objectFit="contain" />
      </div>
    </section>
  );
}

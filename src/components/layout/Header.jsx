"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart";
import Bars2 from "../icons/Bars2";
import { usePathname } from "next/navigation";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const path = usePathname();
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  function AuthLinks({ status, userName }) {
    if (status === "authenticated") {
      return (
        <>
          <Link
            href={"/profile"}
            className="whitespace-nowrap text-gray-500 text-lg hover:text-primary"
          >
            Hello, {userName}
          </Link>
          <button
            className="bg-primary rounded-full text-white px-6 py-2"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </>
      );
    }

    if (status === "unauthenticated") {
      return (
        <>
          <Link href={"/login"}>Login</Link>
          <Link
            href={"/register"}
            className="bg-primary rounded-full text-white px-6 py-2"
          >
            Register
          </Link>
        </>
      );
    }
  }

  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link href="/" className="text-primary font-semibold text-2xl">
          ST PIZZA
        </Link>

        <div className="flex gap-8 items-center">
          <Link href={"/cart"} className="relative">
            <ShoppingCart />{" "}
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-xs py-1 px-[5px] rounded-full leading-none text-white ">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Bars2 />
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <div
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
          onClick={() => setMobileNavOpen(false)}
        >
          <Link href={"/"} className="hover:text-primary">
            Home
          </Link>
          <Link href={"/menu"} className={"hover:text-primary"}>
            Menu
          </Link>
          <Link href={"/#about"} className="hover:text-primary">
            About
          </Link>
          <Link href={"#contact"} className="hover:text-primary">
            Contact
          </Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}

      <div className="hidden md:flex justify-between items-center">
        <nav className="flex gap-8 text-gray-500 font-semibold items-center ">
          <Link href={"/"} className="hover:text-primary">
            Home
          </Link>
          <Link href={"/menu"} className="hover:text-primary">
            Menu
          </Link>
          <Link href={"/#about"} className="hover:text-primary">
            About
          </Link>
          <Link href={"#contact"} className="hover:text-primary">
            Contact
          </Link>
        </nav>

        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={"/cart"} className="relative">
            <ShoppingCart />{" "}
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-xs py-1 px-[5px] rounded-full leading-none text-white ">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>

      {userCreated && (
        <div className="my-4 text-center text-gray-400">
          User created.
          <br />
          Now you can{" "}
          <Link href={"/login"} className="underline text-red-500">
            Login &raquo;
          </Link>
        </div>
      )}

      {error && (
        <div className="my-4 text-center">
          An error has occured
          <br />
          Please try again later{" "}
        </div>
      )}

      <form className="block max-w-xs mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser === true}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser === true}
        ></input>
        <button type="submit" disabled={creatingUser === true}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or Login with provider
        </div>
        <button
          className="flex gap-4 justify-center items-center"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src={"/google.png"} alt="google" width={32} height={32} />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link href={"/login"} className="underline text-red-500">
            Login here
          </Link>
        </div>
      </form>
    </section>
  );
}

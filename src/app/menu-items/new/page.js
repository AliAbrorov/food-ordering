"use client";

import Loader from "@/components/Loader";
import useProfile from "@/components/UseProfile";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Right from "@/components/icons/Right";
import Image from "next/image";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();

  const router = useRouter();

  async function handleFormSubmit(e, data) {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving",
      success: "Saved",
      error: "Error",
    });

    router.push("/menu-items");
  }

  if (loading) {
    return <Loader />;
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}

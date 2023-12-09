"use client";

import DeleteButton from "@/components/DeleteButton";
import Loader from "@/components/Loader";
import useProfile from "@/components/UseProfile";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {
  const { id } = useParams();

  const [menuItem, setMenuItem] = useState(null);
  const { loading, data } = useProfile();

  const router = useRouter();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, [id]);

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });

    toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    router.push("/menu-items");
  }

  async function handleFormSubmit(e, data) {
    e.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items", {
        method: "PUT",
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

      <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />

      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-[200px] pl-4 ">
          <DeleteButton
            label="Delete this menu item"
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
}

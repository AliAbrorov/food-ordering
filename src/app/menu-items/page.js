"use client";

import Loader from "@/components/Loader";
import useProfile from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  });

  if (loading) {
    return <Loader />;
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />

      <div className="mt-8">
        <Link href={"/menu-items/new"} className="button flex">
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit Menu Item</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                key={item._id}
                className="bg-mywhite hover:bg-gray-100 hover:shadow-md hover:shadow-black/25 hover:z-1 transition-all rounded-lg p-4"
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image || "/pizza.jpg"}
                    alt="image"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

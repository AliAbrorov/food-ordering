"use client";

import Loader from "@/components/Loader";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function UsersPage() {
  const { loading, data } = useProfile();
  const [users, setUsers] = useState("");

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        console.log(users);
        setUsers(users);
      });
    });
  }, []);

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
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-1 p-1 px-4 flex  items-center gap-4"
            >
              <div className="grid grid-cols-3 md:grid-cols-3 gap-3 grow">
                <div className="text-gray-900">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>

                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={"/users/" + user._id}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

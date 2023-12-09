import Image from "next/image";
import React from "react";

export default function EditableImage({ link, setLink, userImage }) {
  async function handleFileChange(e) {
    const files = e.target.files;
    if (files?.length === 0) {
      const data = new FormData();
      data.set("file", files[0]);
      await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
  }

  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full"
          width={100}
          height={100}
          src={userImage || "/pizza.jpg"}
          alt="avatar"
        />
      )}
      {!link && (
        <div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1 text-center">
          No image
        </div>
      )}

      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block mt-1 border rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}

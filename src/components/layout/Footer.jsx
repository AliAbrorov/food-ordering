import React from "react";

export default function Footer() {
  return (
    <footer className="border-t p-4 pb-1 text-center text-gray-500 mt-16">
      &copy; {new Date().getFullYear()} All rights reserved
    </footer>
  );
}

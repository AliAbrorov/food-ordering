import React, { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirmation, setShowConfirm] = useState(false);

  if (showConfirmation) {
    return (
      <div className="fixed flex backdrop-blur-sm items-center justify-center inset-0">
        <div className="bg-white p-8 rounded-lg border-black">
          <div>Are you sure you want to delete</div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="danger whitespace-nowrap transition-all"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              Yes, delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setShowConfirm(true)} className="">
      {label}
    </button>
  );
}

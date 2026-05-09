"use client";

import { deleteApplication } from "@/lib/actions/applications";

export function DeleteButton({ id }: { id: string }) {
  return (
    <button
      onClick={() => {
        if (confirm("Delete this application?")) {
          deleteApplication(id);
        }
      }}
      className="text-gray-400 hover:text-red-600"
    >
      Delete
    </button>
  );
}
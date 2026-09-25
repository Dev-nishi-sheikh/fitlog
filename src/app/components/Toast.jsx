"use client";

import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 2400,
        style: {
          background: "#11151c",
          color: "#fff",
          border: "1px solid #252b35",
          fontSize: "12px",
          fontWeight: "700",
        },
      }}
    />
  );
}
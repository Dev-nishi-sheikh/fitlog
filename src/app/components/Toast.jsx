"use client";

import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          background: "#181818",
          color: "#fff",
          border: "1px solid #333",
        },
      }}
    />
  );
};

export default Toast;
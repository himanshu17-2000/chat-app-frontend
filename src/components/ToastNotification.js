import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastNotification = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_CENTER,
  });

  toast.error("Error Notification !", {
    position: toast.POSITION.TOP_LEFT,
  });

  toast.warn("Warning Notification !", {
    position: toast.POSITION.BOTTOM_LEFT,
  });

  toast.info("Info Notification !", {
    position: toast.POSITION.BOTTOM_CENTER,
  });

  toast("Custom Style Notification with css class!", {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "foo-bar",
  });
};

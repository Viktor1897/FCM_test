export const requestPermission = async () => {
    if (!("Notification" in window)) {
      throw new Error("Notification not supported");
    }

    Notification.requestPermission().then((permission) => {
        if (permission === "granted") location.reload();
    });
  };
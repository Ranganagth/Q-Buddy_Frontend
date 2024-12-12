self.addEventListener("push", (event) => {
    const payload = event.data ? event.data.text() : "No payload";
  
    event.waitUntil(
      self.registration.showNotification("New Notification", {
        body: payload,
        icon: "/icon.png", // Replace with your notification icon
      })
    );
  });
  
self.addEventListener('push', function(event) {
  const options = {
    body: event.data.text(),
    icon: '/icon.png',
    badge: '/badge.png',
  };

  event.waitUntil(
    self.registration.showNotification('New Notification', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

self.addEventListener('notificationclick', function(event) {
  const action = event.action;
  const notification = event.notification;

  if (action === 'view_offer') {
    // Redirect user to the offer page
    clients.openWindow(notification.data.url);
  } else if (action === 'dismiss') {
    notification.close(); // Close the notification
  } else {
    clients.openWindow(notification.data.url); // Default action when clicked
  }
  event.waitUntil(notification.close()); // Close the notification after handling
});

self.addEventListener('push', function(event) {
  const payload = event.data.json();
  
  const options = {
    body: payload.body,
    icon: payload.icon,
    badge: payload.badge,
    image: payload.image,
    actions: payload.actions,
    tag: payload.tag,
    requireInteraction: payload.requireInteraction,
    data: { url: payload.url },
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});


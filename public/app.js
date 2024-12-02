// The public VAPID key you generated and will use for push notifications
const publicVapidKey = 'BKrrAwAE3-0osuXNW4iE9HBJME5bzQmC2fL4QbeEOLjilTuxR-C9xpvYqZDiYITICLxcOvcQvjHg_PT30PeBfvc'; // Replace with your VAPID public key

// Check if the browser supports push notifications and service workers
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Push notifications supported!');
  
  // Register the Service Worker
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
    console.log('Service Worker registered with scope:', registration.scope);
    
    // Enable push notifications subscription
    document.getElementById('subscribeButton').addEventListener('click', function() {
      subscribeUser(registration);
    });
  }).catch(function(error) {
    console.error('Service Worker registration failed:', error);
  });
} else {
  console.error('Push notifications or service workers are not supported in this browser.');
}

// Function to subscribe the user to push notifications
function subscribeUser(registration) {
  registration.pushManager.subscribe({
    userVisibleOnly: true,  // Always show a notification to the user
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),  // VAPID Public Key
  }).then(function(subscription) {
    console.log('User is subscribed:', subscription);
    
    // Send the subscription to the backend
    fetch('http://localhost:3000/notifications/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription), // Send the subscription object
    }).then(function(response) {
      if (response.ok) {
        console.log('Subscription sent to the backend!');
      } else {
        console.error('Failed to send subscription to backend');
      }
    });
  }).catch(function(error) {
    console.error('Failed to subscribe the user:', error);
  });
}

// Helper function to convert the VAPID public key to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

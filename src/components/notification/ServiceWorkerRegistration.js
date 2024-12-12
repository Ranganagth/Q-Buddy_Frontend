import React, { useEffect } from 'react';

const ServiceWorkerRegistration = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        }
    }, []);

    return null; // This component doesn't render anything but handles the side effects
};

export default ServiceWorkerRegistration;

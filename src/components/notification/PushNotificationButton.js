import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import IconButton from '@mui/material/IconButton'; // Material UI IconButton
import Tooltip from '@mui/material/Tooltip';

const PUBLIC_VAPID_KEY = "BFIs2dOMkwSPaFAzT1KCbzi-7VeGykN4x4mUBcgfTLCvC3GGU8sOdxPyWFNaE_XvTU2VoeCK7tWEiXH0Rnw6HG0"; // Replace with your public VAPID key
const API_URL = "http://localhost:3000/notifications"; // Your backend endpoint for subscription

const PushNotificationButton = () => {
    const [status, setStatus] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const subscribeToNotifications = async () => {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.ready;
                const existingSubscription = await registration.pushManager.getSubscription();

                // If already subscribed, no need to subscribe again
                // if (existingSubscription) {
                //     setStatus('Already subscribed to notifications.');
                //     setSnackbarSeverity('info');
                //     setOpenSnackbar(true);
                //     return;
                // }
                // unsubscribe and to resubscribe
                if (existingSubscription) {
                    console.log("Existing subscription found. Unsubscribing...");
                    await existingSubscription.unsubscribe();
                    console.log("Unsubscribed successfully.");
                }

                // Subscribe to push notifications
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
                });

                // Send subscription to your server for storage
                const response = await fetch(`${API_URL}/subscribe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(subscription),
                });

                if (response.ok) {
                    setStatus('Successfully subscribed to notifications!');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                    console.log("Subscription sent to the backend!");
                } else {
                    throw new Error('Failed to send subscription to the backend');
                }
            } catch (error) {
                console.error('Subscription error:', error);
                setStatus('Subscription failed.');
                setSnackbarSeverity('error');
            } finally {
                setOpenSnackbar(true);
            }
        } else {
            console.error('Push notifications are not supported by your browser.');
            setStatus('Push notifications are not supported.');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const urlBase64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    return (
        <>
            {/* <Tooltip title={subscribed ? "Unsubscribe" : "Subscribe to notifications"} enterDelay={1000}> */}
                <IconButton
                    onClick={subscribeToNotifications}
                    sx={{
                        padding: '8px',
                        fontSize: '36px',
                        cursor: 'pointer',
                        color: '#0987f7',
                        transition: 'transform 0.2s, background-color 0.3s',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            backgroundColor: '#f0f0f0',
                        },
                        '&:active': {
                            transform: 'scale(0.95)', // Slight shrink on click for effect
                        },
                    }}
                >
                    <NotificationsActiveIcon />
                </IconButton>
            {/* </Tooltip> */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} elevation={6} variant="filled">
                    {status}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default PushNotificationButton;

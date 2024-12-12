import React, { useState, useEffect } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CampaignIcon from "@mui/icons-material/Campaign";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const PUBLIC_VAPID_KEY = "BFIs2dOMkwSPaFAzT1KCbzi-7VeGykN4x4mUBcgfTLCvC3GGU8sOdxPyWFNaE_XvTU2VoeCK7tWEiXH0Rnw6HG0"; // Replace with your public VAPID key
const API_URL = "http://localhost:3000/notifications"; // Replace with your backend URL

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PushNotificationComponent = () => {
    const [payload, setPayload] = useState("");
    const [status, setStatus] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            navigator.serviceWorker
                .register("./service-worker.js")
                .then((registration) => {
                    console.log("Service Worker registered with scope:", registration.scope);
                })
                .catch((error) => {
                    console.error("Service Worker registration failed:", error);
                });
        }
    }, []);

    const subscribeUser = async () => {
        if ("serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.ready;

                const existingSubscription = await registration.pushManager.getSubscription();
                if (existingSubscription) {
                    console.log("Existing subscription found. Unsubscribing...");
                    await existingSubscription.unsubscribe();
                    console.log("Unsubscribed successfully.");
                }

                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
                });

                const response = await fetch(`${API_URL}/subscribe`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(subscription),
                });

                if (response.ok) {
                    setStatus("Subscribed successfully!");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true);
                    console.log("Subscription sent to the backend!");
                } else {
                    throw new Error("Failed to send subscription to backend");
                }
            } catch (error) {
                console.error("Failed to subscribe the user:", error);
                setStatus("An error occurred during subscription.");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }
        } else {
            console.error("Push notifications are not supported by your browser.");
            setStatus("Push notifications are not supported.");
            setSnackbarSeverity("warning");
            setOpenSnackbar(true);
        }
    };

    const broadcastNotification = async () => {
        if (!payload.trim()) {
            alert("Please enter a payload for the notification.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/broadcast`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payload }),
            });

            const result = await response.json();
            setStatus(result.message);
        } catch (error) {
            console.error("Error during broadcasting:", error);
            setStatus("Broadcast failed. Check console for details.");
        }
    };

    const urlBase64ToUint8Array = (base64String) => {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div style={{ marginTop: "16px", textAlign: "center" }}>
            <Tooltip title="Get notified" arrow>
                <NotificationsActiveIcon
                    onClick={subscribeUser}
                    style={{
                        padding: "8px 16px",
                        fontSize: "36px",
                        marginRight: "10px",
                        cursor: "pointer",
                    }}
                />
            </Tooltip>
            <TextField
                id="outlined-basic"
                label="Broadcast"
                variant="outlined"
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                placeholder="Enter message for broadcast notification"
            />
            <CampaignIcon onClick={broadcastNotification} style={{ padding: "8px 16px", fontSize: "36px" }} />
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {status}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default PushNotificationComponent;

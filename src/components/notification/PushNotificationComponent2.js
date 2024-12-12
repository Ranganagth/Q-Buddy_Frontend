import React, { useState } from "react";
import PushNotificationButton from "./PushNotificationButton";
import BroadcastNotificationInput from "./BroadcastNotificationInput";
import SnackbarAlert from "./SnackbarAlert";
import ServiceWorkerRegistration from "./ServiceWorkerRegistration";

const PushNotificationComponent2 = () => {
    const [payload, setPayload] = useState("");
    const [status, setStatus] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const API_URL = "http://localhost:3000/notifications"; 
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error during broadcasting:", error);
            setStatus("Broadcast failed. Check console for details.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    return (
        <div style={{ marginTop: "16px", textAlign: "center" }}>
            <ServiceWorkerRegistration />
            <PushNotificationButton
                setStatus={setStatus}
                setSnackbarSeverity={setSnackbarSeverity}
                setOpenSnackbar={setOpenSnackbar}
            />
            <BroadcastNotificationInput
                payload={payload}
                setPayload={setPayload}
                broadcastNotification={broadcastNotification}
            />
            <SnackbarAlert
                openSnackbar={openSnackbar}
                handleCloseSnackbar={handleCloseSnackbar}
                status={status}
                snackbarSeverity={snackbarSeverity}
            />
        </div>
    );
};

export default PushNotificationComponent2;

import React from "react";
import TextField from "@mui/material/TextField";
import CampaignIcon from "@mui/icons-material/Campaign";

const BroadcastNotificationInput = ({ payload, setPayload, broadcastNotification }) => {
    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Broadcast"
                variant="outlined"
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                placeholder="Enter message for broadcast notification"
            />
            <CampaignIcon onClick={broadcastNotification} style={{ padding: "8px 16px", fontSize: "36px" }} />
        </div>
    );
};

export default BroadcastNotificationInput;

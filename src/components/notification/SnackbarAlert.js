import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = ({ openSnackbar, handleCloseSnackbar, status, snackbarSeverity }) => {
    return (
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                {status}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarAlert;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Stack, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import API_BASE_URL from '../../apiConfig';

const UserPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        // Fetch all users from the backend
        axios
            .get(`${API_BASE_URL}/user/getAllUsers`)
            .then((response) => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch((err) => {
                console.error('Error fetching users:', err);
            });
    }, []);

    const handleSearch = () => {
        const filtered = users.filter((user) =>
            Object.values(user)
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <Box
            sx={{
                height: "80vh",
                width: "80vw",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Users
            </Typography>
            <Box sx={{ width: "100%", maxWidth: 900, mb: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                        label="Search Users"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSearch}>
                        Search
                    </Button>
                </Stack>
            </Box>
            <TableContainer component={Paper} sx={{ maxWidth: 900, flexGrow: 1, overflowY: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.contactNumber}</TableCell>
                                <TableCell>{user.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserPage;

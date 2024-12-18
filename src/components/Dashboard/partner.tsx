import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Stack, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import API_BASE_URL from '../../apiConfig';

const PartnerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPartners, setFilteredPartners] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all partners from the backend
    axios
      .get(`${API_BASE_URL}/user/getAllPartners`)
      .then((response) => {
        setPartners(response.data);
        setFilteredPartners(response.data);
      })
      .catch((err) => {
        console.error('Error fetching partners:', err);
      });
  }, []);

  const handleSearch = () => {
    const filtered = partners.filter((partner) =>
      Object.values(partner)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredPartners(filtered);
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
        Partners
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 900, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Search Partners"
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
            {filteredPartners.map((partner) => (
              <TableRow key={partner._id}>
                <TableCell>{partner.name}</TableCell>
                <TableCell>{partner.email}</TableCell>
                <TableCell>{partner.contactNumber}</TableCell>
                <TableCell>{partner.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PartnerPage;

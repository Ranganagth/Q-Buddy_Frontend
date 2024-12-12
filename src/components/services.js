import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Stack,
} from "@mui/material";

// Sample service data
const servicesData = [
  { id: 1, Type: "Standing", Location: "Concerts", price: "$120", status: "Avaliable" },
  { id: 2, Type: "Sitting", Location: "Governament office", price: "$80", status: "Avaliable" },
  { id: 3, Type: "Standing/Sitting", Location: "Passport verification", price: "$50", status: "Processing" },
  { id: 4, Type: "Sitting", Location: "Hospitals", price: "$10", status: "Canceled" },
];

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredservices, setFilteredservices] = useState(servicesData);

  const handleSearch = () => {
    const filtered = servicesData.filter((service) =>
      Object.values(service)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredservices(filtered);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Services
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 900, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Search Services"
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
              <TableCell>Service ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredservices.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.Type}</TableCell>
                <TableCell>{service.Location}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>{service.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServicesPage;

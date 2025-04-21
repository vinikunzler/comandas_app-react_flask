import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Toolbar,
} from "@mui/material";
import { Edit, Delete, Visibility, FiberNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function ClienteList() {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Toolbar
        sx={{
          backgroundColor: "#fff8ae",
          padding: 2,
          borderRadius: 1,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color="primary">
          Clientes
        </Typography>
        <Button
          color="primary"
          onClick={() => navigate("/cliente")}
          startIcon={<FiberNew />}
        >
          Novo
        </Button>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={1}>
            <TableCell>10</TableCell>
            <TableCell>Abc</TableCell>
            <TableCell>123.456.789-00</TableCell>
            <TableCell>(11) 98765-4321</TableCell>
            <TableCell>
              <IconButton>
                <Visibility color="primary" />
              </IconButton>
              <IconButton>
                <Edit color="secondary" />
              </IconButton>
              <IconButton>
                <Delete color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ClienteList;

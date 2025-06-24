import React from "react";
import { Box, Typography, Toolbar, Button, Stack } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { generatePDF } from "../utils/generatePDF";


const Home = () => {
  return (
    <Box
      sx={{ backgroundColor: "#fff8ae", padding: 1, borderRadius: 1, mt: 2 }}
    >
      <Toolbar
        sx={{
          backgroundColor: "#fff8ae",
          padding: 1,
          borderRadius: 2,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color="primary">
          Home
        </Typography>
      </Toolbar>
      <Box
        sx={{ backgroundColor: "white", padding: 2, borderRadius: 3, mb: 2 }}
      >
        <Typography variant="body1" color="textPrimary">
          Bem-vindo ao aplicativo Comandas!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Explore as funcionalidades e aproveite sua experiência.
        </Typography>
        <Typography variant="body1" color="textDisabled">
          {`Data atual: ${new Date().toLocaleDateString()}`}
        </Typography>
        <Stack direction="row" spacing={2} mt={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdfIcon />}
            onClick={() => generatePDF("funcionarios")}
          >
            Funcionário
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdfIcon />}
            onClick={() => generatePDF("clientes")}
          >
            Cliente
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdfIcon />}
            onClick={() => generatePDF("produtos")}
          >
            Produto
          </Button>

        </Stack>
      </Box>
    </Box>
  );
};

export default Home;

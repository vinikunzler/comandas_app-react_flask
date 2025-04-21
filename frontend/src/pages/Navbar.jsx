import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img from "../assets/pastel.png"; // Importando a imagem do pastel
const Navbar = () => {
  const navigate = useNavigate();
  const loginRealizado = localStorage.getItem("loginRealizado");
  const handleLogout = () => {
    localStorage.removeItem("loginRealizado");
    navigate("/login");
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "#fef056", color: "#000" }}>
      <Toolbar>
        <img
          src={img}
          alt="Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          Comandas
        </Typography>
        {loginRealizado && (
          <>
            <Button color="inherit" onClick={() => navigate("/home")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/funcionarios")}>
              Funcionários
            </Button>
            <Button color="inherit" onClick={() => navigate("/clientes")}>
              Clientes
            </Button>
            <Button color="inherit" onClick={() => navigate("/produtos")}>
              Produtos
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Sair
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;

// useEffect executar efeitos colaterais, como buscar dados da API / Proxy/BFF ao carregar o componente.
// useState gerenciar o estado local do componente, como a lista de funcionários.
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Edit, Delete, Visibility, FiberNew } from "@mui/icons-material";
// useNavigate navegar entre páginas.
import { useNavigate } from "react-router-dom";
// serviços - funções para buscar e deletar funcionários
import {
  getClientes,
  deleteCliente,
} from "../services/clienteService";
// mensagens de sucesso, erro e confirmação
import { toast } from "react-toastify";
// useTheme para acessar o tema do Material-UI.
import { useTheme } from "@mui/material/styles";
function ClienteList() {
  // O useNavigate é um hook que permite navegar programaticamente entre as rotas da aplicação
  const navigate = useNavigate();
  // Hook para detectar o tamanho da tela
  // theme: Obtém o tema do Material-UI.
  const theme = useTheme();
  // Aqui, estamos verificando se a tela é menor ou igual ao breakpoint 'sm' definido no tema
  // O valor 'sm' é definido no tema do Material-UI e representa um breakpoint específico (geralmente 600px)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // useState: usado para gerenciar o estado local do componente, como a lista de funcionários.
  // Aqui, estamos criando um estado chamado clientes e uma função para atualizá-lo chamada setClientes.
  // O estado inicial é um array vazio, que será preenchido com os dados dos funcionários após a chamada da API / Proxy/BFF.
  const [clientes, setClientes] = useState([]);
  // Função para buscar a lista de funcionários da API / Proxy/BFF
  // getClientes: função que faz a chamada à API / Proxy/BFF para buscar os funcionários.
  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };
  // useEffect usado para executar efeitos colaterais, como buscar dados da API / Proxy/BFF ao carregar o componente.
  // O array vazio [] significa que o efeito será executado apenas uma vez, quando o componente for montado.
  useEffect(() => {
    fetchClientes();
  }, []);
  // Função para lidar com o clique no botão de deletar funcionário
  // handleDeleteClick: função que exibe um toast de confirmação antes de excluir o funcionário.
  const handleDeleteClick = (cliente) => {
    toast(
      <div>
        <Typography>
          Tem certeza que deseja excluir o funcionário{" "}
          <strong>{cliente.nome}</strong>?
        </Typography>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteConfirm(cliente.id_cliente)}
            style={{ marginRight: "10px" }}
          >
            Excluir
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => toast.dismiss()}
          >
            Cancelar
          </Button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };
  const handleDeleteConfirm = async (id) => {
    try {
      await deleteCliente(id);
      fetchClientes();
      toast.dismiss(); // Fecha o toast após a exclusão
      toast.success("Cliente excluído com sucesso!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
      toast.error("Erro ao excluir funcionário.", { position: "top-center" });
    }
  };
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
            {/* conforme o tamanho da tela, define o que renderizar */}
            {!isSmallScreen && (
              <>
                <TableCell>Telefone</TableCell>
              </>
            )}
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.id_cliente}>
              <TableCell>{cliente.id_cliente}</TableCell>
              <TableCell>{cliente.nome}</TableCell>
              <TableCell>{cliente.cpf}</TableCell>
              {/* conforme o tamanho da tela, define o que renderizar */}
              {!isSmallScreen && (
                <>
                  <TableCell>{cliente.telefone}</TableCell>
                </>
              )}
              <TableCell>
                {/* executa a rota, passando o opr view e o id selecionado */}
                <IconButton
                  onClick={() =>
                    navigate(`/cliente/view/${cliente.id_cliente}`)
                  }
                >
                  <Visibility color="primary" />
                </IconButton>
                {/* executa a rota, passando o opr edit e o id selecionado */}
                <IconButton
                  onClick={() =>
                    navigate(`/cliente/edit/${cliente.id_cliente}`)
                  }
                >
                  <Edit color="secondary" />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(cliente)}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ClienteList;

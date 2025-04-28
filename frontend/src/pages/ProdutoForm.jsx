import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Toolbar,
} from "@mui/material";

const ProdutoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados do produto:", data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ backgroundColor: "#fff8ae", padding: 2, borderRadius: 1, mt: 2 }}
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
          Dados Produto
        </Typography>
      </Toolbar>
      <Box
        sx={{ backgroundColor: "white", padding: 2, borderRadius: 3, mb: 2 }}
      >
        <TextField
          label="ID Produto"
          fullWidth
          margin="normal"
          {...register("id_produto", { required: "ID do produto é obrigatório" })}
          error={!!errors.id_produto}
          helperText={errors.id_produto?.message}
        />
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          {...register("nome", { required: "Nome é obrigatório" })}
          error={!!errors.nome}
          helperText={errors.nome?.message}
        />
        <TextField
          label="Descrição"
          fullWidth
          margin="normal"
          {...register("descricao", { required: "Descrição é obrigatória" })}
          error={!!errors.descricao}
          helperText={errors.descricao?.message}
        />
        <TextField
          label="Foto (URL)"
          fullWidth
          margin="normal"
          {...register("foto", { required: "URL da foto é obrigatória" })}
          error={!!errors.foto}
          helperText={errors.foto?.message}
        />
        <TextField
          label="Valor Unitário"
          type="number"
          fullWidth
          margin="normal"
          {...register("valor_unitario", {
            required: "Valor unitário é obrigatório",
            min: {
              value: 0,
              message: "O valor deve ser maior ou igual a 0",
            },
          })}
          error={!!errors.valor_unitario}
          helperText={errors.valor_unitario?.message}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button sx={{ mr: 1 }} onClick={() => reset()}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProdutoForm;

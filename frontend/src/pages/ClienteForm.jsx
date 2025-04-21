import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Toolbar,
} from "@mui/material";

// Função para formatar CPF
const formatCPF = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
};

// Função para formatar telefone
const formatTelefone = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
    .slice(0, 15);
};

const ClienteForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados do cliente:", data);
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
          Dados Cliente
        </Typography>
      </Toolbar>

      <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 3, mb: 2 }}>
        <TextField
          label="ID Cliente"
          fullWidth
          margin="normal"
          {...register("id_cliente", { required: "ID Cliente é obrigatório" })}
          error={!!errors.id_cliente}
          helperText={errors.id_cliente?.message}
        />

        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          {...register("nome", { required: "Nome é obrigatório" })}
          error={!!errors.nome}
          helperText={errors.nome?.message}
        />

        {/* CPF com formatação manual */}
        <Controller
          name="cpf"
          control={control}
          defaultValue=""
          rules={{
            required: "CPF é obrigatório",
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: "CPF inválido",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="CPF"
              fullWidth
              margin="normal"
              onChange={(e) => field.onChange(formatCPF(e.target.value))}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
          )}
        />

        {/* Telefone com formatação manual */}
        <Controller
          name="telefone"
          control={control}
          defaultValue=""
          rules={{
            required: "Telefone é obrigatório",
            pattern: {
              value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
              message: "Telefone inválido",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Telefone"
              fullWidth
              margin="normal"
              onChange={(e) => field.onChange(formatTelefone(e.target.value))}
              error={!!errors.telefone}
              helperText={errors.telefone?.message}
            />
          )}
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

export default ClienteForm;

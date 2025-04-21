import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
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

const FuncionarioForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados do funcionário:", data);
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
          Dados Funcionário
        </Typography>
      </Toolbar>

      <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 3, mb: 2 }}>
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

        {/* E-mail */}
        <TextField
          label="E-mail"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "E-mail inválido",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Login"
          fullWidth
          margin="normal"
          {...register("login", { required: "Login é obrigatório" })}
          error={!!errors.login}
          helperText={errors.login?.message}
        />

        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          {...register("senha", {
            required: "Senha é obrigatória",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
          error={!!errors.senha}
          helperText={errors.senha?.message}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="grupo-label">Grupo</InputLabel>
          <Select
            labelId="grupo-label"
            label="Grupo"
            defaultValue=""
            {...register("grupo", { required: true })}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="gerente">Gerente</MenuItem>
            <MenuItem value="funcionario">Funcionário</MenuItem>
          </Select>
        </FormControl>

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

export default FuncionarioForm;

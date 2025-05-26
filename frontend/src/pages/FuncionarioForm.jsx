import React, { useEffect, useState } from "react";
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
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import IMaskInputWrapper from "../components/IMaskInputWrapper";
import {
	createFuncionario,
	updateFuncionario,
	getFuncionarioById,
	checkCpfExists, // <-- Adicione esse método no seu service
} from "../services/funcionarioService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FuncionarioForm = () => {
	const { id, opr } = useParams();
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		reset,
		setError,
		clearErrors,
		formState: { errors },
		getValues,
	} = useForm();

	const [cpfDialogOpen, setCpfDialogOpen] = useState(false);
	const [cpfFuncionario, setCpfFuncionario] = useState(null);

	const isReadOnly = opr === "view";
	let title;
	if (opr === "view") {
		title = `Visualizar Funcionário: ${id}`;
	} else if (id) {
		title = `Editar Funcionário: ${id}`;
	} else {
		title = "Novo Funcionário";
	}

	useEffect(() => {
		if (id) {
			const fetchFuncionario = async () => {
				const data = await getFuncionarioById(id);
				reset(data);
			};
			fetchFuncionario();
		}
	}, [id, reset]);

	// Função para validar CPF ao sair do campo
	const handleCpfBlur = async (event) => {
		const cpf = event.target.value;
		if (!cpf) return;
		try {
			const funcionarios = await checkCpfExists(cpf);
			console.log("Funcionários encontrados:", funcionarios);
			console.log("ID do funcionário:", id);
			if (funcionarios.length > 0 && String(funcionarios[0].id_funcionario) !== String(id)) {
				setCpfFuncionario(funcionarios[0]);
				setCpfDialogOpen(true);
				setError("cpf", {
					type: "manual",
					message: "CPF já cadastrado para outro funcionário.",
				});
			} else {
				setCpfFuncionario(null);
				setCpfDialogOpen(false);
				clearErrors("cpf");
			}
		} catch (e) {
			// Se não encontrar, não faz nada
			setCpfFuncionario(null);
			setCpfDialogOpen(false);
			clearErrors("cpf");
		}
	};

	const handleCpfDialogClose = () => {
		setCpfDialogOpen(false);
	};

	const handleCpfDialogView = () => {
		setCpfDialogOpen(false);
		navigate(`/funcionario/view/${cpfFuncionario.id_funcionario}`);
	};

	const handleCpfDialogEdit = () => {
		setCpfDialogOpen(false);
		navigate(`/funcionario/edit/${cpfFuncionario.id_funcionario}`);
	};

	const onSubmit = async (data) => {
		if (cpfFuncionario && String(cpfFuncionario.id_funcionario) !== String(id)) {
			setError("cpf", {
				type: "manual",
				message: "CPF já cadastrado para outro funcionário.",
			});
			return;
		}
		try {
			let retorno;
			if (id) {
				retorno = await updateFuncionario(id, data);
			} else {
				retorno = await createFuncionario(data);
			}
			if (!retorno || !retorno.id) {
				throw new Error(retorno.erro || "Erro ao salvar funcionário.");
			}
			toast.success(`Funcionário salvo com sucesso. ID: ${retorno.id}`, {
				position: "top-center",
			});
			navigate("/funcionarios");
		} catch (error) {
			toast.error(`Erro ao salvar funcionário: \n${error.message}`, {
				position: "top-center",
			});
		}
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
				<Typography variant="h6" gutterBottom color="primary">
					{title}
				</Typography>
			</Toolbar>
			<Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 3, mb: 2 }}>
				{opr === "view" && (
					<Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
						Todos os campos estão em modo somente leitura.
					</Typography>
				)}
				<Controller
					name="nome"
					control={control}
					defaultValue=""
					rules={{ required: "Nome é obrigatório" }}
					render={({ field }) => (
						<TextField
							{...field}
							disabled={isReadOnly}
							label="Nome"
							fullWidth
							margin="normal"
							error={!!errors.nome}
							helperText={errors.nome?.message}
						/>
					)}
				/>
				{/* CPF com máscara */}
				<Controller
					name="cpf"
					control={control}
					defaultValue=""
					rules={{ required: "CPF é obrigatório" }}
					render={({ field }) => (
						<TextField
							{...field}
							disabled={isReadOnly}
							label="CPF"
							fullWidth
							margin="normal"
							error={!!errors.cpf}
							helperText={errors.cpf?.message}
							InputProps={{
								inputComponent: IMaskInputWrapper,
								inputProps: {
									mask: "000.000.000-00",
									definitions: { 0: /\d/ },
									unmask: true,
								},
							}}
							onBlur={(e) => {
								field.onBlur();
								handleCpfBlur(e);
							}}
						/>
					)}
				/>
				<Controller
					name="matricula"
					control={control}
					defaultValue=""
					rules={{ required: "Matrícula é obrigatória" }}
					render={({ field }) => (
						<TextField
							{...field}
							disabled={isReadOnly}
							label="Matrícula"
							fullWidth
							margin="normal"
							error={!!errors.matricula}
							helperText={errors.matricula?.message}
						/>
					)}
				/>
				{/* Telefone com máscara */}
				<Controller
					name="telefone"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							disabled={isReadOnly}
							label="Telefone"
							fullWidth
							margin="normal"
							error={!!errors.telefone}
							helperText={errors.telefone?.message}
							InputProps={{
								inputComponent: IMaskInputWrapper,
								inputProps: {
									mask: "(00) 00000.0000",
									definitions: { 0: /\d/ },
									unmask: true,
								},
							}}
						/>
					)}
				/>
				<Controller
					name="senha"
					control={control}
					defaultValue=""
					rules={{
						required: "Senha obrigatória",
						minLength: { value: 6, message: "Pelo menos 6 caracteres" },
					}}
					render={({ field }) => (
						<TextField
							{...field}
							disabled={isReadOnly}
							label="Senha"
							type="password"
							fullWidth
							margin="normal"
							error={!!errors.senha}
							helperText={errors.senha?.message}
						/>
					)}
				/>
				<Controller
					name="grupo"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<FormControl fullWidth margin="normal">
							<InputLabel id="grupo-label">Grupo</InputLabel>
							<Select
								{...field}
								disabled={isReadOnly}
								label="Grupo"
								labelId="grupo-label"
							>
								<MenuItem value="1">Admin</MenuItem>
								<MenuItem value="2">Atendimento Balcão</MenuItem>
								<MenuItem value="3">Atendimento Caixa</MenuItem>
							</Select>
						</FormControl>
					)}
				/>
				<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
					<Button onClick={() => navigate("/funcionarios")} sx={{ mr: 1 }}>
						Cancelar
					</Button>
					{opr !== "view" && (
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={!!errors.cpf}
						>
							{id ? "Atualizar" : "Cadastrar"}
						</Button>
					)}
				</Box>
			</Box>
			{/* Diálogo de CPF já existente */}
			<Dialog open={cpfDialogOpen} onClose={handleCpfDialogClose}>
				<DialogTitle>CPF já cadastrado</DialogTitle>
				<DialogContent>
					<Typography>
						Este CPF já está cadastrado para outro funcionário.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCpfDialogClose}>Cancelar</Button>
					<Button onClick={handleCpfDialogView} color="primary">
						Visualizar dados
					</Button>
					<Button onClick={handleCpfDialogEdit} color="primary" variant="contained">
						Editar dados
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default FuncionarioForm;

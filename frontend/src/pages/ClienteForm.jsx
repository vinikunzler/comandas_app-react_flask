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
	createCliente,
	updateCliente,
	getClienteById,
	checkCpfExists, // <-- Adicione esse método no seu service
} from "../services/clienteService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ClienteForm = () => {
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
	const [cpfCliente, setCpfCliente] = useState(null);

	const isReadOnly = opr === "view";
	let title;
	if (opr === "view") {
		title = `Visualizar Cliente: ${id}`;
	} else if (id) {
		title = `Editar Cliente: ${id}`;
	} else {
		title = "Novo Cliente";
	}

	useEffect(() => {
		if (id) {
			const fetchCliente = async () => {
				const data = await getClienteById(id);
				reset(data);
			};
			fetchCliente();
		}
	}, [id, reset]);

	// Função para validar CPF ao sair do campo
	const handleCpfBlur = async (event) => {
		const cpf = event.target.value;
		if (!cpf) return;
		try {
			const clientes = await checkCpfExists(cpf);
			console.log("Clientes encontrados:", clientes);
			console.log("ID do funcionário:", id);
			if (clientes.length > 0 && String(clientes[0].id_cliente) !== String(id)) {
				setCpfCliente(clientes[0]);
				setCpfDialogOpen(true);
				setError("cpf", {
					type: "manual",
					message: "CPF já cadastrado para outro funcionário.",
				});
			} else {
				setCpfCliente(null);
				setCpfDialogOpen(false);
				clearErrors("cpf");
			}
		} catch (e) {
			// Se não encontrar, não faz nada
			setCpfCliente(null);
			setCpfDialogOpen(false);
			clearErrors("cpf");
		}
	};

	const handleCpfDialogClose = () => {
		setCpfDialogOpen(false);
	};

	const handleCpfDialogView = () => {
		setCpfDialogOpen(false);
		navigate(`/cliente/view/${cpfCliente.id_cliente}`);
	};

	const handleCpfDialogEdit = () => {
		setCpfDialogOpen(false);
		navigate(`/cliente/edit/${cpfCliente.id_cliente}`);
	};

	const onSubmit = async (data) => {
		if (cpfCliente && String(cpfCliente.id_cliente) !== String(id)) {
			setError("cpf", {
				type: "manual",
				message: "CPF já cadastrado para outro funcionário.",
			});
			return;
		}
		try {
			let retorno;
			if (id) {
				retorno = await updateCliente(id, data);
			} else {
				retorno = await createCliente(data);
			}
			if (!retorno || !retorno.id) {
				throw new Error(retorno.erro || "Erro ao salvar funcionário.");
			}
			toast.success(`Cliente salvo com sucesso. ID: ${retorno.id}`, {
				position: "top-center",
			});
			navigate("/clientes");
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
				<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
					<Button onClick={() => navigate("/clientes")} sx={{ mr: 1 }}>
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
						Este CPF já está cadastrado para outro cliente.
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

export default ClienteForm;

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getFuncionarios } from "../services/funcionarioService";
import { getClientes } from "../services/clienteService";
import { getProdutos } from "../services/produtoService";

export const generatePDF = async (type) => {
  const doc = new jsPDF();
  let data = [];
  let columns = [];

  if (type === "funcionarios") {
    const funcionarios = await getFuncionarios();
    columns = ["ID", "Matricula", "Nome", "CPF", "Telefone", "Cargo"];
    const cargoMap = {
      1: "Admin",
      2: "Atendimento Balcão",
      3: "Atendimento Caixa",
    };
    data = funcionarios.map((f) => [
      f.id_funcionario,
      f.matricula,
      f.nome,
      f.cpf,
      f.telefone,
      cargoMap[f.grupo] || f.grupo,
    ]);
    doc.text("Relatório de Funcionários", 14, 15);
  }

  if (type === "clientes") {
    const clientes = await getClientes();
    columns = ["ID", "Nome", "CPF", "Telefone"];
    data = clientes.map((c) => [c.id_cliente, c.nome, c.cpf, c.telefone]);
    doc.text("Relatório de Clientes", 14, 15);
  }
  
if (type === "produtos") {
    const produtos = await getProdutos();
    columns = ["Imagem", "Nome", "Descrição", "Valor"];

    data = produtos.map(p => [
      { image: p.foto_base64, id: p.id_produto }, // Custom cell com imagem
      p.nome,
      p.descricao,
      `R$ ${p.valor_unitario}`,
    ]);

    doc.text("Relatório de Produtos", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [columns],
      body: data,
      didDrawCell: data => {
        if (data.column.index === 0 && data.cell.raw?.image) {
          try {
            const imgProps = doc.getImageProperties(data.cell.raw.image);
            const cellHeight = data.cell.height - 2;
            const imgRatio = imgProps.width / imgProps.height;
            const imgHeight = cellHeight;
            const imgWidth = imgHeight * imgRatio;
            const x = data.cell.x + 1;
            const y = data.cell.y + 1;

            doc.addImage(data.cell.raw.image, 'JPEG', x, y, imgWidth, imgHeight);
          } catch (err) {
            console.warn("Erro ao renderizar imagem:", err);
          }
        }
      },
    });

    doc.save("produtos.pdf");
    return;
  }


  autoTable(doc, {
    startY: 20,
    head: [columns],
    body: data,
  });

  doc.save(`${type}.pdf`);
};

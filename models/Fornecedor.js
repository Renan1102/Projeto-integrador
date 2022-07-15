import mongoose from "mongoose";

const FornecedorSchema = new mongoose.Schema({
  nomeFornecedor: {
    type: String,
    required: [true, "Insira um nome Valido"],
},
codigo: {
    type: String,
    required: [true, "Insira um código Valido"],
},
endereco: {
    type: String,
    required: [true, "Insira um endereco Valido"],
},
CEP: {
    type: String,
    required: [true, "Insira um CEP Valido"],
},
contato: {
    type: String,
    required: [true, "Insira um valor Valido"],
},
telefone: {
    type: String,
    required: [true, "Insira um telefone Valido"],
},
CNPJ: {
    type: String,
    required: [true, "Insira um CNPJ Valido"],
},
});

export default mongoose.models.fornecedor || mongoose.model("fornecedor", FornecedorSchema);

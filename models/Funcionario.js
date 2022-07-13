import mongoose from "mongoose";

const FuncionarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Insira um nome Valido"],
},
codigo: {
    type: String,
    required: [true, "Insira um ultimo nome Valido"],
},
endereco: {
    type: String,
    required: [true, "Insira um endereco Valido"],
},
dataNascimento: {
    type: String,
    required: [true, "Insira uma data Valida"],
},
salario: {
    type: String,
    required: [true, "Insira um valor Valido"],
},
telefone: {
    type: String,
    required: [true, "Insira um telefone Valido"],
},
funcao: {
    type: String,
    required: [true, "Insira uma funcao Valida"],
},
});

export default mongoose.models.Funcionario || mongoose.model("Funcionario", FuncionarioSchema);

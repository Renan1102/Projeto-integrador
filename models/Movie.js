import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Insira um nome Valido"],
},
codigo: {
    type: String,
    required: [true, "Insira um ultimo nome Valido"],
},
categoria: {
    type: String,
    required: [true, "Insira um E-Mail Valido"],
},
data: {
    type: String,
    required: [true, "Insira uma senha Valida"],
},
qtd: {
    type: String,
    required: [true, "Insira uma senha Valida"],
},
valor: {
    type: String,
    required: [true, "Insira uma senha Valida"],
},
descricao: {
    type: String,
    required: [true, "Insira uma senha Valida"],
},
perecivel: {
    type: Boolean,
    required: [true, "Insira uma senha Valida"],
},
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);

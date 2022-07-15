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
    required: [true, "Insira uma categoria Valida"],
},
data: {
    type: String,
    required: [true, "Insira uma data Valida"],
},
qtd: {
    type: String,
    required: [true, "Insira uma qtd Valida"],
},
valor: {
    type: String,
    required: [true, "Insira um valor Valido"],
},
descricao: {
    type: String,
    required: [true, "Insira uma senha Valida"],
},
perecivel: {
    type: String,
    required: [true, "Insira valor Valido para este campo"],
},
//fornecedor: [{ type: Schema.Types.ObjectId, ref: 'fornecedor' }]
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);

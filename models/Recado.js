import mongoose from "mongoose";

const RecadoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Insira um nome Valido"],
},
descricao: {
    type: String,
    required: [true, "Insira uma descrição  Valida"],
},
mensagem: {
    type: String,
    required: [true, "Insira uma mensagem Valida"],
},


});

module.exports= mongoose.models.Recado || mongoose.model("Recado", RecadoSchema);

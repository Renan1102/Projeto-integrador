import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Insira um nome Valido"],
},
ultimo_nome: {
    type: String,
    required: [true, "Insira um ultimo nome Valido"],
},
email: {
    type: String,
    required: [true, "Insira um E-Mail Valido"],
},
senha: {
    type: String,
    required: [true, "Insira uma senha Valida"],
},

});

export default mongoose.models.User || mongoose.model("User", UserSchema);

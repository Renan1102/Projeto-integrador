import conectarDB from "../../../lib/dbConnect";
import User from "../../../models/User";
const crypto = require("crypto");

//criptografar
const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    segredo : "chaves",
    tipo : "hex"
};

function  criptografar(senha) {
	const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
	cipher.update(senha);
	return cipher.final(DADOS_CRIPTOGRAFAR.tipo);


  //console.log(senha)
};

export default async function handler(req, res) {
  await conectarDB();

  // POST api/user/lgoin

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        
        const usuar = await User.findOne({email: req.body.email})

        const senha = req.body.senha
        const crip = await criptografar(senha)

        const cripado = await User.findOne({senha: crip})
//console.log(usuar.senha)
//console.log(cripado.senha)

    if(usuar.senha === cripado.senha){
         return res.status(200).json({success: "usuario logado"})

    }

      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falha de servidor" });
  }
}

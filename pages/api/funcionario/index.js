import conectarDB from "../../../lib/dbConnect";
import Funcionario from "../../../models/Funcionario";

export default async function handler(req, res) {
  await conectarDB();

  // POST api/funcionario

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const funcionario = new Funcionario(req.body);
        await funcionario.save();

        return res.status(200).json({ success: true, funcionario });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falha de servidor" });
  }
}

import conectarDB from "../../../lib/dbConnect";
import Recado from "../../../models/Recado";

export default async function handler(req, res) {
  await conectarDB();

  // POST api/recado

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const recado = new Recado(req.body);
        await recado.save();

        return res.status(200).json({ success: true, recado });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falha de servidor" });
  }
}

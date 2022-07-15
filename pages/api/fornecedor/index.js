import conectarDB from "../../../lib/dbConnect";
import Fornecedor from "../../../models/Fornecedor";

export default async function handler(req, res) {
  await conectarDB();

  // POST api/fornecedor

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const fornecedor = new Fornecedor(req.body);
        await fornecedor.save();
        alert("salvou no db")
        return res.status(200).json({ success: true, fornecedor });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falha de servidor" });
  }
}

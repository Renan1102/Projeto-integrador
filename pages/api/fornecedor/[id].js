import conectarDB from "../../../lib/dbConnect";
import Fornecedor from "../../../models/Fornecedor";

export default async function handler(req, res) {
  await conectarDB();

  // GET api/fornecedor/:id 
  // DELETE api/fornecedor/:id 
  // PUT api/fornecedor/:id 

  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "PUT":
      try {
        const fornecedor = await Fornecedor.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!fornecedor) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: fornecedor });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }
    case "DELETE":
      try {
        const fornecedor = await Fornecedor.findByIdAndDelete(id);
        if (!fornecedor) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: fornecedor });
      } catch (error) {
        return res.status(404).json({ success: false });
      }
    case "GET":
      try {
        const fornecedor = await Fornecedor.findById(id).lean();
        if (!fornecedor) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: fornecedor });
      } catch (error) {
        return res.status(404).json({ success: false });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falha de servidor" });
  }
}

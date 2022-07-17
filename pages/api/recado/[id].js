import conectarDB from "../../../lib/dbConnect";
import Recado from "../../../models/Recado";

export default async function handler(req, res) {
  await conectarDB();

  // GET api/recado/:id (obtener un id y listarlo)
  // DELETE api/movie/:id (elimina un doc con id)
  // PUT api/movie/:id (modificar un doc con id)

  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "PUT":
      try {
        const recado = await Recado.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!recado) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: recado });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }
    case "DELETE":
      try {
        const recado = await Recado.findByIdAndDelete(id);
        if (!recado) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: recado });
      } catch (error) {
        return res.status(404).json({ success: false });
      }
    case "GET":
      try {
        const recado = await Recado.findById(id).lean();
        if (!recado) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: recado });
      } catch (error) {
        return res.status(404).json({ success: false });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falha de servidor" });
  }
}

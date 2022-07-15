import conectarDB from "../../../lib/dbConnect";
import Funcionario from "../../../models/Funcionario";

export default async function handler(req, res) {
  await conectarDB();

  // GET api/funcionario/:id 
  // DELETE api/funcionario/:id
  // PUT api/funcionario/:id 

  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "PUT":
      try {
        const funcionario = await Funcionario.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!funcionario) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: funcionario });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }
    case "DELETE":
      try {
        const funcionario = await Funcionario.findByIdAndDelete(id);
        if (!funcionario) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: funcionario });
      } catch (error) {
        return res.status(404).json({ success: false });
      }
    case "GET":
      try {
        const funcionario = await Funcionario.findById(id).lean();
        if (!funcionario) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: funcionario });
      } catch (error) {
        return res.status(404).json({ success: false });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falha de servidor" });
  }
}

import conectarDB from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  await conectarDB();

  // POST api/movie

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const movie = new User(req.body);
        await movie.save();

        return res.status(200).json({ success: true, movie });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falha de servidor" });
  }
}

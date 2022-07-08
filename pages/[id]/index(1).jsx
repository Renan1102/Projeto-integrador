import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Base from "../../components/base";
import conectarDB from "../../lib/dbConnect";
import Movie from "../../models/Movie";


const MoviePage = ({ success, error, movie }) => {
  const router = useRouter();

  if (!success) {
    return (
      <div className="container text-center my-5">
        <h1>{error} 🤦‍♂️</h1>

        <Link href="/estoque">
          <a className="btn btn-success">Voltar</a>
        </Link>
      </div>
    );
  }

  const deleteData = async (id) => {
    try {
      await fetch(`/api/movie/${id}`, {
        method: "DELETE",
      });
      router.push("/estoque");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Base />

    <div className="container">
      <h1>Detalhes do produto</h1>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5 className="text-uppercase">{movie.nome}</h5>
          </div>
          <p className="fw-light">Código: {movie.codigo}</p>
          <p className="fw-light">Descricão: {movie.descricao}</p>
          <p className="fw-light">Categoria: {movie.categoria}</p>
          <p className="fw-light">Data Validade: {movie.data}</p>
          <p className="fw-light">Quantidade: {movie.qtd}</p>
          <p className="fw-light">Valor: {movie.valor}</p>
          <p className="fw-light">Perecivel: {movie.perecivel}</p>
          <Link href="/estoque">
            <a className="btn btn-success btn-sm me-2">Voltar</a>
          </Link>
          <Link href={`/${movie._id}/edit`}>
            <a className="btn btn-warning btn-sm me-2">Editar</a>
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteData(movie._id)}
          >
            Remover
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default MoviePage;

export async function getServerSideProps({ params }) {
  try {
    await conectarDB();

    const movie = await Movie.findById(params.id).lean();

    if (!movie) {
      return { props: { success: false, error: "pelicula no encontrada" } };
    }

    console.log(movie);
    movie._id = `${movie._id}`;

    return { props: { success: true, movie } };
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return { props: { success: false, error: "id no válido" } };
    }
    return { props: { success: false, error: "Error de servidor" } };
  }
}

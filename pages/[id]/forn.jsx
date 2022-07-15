import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Base from "../../components/base";
import conectarDB from "../../lib/dbConnect";
import Fornecedor from "../../models/Fornecedor";



const MoviePage = ({ success, error, movie }) => {
  const router = useRouter();

  if (!success) {
    return (
      <div className="container text-center my-5">
        <h1>{error} 🤦‍♂️</h1>

        <Link href="/new4">
          <a className="btn btn-success">Voltar</a>
        </Link>
      </div>
    );
  }

  const deleteData = async (id) => {
    try {
      await fetch(`/api/fornecedor/${id}`, {
        method: "DELETE",
      });
      router.push("/new4");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Base />

    <div className="container">
      <h1>Detalhes do Fornecedor</h1>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5 className="text-uppercase">{movie.nomeFornecedor}</h5>
          </div>
          <p className="fw-light"><b>Código:</b> {movie.codigo}</p>
          <p className="fw-light"><b>Endereco:</b> {movie.endereco}</p>
          <p className="fw-light"><b>CEP:</b> {movie.CEP}</p>
          <p className="fw-light"><b>contato:</b> {movie.contato}</p>
          <p className="fw-light"><b>Telefone:</b> {movie.telefone}</p>
          <p className="fw-light"><b>CNPJ:</b> {movie.CNPJ}</p>
          
          <Link href="/new4">
            <a className="btn btn-success btn-sm me-2">Voltar</a>
          </Link>
          <Link href={`/${movie._id}/editForn`}>
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

    const movie = await Fornecedor.findById(params.id).lean();

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

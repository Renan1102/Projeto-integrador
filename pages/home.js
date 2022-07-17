import Base from "../components/base";
import Form from "../components/recado";
import Recado from "../models/Recado";
import conectarDB from "../lib/dbConnect";
import Link from "next/link";
  export default function Tela4({ movies }) {
  const loginData = {
    nome: "",
    descricao: "",
    mensagem: ""
   
  };
  return (
    <>
      
      <Base />
      
      <img
        className="imagh"
        src="https://blog.bling.com.br/wp-content/uploads/2018/06/controle-de-estoque-na-pratica.jpg"
        alt="Logo "
        height="450vh"
        width="650vh"
      />
      
      
      <h2 className="t1">Recados</h2>
      <div className="td">

      <Form loginData={loginData} />

      <div className="container_reca">
        {movies.map(({ _id, nome,descricao, mensagem }) => (
          
          <div className="bloco_B" key={_id}>
            <div className="">
              <div className="bloco_nome">{nome}</div>
              <p className="fw-light"> {descricao}</p>
          <p className="fw-light">{mensagem}</p>
              
             
              <Link href={`/${_id}/recad`}>
                <a className="abrir">Abrir</a>
              </Link>
            </div>
          </div>
        ))}
        </div>
        </div>

    </>
  );
}

export async function getServerSideProps() {
  try {
    await conectarDB();

    const res = await Recado.find({});

    const movies = res.map((doc) => {
      const movie = doc.toObject();
      movie._id = `${movie._id}`;
      return movie;
    });

    // console.log(res)

    return { props: { movies } };
  } catch (error) {
    console.log(error);
  }
}
import Form from "../components/func";
import Base from "../components/base";

import Head from "next/head";
import Link from "next/link";
import conectarDB from "../lib/dbConnect";
import Funcionario from "../models/Funcionario";
import { AiOutlineUserAdd } from "react-icons/ai";
export default function Func({ movies }) {
  const formData = {
    nome: '',
    codigo: '',
    endereco: '',
    dataNascimento: '',
    salario: '',
    telefone: '',
    funcao: ''
  };

  return (
   /* <>
    
    <div className="container">
      <h1 className="banner">Adicionar Funcionario</h1>
      <Form formData={formData} />
    </div>
    </>
    
  );*/
  <>
    <Base />
    <div>
      <Head>
        
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1>Funcionarios</h1>

        <br/>
        <Link className="func_box" href="/new3">
        <a className="func_button">
         Add Funcionario<AiOutlineUserAdd className="icon_func" size={40} /></a>
        </Link>
        
        <div className="tudo">
        {movies.map(({ _id, nome,codigo, funcao }) => (
          
          <div className="bloco" key={_id}>
            <div className="bloc">
              <div className="bloco_nome">{nome}</div>
              <p className="fw-light">Código: {codigo}</p>
              <p className="fw-light">Função: <b>{funcao}</b></p>
              <Link href={`/${_id}/func`}>
                <a className="abrir">Abrir</a>
              </Link>
            </div>
          </div>
        ))}
        </div>
      </main>
    </div>
    </>
  );
};

export async function getServerSideProps() {
    try {
      await conectarDB();
  
      const res = await Funcionario.find({});
      
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

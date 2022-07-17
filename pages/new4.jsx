import Form from "../components/forn";
import Base from "../components/base";
import Fornecedor from "../models/Fornecedor";
import conectarDB from "../lib/dbConnect";
import Head from "next/head";
import Link from "next/link";
export default function New4({ movies }) {
    const formData = {
        nomeFornecedor: '',
        codigo: '',
        endereco: '',
        CEP: '',
        contato: '',
        telefone: '',
        CNPJ: ''
      };

  return (
    <>
    <Base />
    <div className="container_fornecedor">
    <div className="container">
      <h1 className="banner">Adicionar Fornecedor</h1>
      <Form formData={formData} />
    </div>
    
    <div className="container_forn">
        {movies.map(({ _id, nomeFornecedor,codigo, CNPJ }) => (
          
          <div className="bloco_A" key={_id}>
            <div className="bloc_A">
              <div className="bloco_nome">{nomeFornecedor}</div>
              
             
              <Link href={`/${_id}/forn`}>
                <a className="abrir">Abrir</a>
              </Link>
            </div>
          </div>
        ))}
        </div>
        </div>
    </>
  );
};


export async function getServerSideProps() {
    try {
      await conectarDB();
  
      const res = await Fornecedor.find({});
  
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

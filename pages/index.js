import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { BsBoxSeam } from "react-icons/bs"

import conectarDB from "../lib/dbConnect";
import Movie from "../models/Movie";

export default function Home({userss}) {
  console.log(userss)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const [texto, setTexto] = useState({
    email: "",
    senha: ""
  });
  
  function envio() {
    //texto[event.target.name] = event.target.value;
    setTexto(texto);
  }
  
  async function handleFormSubmit() {
    console.log(texto);
  }

  return (
    <>
    <main>
      <div className="imag">
        <form className="formin" onSubmit={handleSubmit(handleFormSubmit)}>
          <BsBoxSeam className="l1" size={70} />
          <h1 className="topo">Login</h1>
          <label className="labe">
            Nome:
          </label>
          <input
            className="inp"
            placeholder="digite seu email"
            name="email"
            id="email"
            {...register("email", { required: true })}
            onChange={e=>{texto.email=e.target.value;setTexto(texto);}}
                      ></input>
         {errors.email && <span class="mens">Email é obrigatório</span>}

          <br />
          <br />

          <label className="labe">
            Senha:
          </label>
          <input
            className="inp"
            placeholder="digite sua senha"
            name="senha"
            id="senha"
           {...register("senha", { required: true })}
            onChange={e=>{texto.senha=e.target.value;setTexto(texto)}}
          ></input>
          {errors.senha && <span class="mens">Senha é obrigatório</span>}

          <input className="sub1" type="submit" value="Login"></input>
          <p>Ou</p>

          <Link  href="/new2">
          <a className="reg">Registre-se</a>
        </Link>

         
        </form>
      </div>
    </main>
  </>
  )
}



export async function getServerSideProps(){
  try {
      await conectarDB()
      
      const res = await Movie.find({});

      const userss = res.map(doc =>{
          const usuario = doc.toObject();
          usuario._id = `${usuario._id}`;
          return usuario;
      })
      
      return {props: {userss}};
  } catch (error) {
    console.log(error);
  }
}

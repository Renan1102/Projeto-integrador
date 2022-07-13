import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { useRouter } from "next/dist/client/router";
import { BsBoxSeam } from "react-icons/bs"

//import conectarDB from "../lib/dbConnect";
//import Movie from "../models/User";

const login = ({ loginData, forNewUser = true }) => {
    const router = useRouter();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  
  const handleChange = (e) => {
    const { value, name } = e.target;
    setTexto({
      ...texto,
      [name]: value,
    });
  };

  const [texto, setTexto] = useState({
    email: loginData.email,
    senha: loginData.senha
  
  });
  
  
  async function handleFormSubmit() {
    //console.log(texto);
    /*const usuar = await Movie.findOne({email: texto.email})

    if(usuar){
      return res.status(200).json({msg: "usuario logado"})
    }*/
    //e.preventDefault();
    if (forNewUser) {
      postData(texto);
    }
  }

  const postData = async (texto) => {
    try {
      //console.log(texto);
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(texto),
      });

      const data = await res.json();
      console.log(data);

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMenssage((oldmenssage) => [
            ...oldmenssage,
            { message: error.message },
          ]);
        }
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <main>
      <div className="imag">
        <form className="formin" onSubmit={handleSubmit(handleFormSubmit)}>
          <BsBoxSeam className="l1" size={70} />
          <h1 className="topo">Login</h1>
          <label className="labe">
            Email:
          </label>
          <input
            className="inp"
            placeholder="digite seu email"
            name="email"
            id="email"
            {...register("email", { required: true })}
            onChange={handleChange}
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
           onChange={handleChange}
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

export default login;


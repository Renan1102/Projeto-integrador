import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { BsBoxSeam } from "react-icons/bs";
import Link from 'next/link'
const crypto = require("crypto");
let enviarProBanco;
const loginup = ({ loginData, forNewUser = true }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const router = useRouter();

  const [form, setForm] = useState({
    nome: loginData.nome,
    ultimo_nome: loginData.ultimo_nome,
    email: loginData.email,
    senha: loginData.senha
  
  });

  const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    segredo : "chaves",
    tipo : "hex"
};

function  criptografar(senha) {
	const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
	cipher.update(senha);
	return cipher.final(DADOS_CRIPTOGRAFAR.tipo);


  //console.log(senha)
};

  const [message, setMenssage] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmittt = async () => {
   //e.preventDefault();
    console.log("submit")
    //crip
    //sobre
    const crip = await criptografar(form.senha)
    enviarProBanco = form
    enviarProBanco.senha = crip
    console.log("CRIPADO:")
    console.log(enviarProBanco)
    if (forNewUser) {
     await postData(enviarProBanco);
    } else {
      // editar data
      putData(enviarProBanco);
    }
  };

  const putData = async (enviarProBanco) => {
    setMenssage([]);
    const { id } = router.query;
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(enviarProBanco),
      });

      const enviarProBanco = await res.json();
      console.log(enviarProBanco);

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMenssage((oldmenssage) => [
            ...oldmenssage,
            { message: error.message },
          ]);
        }
      } else {
        setMenssage([]);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function postData() {
    try {
      
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(enviarProBanco),
      });

      const data = await res.json();
      
      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMenssage((oldmenssage) => [
            ...oldmenssage,
            { message: error.message },
          ]);
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main>
        <div className="imagg">
          <form className="formUp" onSubmit={handleSubmit(handleSubmittt)}>
            <BsBoxSeam className="iconee" size={70} />
            <h1 className="tit">Registre-se</h1>

            <label className="lab">
              Nome:
            </label>
            <input
              className="inpu"
              placeholder="digite nome de usuario"
              name="nome"
        value={form.nome}
        {...register("nome", { required: true })}
        onChange={handleChange}
                 
            ></input>
           {errors.nome && <span className="msg">Nome é obrigadtório</span>}

            <br />
             <br />

            <label className="labLast">
              Último Nome:
            </label>
            <input
              className="inpu"
              placeholder="digite último nome"
              name="ultimo_nome"
        value={form.ultimo_nome}
        {...register("ultimo_nome", { required: true })}
        onChange={handleChange}
              
            ></input>
           {errors.ultimo_nome && (
              <span className="msg">Ultimo nome é obrigadtório</span>
            )}

            <br />
             <br />

            <label className="lab">
              E-mail:
            </label>
            <input
              className="inpu"
              placeholder="digite seu email"
              name="email"
        value={form.email}
        
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email"
                }
              })}
              onChange={handleChange}
              
            ></input>
            {errors.email && <span className="msg">Não é um email</span>}

            <br />
             <br />

            <label className="lab">
              Senha:
            </label>
            <input
              className="inpu"
              placeholder="digite sua senha"
              name="senha"
              value={form.senha}
              
              {...register("senha", { required: true, minLength: 8 })}
              onChange={handleChange}
            ></input>
            {errors.senha && (
              <span className="msg">A senha deve ter 8 caracteres</span>
            )}

            <input className="sub" type="submit" value="Registrar-se"></input>
            
            

            <p className="logg">
              já está registrado?
              <Link  href="/">
          <a className="log">Login?</a>
        </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
export default loginup;
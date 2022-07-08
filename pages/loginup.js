import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsBoxSeam } from "react-icons/bs";
import Link from 'next/link'

export default function Tela2() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const [registrar, setRegistrar] = useState({
    nome: "",
    ultimo_nome: "",
    email: "",
    senha: ""
  });

  

  async function handleFormSubmit() {
    console.log(registrar);
  }
  return (
    <>
      <main>
        <div className="imagg">
          <form className="formUp" onSubmit={handleSubmit(handleFormSubmit)}>
            <BsBoxSeam className="l" size={70} />
            <h1 className="tit">Registre-se</h1>
            <label className="lab" for="fname">
              Nome:
            </label>
            <input
              className="inpu"
              placeholder="digite nome de usuario"
              name="nome"
              id="nome"
              {...register("nome", { required: true })}
              onChange={e=>{registrar.nome=e.target.value;setRegistrar(registrar);}}
            ></input>
            {errors.nome && <span className="msg">Nome é obrigadtório</span>}
            <br />
             <br />

            <label className="lab" for="fname">
              Último Nome:
            </label>
            <input
              className="inpu"
              placeholder="digite último nome"
              name="ultimo_nome"
              id="ultimo_nome"
              {...register("ultimo_nome", { required: true })}
              onChange={e=>{registrar.ultimo_nome=e.target.value;setRegistrar(registrar);}}
            ></input>
            {errors.ultimo_nome && (
              <span className="msg">Ultimo nome é obrigadtório</span>
            )}
            <br />
             <br />

            <label className="lab" for="fname">
              E-mail:
            </label>
            <input
              className="inpu"
              placeholder="digite seu email"
              name="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email"
                }
              })}
              onChange={e=>{registrar.email=e.target.value;setRegistrar(registrar);}}
            ></input>
            {errors.email && <span className="msg">Não é um email</span>}
            <br />
             <br />

            <label className="lab" for="fname">
              Senha:
            </label>
            <input
              className="inpu"
              placeholder="digite sua senha"
              name="senha"
              id="senha"
              {...register("senha", { required: true, minLength: 8 })}
              onChange={e=>{registrar.senha=e.target.value;setRegistrar(registrar);}}
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

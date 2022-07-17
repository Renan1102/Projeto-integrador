import { useEffect, useState } from "react";
//import { useForm } from "react-hook-form";
import Link from 'next/link'
import { useRouter } from "next/dist/client/router";
import { BsBoxSeam } from "react-icons/bs"

const recado = ({ loginData, forNewUser = true }) => {
    const router = useRouter();
  
  
  const handleChange = (e) => {
    const { value, name } = e.target;
    setTexto({
      ...texto,
      [name]: value,
    });
  };

  const [texto, setTexto] = useState({
    nome: loginData.nome,
    descricao: loginData.descricao,
    mensagem: loginData.mensagem
  
  });
  
  
  async function handleFormSubmit() {
    //console.log(texto);
    /*const usuar = await Movie.findOne({nome: texto.nome})

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
      const res = await fetch("/api/recado", {
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
      <div className="">
        <form className="container_rec" onSubmit={handleFormSubmit}>
          
          <label className="campo_rec">
            Nome:
          </label><br />
          <input
            className="add_rec"
            placeholder="digite o nome do recado"
            name="nome"
            id="nome"
            
            onChange={handleChange}>
            </input>
         

          <br />
          <br />

          <label className="campo_rec">
            Descricao:
          </label><br />
          <input
            className="add_rec"
            placeholder="digite a descricao"
            name="descricao"
            id="descricao"
          
           onChange={handleChange}>
           </input>
           <br />
           <br />
        <label className="campo_rec">
            Mensagem:
          </label><br />
          <input
            className="add_rec"
            placeholder="digite uma mensagem"
            name="mensagem"
            id="mensagem"
          
           onChange={handleChange}>
           </input>
           <br/>

           <button className="but_2" type="submit">
        {forNewUser ? "Adicionar Recado" : "Editar"}
      </button>
      <br/>
          

          

         
        </form>
      </div>
    </main>
  </>
  )
}

export default recado;
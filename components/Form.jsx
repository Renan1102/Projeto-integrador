import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";

const Form = ({ formData, forNewMovie = true }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: formData.nome,
    codigo: formData.codigo,
    categoria: formData.categoria,
    data: formData.data,
    qtd: formData.qtd,
    valor: formData.valor,
    descricao: formData.descricao,
    perecivel: formData.perecivel
  });
  const [message, setMenssage] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forNewMovie) {
      postData(form);
    } else {
      // editar data
      putData(form);
    }
  };

  const putData = async (form) => {
    setMenssage([]);
    const { id } = router.query;
    try {
      const res = await fetch(`/api/movie/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
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
        setMenssage([]);
        router.push("/estoque");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (form) => {
    try {
      console.log(form);
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
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
        router.push("/estoque");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="adiciona" onSubmit={handleSubmit}>
      <label className="campo" >
              Nome:
            </label>
      <input
        className="add"
        type="text"
        placeholder="Nome"
        autoComplete="off"
        name="nome"
        value={form.nome}
        onChange={handleChange}
      />
      <br/>
      <label className="campo" >
              Código:
            </label>
      <input
        className="add"
        type="text"
        placeholder="codigo"
        autoComplete="off"
        name="codigo"
        value={form.codigo}
        onChange={handleChange}
      />
      <br/>

      <label className="campo" >
              Categoria:
            </label>
      <input
        className="add"
        type="text"
        placeholder="categoria"
        autoComplete="off"
        name="categoria"
        value={form.categoria}
        onChange={handleChange}
      />
      <br/>
      
      <label className="campo" >
              Data de Validade:
            </label>
      <input
        className="add"
        type="date"
        placeholder="data validade"
        autoComplete="off"
        name="data"
        value={form.data}
        onChange={handleChange}
      />
      <br/>

      <label className="campo" >
              Quantidade:
            </label>
      <input
        className="add"
        type="number"
        placeholder="Quantidade"
        autoComplete="off"
        name="qtd"
        value={form.qtd}
        onChange={handleChange}
      />
      <br/>

       <label className="campo" >
              Valor:
            </label>
      <input
        className="add"
        type="double"
        placeholder="valor"
        autoComplete="off"
        name="valor"
        value={form.valor}
        onChange={handleChange}
      />
      <br/>

      <label className="campo" >
              Descrição:
            </label>
      <input
        className="add"
        type="text"
        placeholder="descricao"
        autoComplete="off"
        name="descricao"
        value={form.descricao}
        onChange={handleChange}
      />
      <br/>

      <label className="campo" >
              Perecível:
            </label>
      <input
        className="add"
        type="boolean"
        placeholder="Ex: true ou false"
        autoComplete="off"
        name="perecivel"
        value={form.perecivel}
        onChange={handleChange}
      />
      <br/>
      
      <button className="but" type="submit">
        {forNewMovie ? "Adicionar" : "Editar"}
      </button>
      <br/>

      <button className="but" type="submit">
      <Link  href="/home">
        <a className="but">Voltar</a>
      </Link>
      </button>
      {message.map(({ message }) => (
        <p key={message}>{message}</p>
      ))}
    </form>
  );
};

export default Form;

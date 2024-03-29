import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Form = ({ formData, forNewMovie = true }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

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

  const handleFormSubmit = (e) => {
    //e.preventDefault();
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
    <form className="adiciona" onSubmit={handleSubmit(handleFormSubmit)}>
      <label className="campo" >
              Nome:
            </label><br/>
      <input
        className="add"
        type="text"
        placeholder="Ex: Batata"
        autoComplete="off"
        name="nome"
        value={form.nome}
        {...register("nome", { required: true })}
        onChange={handleChange}
      /><br/>
      {errors.nome && <span class="mens">Nome é obrigatório</span>}
      <br/>

      <label className="campo" >
              Código:
            </label><br/>
      <input
        className="add"
        type="text"
        placeholder="EX: 000"
        autoComplete="off"
        name="codigo"
        value={form.codigo}
        {...register("codigo", { required: true,
          pattern: {
         value: /^[0-9]+$/i,
         message: 'Enter a valid name address',
       },
     })}
        onChange={handleChange}
      /><br/>
      {errors.codigo && <span class="mens">Apenas numeros para código</span>}
      <br/>

      <label className="campo" >
              Categoria:
            </label><br/>
      <input
        className="add"
        type="text"
        placeholder="Ex: material escolar, produto de limpeza"
        autoComplete="off"
        name="categoria"
        value={form.categoria}
        {...register("categoria", { required: true })}
        onChange={handleChange}
      /><br/>
      {errors.categoria && <span class="mens">Digite uma categoria valida</span>}
      <br/>
      
      <label className="campo" >
              Data de Validade:
            </label><br/>
      <input
        className="add"
        type="date"
        placeholder="data validade"
        autoComplete="off"
        name="data"
        value={form.data}
        {...register("data", { required: true })}
        onChange={handleChange}
      /><br/>
      {errors.data && <span class="mens">Data de Validade incorreta</span>}
      <br/>

      <label className="campo" >
              Quantidade:
            </label><br/>
      <input
        className="add"
        type="number"
        placeholder="Quantidade"
        autoComplete="off"
        name="qtd"
        value={form.qtd}
        {...register("qtd", { required: true })}
        onChange={handleChange}
      /><br/>
      {errors.qtd && <span class="mens">Quantidade invalida</span>}
      <br/>

       <label className="campo" >
              Valor unidade:
            </label><br/>
      <input
        className="add"
        type="double"
        placeholder="Ex: 3.00"
        autoComplete="off"
        name="valor"
        value={form.valor}
        {...register("valor", { required: true, pattern: {
          value: /^[0-9]+\.[0-9]+$/i,
          message: 'Enter a valid valor address',
        },
      })}
        onChange={handleChange}
      /><br/>
      {errors.valor && <span class="mens">valor invalido</span>}
      <br/>

      <label className="campo" >
              Descrição:
            </label><br/>
      <input
        className="add"
        type="text"
        placeholder="Ex: Cobertor 100% algodão"
        autoComplete="off"
        name="descricao"
        value={form.descricao}
        {...register("descricao", { required: true })}
        onChange={handleChange}
      /><br/>
      {errors.descricao && <span class="mens">Digite uma descrição valida</span>}
      <br/>

      <label className="campo" >
              Perecível:
            </label><br/>
      <br/>
      <div className="checkb">
      <input className="checkbox" onChange={handleChange} type="radio" name="perecivel"  value={setForm.perecivel = "Sim"} />Sim
      <input className="checkbox" onChange={handleChange} type="radio" name="perecivel" value={setForm.perecivel = "Não"}/>Não
      </div>
      <br/>
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

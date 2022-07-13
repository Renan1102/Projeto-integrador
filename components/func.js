import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const func = ({ formData, forNewFunc = true }) => {
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
    endereco: formData.endereco,
    dataNascimento: formData.dataNascimento,
    salario: formData.salario,
    telefone: formData.telefone,
    funcao: formData.funcao
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
    if (forNewFunc) {
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
      const res = await fetch(`/api/funcionaro/${id}`, {
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
        router.push("/func");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (form) => {
    try {
      console.log(form);
      const res = await fetch("/api/funcionario", {
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
        router.push("/func");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="adiciona" onSubmit={handleSubmit(handleFormSubmit)}>
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
        {...register("nome", { required: true })}
        onChange={handleChange}
      />
      {errors.nome && <span class="mens">Nome é obrigatório</span>}
      <br/>

      <label className="campo" >
              Código:
            </label>
      <input
        className="add"
        type="text"
        placeholder="Ex: 000"
        autoComplete="off"
        name="codigo"
        value={form.codigo}
        {...register("codigo", { required: true,
             pattern: {
            value: /^[0-9]+$/i,
            message: 'Enter a valid e-mail address',
          },
        })}
        onChange={handleChange}
      />
      {errors.codigo && <span class="mens">Apenas numeros para código</span>}
      <br/>

      <label className="campo" >
              Endereco:
            </label>
      <input
        className="add"
        type="text"
        placeholder="Rua, bairro, cidade, Nr"
        autoComplete="off"
        name="endereco"
        value={form.endereco}
        {...register("endereco", { required: true })}
        onChange={handleChange}
      />
      {errors.endereco && <span class="mens">Digite um endereço valido</span>}
      <br/>
      
      <label className="campo" >
      Data de Nascimento:
            </label>
      <input
        className="add"
        type="date"
        placeholder="data de nascimento"
        autoComplete="off"
        name="dataNascimento"
        value={form.dataNascimento}
        {...register("dataNascimento", { required: true })}
        onChange={handleChange}
      />
      {errors.dataNascimento && <span class="mens">Data de Nascimento incorreto</span>}
      <br/>

      <label className="campo" >
              Salario:
            </label>
      <input
        className="add"
        type="text"
        placeholder="Ex: 2000.00"
        autoComplete="off"
        name="salario"
        value={form.salario}
        {...register("salario", { required: true, pattern: {
            value: /^[0-9]+\.[0-9]+$/i,
            message: 'Enter a valid e-mail address',
          },
        })}
        onChange={handleChange}
      />
      {errors.salario && <span class="mens">Salario incorreto</span>}
      <br/>

       <label className="campo" >
              Telefone:
            </label>
      <input
        className="add"
        type="text"
        placeholder="Ex: 54990034125"
        autoComplete="off"
        name="telefone"
        value={form.telefone}
        {...register("telefone", { required: true, minLength: 11, maxLength: 11  })}
        onChange={handleChange}
      />
      {errors.telefone && <span class="mens">Telefone deve ter 11 digitos</span>}
      <br/>

      <label className="campo" >
              Função:
            </label>
      <input
        className="add"
        type="text"
        placeholder="Ex: Caixa"
        autoComplete="off"
        name="funcao"
        value={form.funcao}
        {...register("funcao", { required: true })}
        onChange={handleChange}
      />
      {errors.funcao && <span class="mens">Digite uma função</span>}
      <br/>

      
      <br/>
      
      <button className="but" type="submit">
        {forNewFunc ? "Adicionar" : "Editar"}
      </button>
      <br/>

      <button className="but" type="submit">
      <Link  href="/func">
        <a className="but">Voltar</a>
      </Link>
      </button>
      {message.map(({ message }) => (
        <p key={message}>{message}</p>
      ))}
    </form>
  );
};

export default func;

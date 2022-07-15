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
    nomeFornecedor: formData.nomeFornecedor,
    codigo: formData.codigo,
    endereco: formData.endereco,
    CEP: formData.CEP,
    contato: formData.contato,
    telefone: formData.telefone,
    CNPJ: formData.CNPJ
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
      const res = await fetch(`/api/fornecedor/${id}`, {
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
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (form) => {
    try {
      console.log(form);
      const res = await fetch("/api/fornecedor", {
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
        router.push("/new");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="adiciona" onSubmit={handleSubmit(handleFormSubmit)}>
      <label className="campo" >
              Nome Fornecedor:
            </label>
      <input
        className="add"
        type="text"
        placeholder="Ex: Fornecedor 1"
        autoComplete="off"
        name="nomeFornecedor"
        value={form.nomeFornecedor}
        {...register("nomeFornecedor", { required: true })}
        onChange={handleChange}
      />
      {errors.nomeFornecedor && <span class="mens">Nome é obrigatório</span>}
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
            message: 'Enter a valid name address',
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
      CEP:
            </label>
      <input
        className="add"
        type="string"
        placeholder="Ex: 99170000"
        autoComplete="off"
        name="CEP"
        value={form.CEP}
        {...register("CEP", { required: true })}
        onChange={handleChange}
      />
      {errors.CEP && <span class="mens">CEP incorreto</span>}
      <br/>

      <label className="campo" >
              Contato:
            </label>
      <input
        className="add"
        type="text"
        placeholder="Ex: fulano@gmail.com"
        autoComplete="off"
        name="contato"
        value={form.contato}
        {...register("contato", { required: true, pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter a valid email"
          },
        })}
        onChange={handleChange}
      />
      {errors.contato && <span class="mens">contato incorreto</span>}
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
              CNPJ:
            </label>
      <input
        className="add"
        type="text"
        placeholder="Ex: XX. XXX. XXX/0001-XX."
        autoComplete="off"
        name="CNPJ"
        value={form.CNPJ}
        {...register("CNPJ", { required: true, 
            pattern: {
                value: /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/,
                message: "Please enter a valid CNPJ"
              }, })}
        onChange={handleChange}
      />
      {errors.CNPJ && <span class="mens">Digite um CNPJ</span>}
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

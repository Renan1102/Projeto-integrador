import Form from "../components/func";
import Base from "../components/base";
const New3 = () => {
    const formData = {
        nome: '',
        codigo: '',
        endereco: '',
        dataNascimento: '',
        salario: '',
        telefone: '',
        funcao: ''
      };

  return (
    <>
    <Base />
    <div className="container">
      <h1 className="banner">Adicionar Funcionario</h1>
      <Form formData={formData} />
    </div>
    </>
  );
};

export default New3;

import Form from "../components/Form";
import Base from "../components/base";
const New = () => {
  const formData = {
    nome: '',
    codigo: '',
    categoria: '',
    data: '',
    qtd: '',
    valor: '',
    descricao: '',
    perecivel: ''
  };

  return (
    <>
    <Base />
    <div className="container">
      <h1 className="banner">Adicionar ao Estoque</h1>
      <Form formData={formData} />
    </div>
    </>
  );
};

export default New;

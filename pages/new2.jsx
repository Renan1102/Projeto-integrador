import Form from "../components/loginup";
//import Base from "../components/base";
const New2 = () => {
  const loginData = {
    nome: "",
    ultimo_nome: "",
    email: "",
    senha: ""
   
  };

  return (
    <>
   
      <Form loginData={loginData} />
    
    </>
  );
};

export default New2;

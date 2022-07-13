import Form from "../components/login";
//import Base from "../components/base";
const New3 = () => {
  const loginData = {
    email: "",
    senha: ""
   
  };

  return (
    <>
   
      <Form loginData={loginData} />
    
    </>
  );
};

export default New3;

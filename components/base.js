import Link from 'next/link'
import { AiOutlineHome } from "react-icons/ai";
import { FcManager } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlinePoweroff } from "react-icons/ai";

function Base() {
  return (
    <>
      <nav className="barra">
        <BsCartCheck className="logo" size={80} />

        <FcManager className="user" size={70} />
        <p className="welcome">BEM VINDO</p>

        
          
          <Link  href="/home">
          <a className="links"><AiOutlineHome className="icon" size={30} />
          Home</a>
        </Link>

        
        <Link href="/estoque">
        <a className="links"><MdOutlineRemoveRedEye className="icon" size={30} /> 
          Ver Estoque</a>
        </Link>

        
        <Link href="/new">
        <a className="links"> <BsPencil className="icon" size={30} />
          Registrar item</a>
        </Link>

        
        <Link href="/">
        <a className="links"><IoNewspaperOutline className="icon" size={30} />
         Gerar Relatório</a>
        </Link>
      </nav>
      <header className="sticky">
        <h1 className="title">{" "}
          Gerenciador de Estoque{" "}

          <Link className="" href="/">
            <AiOutlinePoweroff className="iconoff" size={30} />
            
          </Link>
        </h1>
      </header>
    </>
  );
}
export default Base;

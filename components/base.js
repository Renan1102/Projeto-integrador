import Link from 'next/link'
import { AiOutlineHome } from "react-icons/ai";
import { FcManager } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlinePoweroff } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs"
import { IoBusiness } from "react-icons/io5"
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

        <Link href="/func">
        <a className="links"><AiOutlineUsergroupAdd className="icon" size={30} />
         Funcionarios</a>
        </Link>

        <Link href="/new4">
        <a className="links"><IoBusiness className="icon" size={30} />
         Fornecedores</a>
        </Link>

        <Link href="/relatorio">
        <a className="links"><IoNewspaperOutline className="icon" size={30} />
         Gerar Relatório</a>
        </Link>
        
      </nav>
      <header className="sticky">
        <h1 className="title">{" "}
          Gerenciador de Estoque{" "}
          <BsBoxSeam className="l2" size={70} />
          <Link className="" href="/">
            <AiOutlinePoweroff className="iconoff" size={30} />
            
          </Link>
        </h1>
      </header>
    </>
  );
}
export default Base;

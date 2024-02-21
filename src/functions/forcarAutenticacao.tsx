import Image from "next/image"
import loading from '../../public/images/loading.gif'
import useAuth from "../data/hook/useAuth"
import router from 'next/router'
import Script from "next/script"

export default function ForcarAutenticacao(jsx){
    const {usuario, carregando } = useAuth()
    
    function renderizarConteudo(){
        const scriptContent = `
            if(!document.cookie?.includes("templete-admin-cod3r-auth")){
                window.location.href = "/autenticacao";
            }
        `;
        //Você está instruindo o React a renderizar esse HTML:'scriptContent'  dentro do elemento <script>
        return(
            <>
                <Script id="my-script" dangerouslySetInnerHTML={{ __html: scriptContent }}/>
                {/*verifica(if) se o cookie não estiver presente ele vai direcionar para a /autenticacao */}
           
                {jsx}
            </>
        )
    }

    function renderizarTelaCarregando(){
        return(
            <div className={`flex justify-center items-center h-screen`}>
                <Image src={loading} alt="imagem loading" width={50} height={50}   loading="eager"/>
            </div>
        )

    }
    

    if(!carregando && usuario?.email){ //se o carregando for ao contrario de true => 'false' e usuario.email não for nulo(ou estiver setado)
        return renderizarConteudo()

    }else if(carregando){
        return renderizarTelaCarregando()
    }else{
        router.push('/autenticacao')
        return null
    }
}
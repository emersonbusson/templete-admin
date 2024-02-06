import MenuLateral from "./MenuLateral"
import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import useAppData from "@/src/data/hook/useAppData"
interface LayoutProps{
    titulo: string
    subtitulo: string
    children?: any
    
}


export default function Layout(props: LayoutProps){
    
    const {tema, alterarTema} = useAppData()
       
    return(
        <div className={`
            ${tema}
            flex h-screen w-screen

        `}>
            <MenuLateral/>
            <div className={`
                flex flex-col 
                w-full
                p-7
                bg-neutral-120  dark:bg-gray-800`
            }>
                <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo}/>
                <Conteudo>
                    {props.children}
                </Conteudo>
            </div>
        </div>
    )
}
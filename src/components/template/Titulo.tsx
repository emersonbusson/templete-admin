
interface TituloProps{
    titulo: string
    subtitulo: string
    
}


export default function Titulo(props: TituloProps){
    return(
        <div>
           <h1 className={`
                font-black
                text-3xl
                dark:text-gray-100 
                text-gray-900   
           `}>
                {props.titulo}
            </h1>
           
           <h2 className={`
                font-light
                text-sm
                dark:text-gray-300
                text-gray-900
           `}>
            {props.subtitulo}</h2>
        </div>
    )
}
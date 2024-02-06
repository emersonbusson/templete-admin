import Link from 'next/link'


interface ItemMenuProps {
    url?: string
    texto: string
    icone: any
    className?: string
    onClick?: (evento: any) => void
}


export default function ItemMenu(props: ItemMenuProps ){
    function renderizarLink(){
        return(
            <a className={`flex flex-col justify-center
             items-center h-20 w-20  text-gray-600 ${props.className}
             dark:text-gray-200 
             `}> 
                {props.icone}
                <span className={`text-xs font-light`}>
                    {props.texto}
                </span>
            </a>
        )}
    
    
    return(
        <li onClick={props.onClick} className={`hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer`}>
            {props.url ? (
                <Link href={props.url} legacyBehavior> 
                    {renderizarLink()}
                </Link> 
                ) : (
                    renderizarLink()
            )}
            
            
        </li>
    )
}

import { IconeAjustes, IconeCasa, IconeSino, IconeSair } from '../icons'
import ItemMenu from './ItemMenu'
import Logo from './Logo'


// interface MenuLateralProps{
//     url: string
//     texto: string
//     icone: any
// }

export default function MenuLateral(){
    return(
        <aside className={`
            flex flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900
        `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 via- to-purple-800
                h-20 w-20
            `}>
                <Logo/>
            </div>
            <ul className={`flex-grow`}>
                <ItemMenu url='/' texto='Início' icone={IconeCasa} />
                <ItemMenu url='/ajustes' texto='Ajustes' icone={IconeAjustes} />
                <ItemMenu url='/notificacoes' texto='Notificações' icone={IconeSino} />
            </ul>

            <ul>
                <ItemMenu url='/sair' texto='Sair' icone={IconeSair} onClick={() => console.log('logout')} className={`
                text-red-600 dark:text-red-400
                hover:bg-red-400 hover:text-gray-300
                 dark:hover:text-white
                `} />
            </ul>
        </aside>
    )        
} 
import { createContext, useEffect, useState } from "react";

//type Tema = 'dark' | '' 

interface AppContextProps {
    tema?: string
    children?: any //para resolver aviso
    alterarTema?: () => void
}


const AppContext = createContext<AppContextProps>({}) 

export function AppProvider(props: AppContextProps) {
    const [tema, setTema ] = useState('') 


    function alterarTema(){
        const novoTema = tema === '' ? 'dark' : ''
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
      
    }

    useEffect(
        () => {
            const temaLocal = localStorage.getItem('tema')
            if(temaLocal){
                setTema(temaLocal)
            }
        }, []
    )
    
    return(
        <AppContext.Provider value={{
            tema,
            alterarTema
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContext


//export const AppConsumer = AppContext.Consumer

//duas figuras relacionadas ao contexto, consumer e provider
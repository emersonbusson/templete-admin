import { createContext, useState } from "react";

type Tema = 'dark' | '' 

interface AppContextProps {
    tema?: Tema
    children?: any
    alterarTema?: () => void
}


const AppContext = createContext<AppContextProps>({}) 

export function AppProvider(props: AppContextProps) {
    const [tema, setTema ] = useState<Tema>('dark') 


    function alterarTema(){
       setTema(tema === '' ? 'dark' : '')
      
    }
    
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


export const AppConsumer = AppContext.Consumer

//duas figuras relacionadas ao contexto, consumer e provider
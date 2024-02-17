
import { createContext, useEffect, useState } from 'react'
import firebase from '../../firebase/config.js'
import Usuario from '@/src/model/Usuario' 
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'



interface AuthContextProps{
    usuario?: Usuario
    loginGoogle?: () => Promise<void>
    children?: any //para resolver aviso
}

const AuthContext = createContext<AuthContextProps>({})  



async function usuarioNormalizado(usuarioFirebase: any): Promise<Usuario>{
    const token =  await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId,
        imagemUrl: usuarioFirebase.photoURL

    }
}

    function gerenciarCookie(logado: boolean){
        if(logado){
            Cookies.set('templete-admin-cod3r-auth', logado, {
                expires: 7
            } )
        }else{
            Cookies.delete('templete-admin-cod3r-auth')
        }
    } 


export function AuthProvider(props: AuthContextProps){
    const router = useRouter()
    const [usuario, setUsuario] = useState<Usuario>({} as Usuario);
    const [carregando, setCarregando] = useState<Boolean>(true);
    
    async function ConfigurarSessao(usuarioFirebase: any){
        if(usuarioFirebase?.email !== null){
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true) //add o cookie
            setCarregando(false)
            return usuario.email
        }else{
            setUsuario({})
            gerenciarCookie(false) //deleta o cookie
            setCarregando(false)
            return false
        }   
    }

    async function loginGoogle() {
        try{
            setCarregando(true)
            
            const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
            ) 
            
            ConfigurarSessao(resp.user)
            router.push('/')
          
        }finally{
            setCarregando(false)
        }
    }

    async function logout(){
        try{
            setCarregando(true)
            await firebase.auth().signOut()
            await ConfigurarSessao(null)
        }finally{
            setCarregando(false)
        }
    }

    useEffect( () => {
        const cancelar = firebase.auth().onIdTokenChanged(ConfigurarSessao)
        return () => cancelar()
    }, []
    )


    return(
        <AuthContext.Provider value={{
            usuario,
            loginGoogle

        }}>
            {props.children}
        </AuthContext.Provider>
    )}

export default AuthContext




{/* Authenticates a Firebase client using a popup-based OAuth authentication flow.

If succeeds, returns the signed in user along with the provider's credential. If sign in was unsuccessful, returns an error object containing additional information about the error.*/}
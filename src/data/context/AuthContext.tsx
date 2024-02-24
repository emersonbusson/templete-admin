
import { createContext, useEffect, useState } from 'react'
import firebase from '../../firebase/config.js'
import Usuario from '@/src/model/Usuario' 
import router from 'next/router'
import Cookies from 'js-cookie'




interface AuthContextProps{
    usuario?: Usuario | null
    carregando?: boolean
    login?: (email: string, senha: string) => Promise<void>
    criarUsuario?: (email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
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
            Cookies.remove('templete-admin-cod3r-auth')
        }
    } 


export function AuthProvider(props: AuthContextProps){
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState<boolean>(true);
    
    async function ConfigurarSessao(usuarioFirebase: any | null){
        if(usuarioFirebase?.email){
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
    
    async function login(email: string, senha: string) {
        try{
            setCarregando(true)
            
            const resp = await firebase.auth().signInWithEmailAndPassword(email, senha)
            console.log(typeof resp, resp)
            await ConfigurarSessao(resp.user)
            router.push('/')
          
        }finally{
            setCarregando(false)
        }
    }
    
    async function criarUsuario(email: string, senha: string) {
        try{
            setCarregando(true)
            
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, senha)
            await ConfigurarSessao(resp.user)
            router.push('/')
          
        }finally{
            setCarregando(false)
        }
    }
    
    async function loginGoogle() {
        try{
            setCarregando(true)
            
            const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
            ) 
            
            await ConfigurarSessao(resp.user)
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
        if(Cookies.get('templete-admin-cod3r-auth')){ 
            const cancelar = firebase.auth().onIdTokenChanged(ConfigurarSessao)
            return () => cancelar()
        }else{
            setCarregando(false)
        }
    }, []
    )


    return(
        <AuthContext.Provider value={{
            usuario,
            carregando,
            login,
            criarUsuario,
            loginGoogle,
            logout

        }}>
            {props.children}
        </AuthContext.Provider>
    )}

export default AuthContext




{/* Authenticates a Firebase client using a popup-based OAuth authentication flow.

If succeeds, returns the signed in user along with the provider's credential. If sign in was unsuccessful, returns an error object containing additional information about the error.*/}
import { createContext, useState } from 'react'
import firebase from '../../firebase/config.js'
import Usuario from '@/src/model/Usuario' 
import { useRouter } from 'next/router'

interface AuthContextProps{
    usuario?: Usuario
    loginGoogle?: () => Promise<void>
    children?: any //para resolver aviso
}

const AuthContext = createContext<AuthContextProps>({})  



async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario>{
    const token =  await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId,
        imagemUrl: usuarioFirebase.photoURL

    }}


export function AuthProvider(props: AuthContextProps){
    const router = useRouter()
    const [usuario, setUsuario] = useState<Usuario>({} as Usuario);

    async function loginGoogle() {
        const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        ) 
        if (resp.user?.email) {
            const usuario = await usuarioNormalizado(resp.user)
            setUsuario(usuario)
            router.push('/')
        }
    }


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
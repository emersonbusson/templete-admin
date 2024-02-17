import useAuth from "@/src/data/hook/useAuth";
import Link from "next/link";
import Image from "next/image"; // Import the Image component from next/image package

interface AvatarUsuarioProps{
    className?: string
}


export default function AvatarUsuario(props: AvatarUsuarioProps){
    const { usuario } = useAuth()
    
    
    return(
        <Link href={'/perfil'}>
            <Image 
                src={usuario?.imagemUrl ?? '/images/avatar.svg'} 
                alt={'avatar do Usuário'} 
                width={40} height={40} 
                className={`h-10 w-10 rounded-full cursor-pointer ${props.className}`}>
            </Image>
        </Link>
    )
}
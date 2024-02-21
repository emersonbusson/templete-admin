export default interface Usuario {
    uid?: string | null;
    email?: string | null;
    nome?: string | null;
    token?: string | null;
    provedor?: string | null;
    imagemUrl?: string | null;
}

const usuario: Usuario = {
    uid: null,
    email: null,
    nome: null,
    token: null,
    provedor: null,
    imagemUrl: null
};
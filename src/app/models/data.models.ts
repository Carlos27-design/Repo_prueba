import { Usuario } from "./usuario.models";

export const usuariosSimulados: Usuario[] = [
    {
        id: 1,
        nombreCompleto: 'Admin User',
        usuario: 'admin',
        clave: 'admin',
        rol: 'admin',
        telefono: '1234567890'
    },
    {
        id: 2,
        nombreCompleto: 'Helton Bustos',
        usuario: 'helton',
        rol: 'profesor',
        clave: 'helton',
        telefono: '0987654321'
    },
    {
        id: 3,
        nombreCompleto: 'Jane Smith',
        usuario: 'janesmith',
        rol: 'alumno',
        clave: 'secret',
        telefono: '55535662555'
    },
]

import React from 'react';
import Buscar from '../ui/Buscar'
import Navegacion from './Nav'
import Link from 'next/link'
const Header = () => {
    return ( 
        <header>
            <div>
                <div>
                    <p>P</p>
                    <Buscar />
                    <Navegacion />
                </div>
                <div>
                    <p>Hola Andres</p>
                    <button type='button'>Cerrar Sesion</button>
                    <Link href='/' >Login</Link>
                    <Link href='/' >Crear Cuenta</Link>
                </div>
            </div>
        </header>
     );
}
 
export default Header;
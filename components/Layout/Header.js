import React from 'react';
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Buscar from '../ui/Buscar'
import Navegacion from './Nav'
import Boton from '../ui/Boton'


const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display:flex;
        justify-content: space-between;
    }
`
const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    margin-right: 2rem;
`

const Header = () => {
    const usuario = false
    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display:flex;
                        align-items:center;
                    `}
                >
                    <Link href='/' >
                        <Logo>P</Logo>
                    </Link>

                    <Buscar />
                    <Navegacion />
                </div>
                <div
                    css={css`
                        display:flex;
                        align-items:center;
                    `}
                >
                    {usuario ? (
                        <>
                            <p
                                css={css`
                             margin-right:2rem;
                        `}
                            >Hola Andres</p>
                            <Boton bgColor='true' type='button'
                                >Cerrar Sesion
                            </Boton>


                        </>
                    ) : (
                            <>
                                <Link href='/Login' >
                                    <Boton
                                        bgColor='true'
                                    >Login
                                    </Boton>

                                </Link>
                                <Link href='/CrearCuenta' >
                                    <Boton>
                                        Crear Cuenta
                                    </Boton>
                                </Link>
                            </>


                        )}
                </div>
            </ContenedorHeader>
        </header>
    );
}

export default Header;
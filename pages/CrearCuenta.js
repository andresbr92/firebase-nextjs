import React from 'react';
import {css} from '@emotion/core'

import Layout from '../components/Layout/Layout'
import {Formulario, Campo, InputSubmit} from '../components/ui/Formulario'


const CrearCuenta = () => {
    return (
        <div>
            <Layout>
                <h1
                    css={css`
                            text-align:center;
                            margin-top:1rem;
                        `}
                >Crear cuenta</h1>
                <Formulario>
                    <Campo>
                        <label htmlFor='nombre' >Nombre</label>
                        <input
                            type='text'
                            id='nombre'
                            placeholder='Tu nombre'
                            name='nombre'
                        />
                    </Campo>
               
                    <Campo>
                        <label htmlFor='email' >Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Tu email'
                            name='email'
                        />
                    </Campo>
                
                    <Campo>
                        <label htmlFor='password' >Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Tu password'
                            name='password'
                        />
                    </Campo>
                    <InputSubmit
                        type='submit'
                        value='Crear Cuenta'
                    />
                </Formulario>
            </Layout>
        </div>
    );
}

export default CrearCuenta;

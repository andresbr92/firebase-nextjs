import React, { useState } from 'react';
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Router from 'next/router'


const InputText = styled.input`
    border:1px solid var(--gris3);
    padding: 1rem;
    min-width:300px;

`
const InputSubmit = styled.button`
    height:3rem;
    width:3rem;
    display:block;
    background-size:4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat:no-repeat;
    position:absolute;
    right:1rem;
    top:1px;
    background-color:white;
    text-indent:-9999px;
    border:none;
    &:hover{
        cursor: pointer;
    }

`
const Buscar = () => {
    const [busqueda, guardarBusqueda] = useState('')


    const buscarProducto = e => {
        e.preventDefault()
        
        if (busqueda.trim() === '') return
        
        Router.push({
            pathname: '/Buscar',
            query: {q:busqueda}
        })

    }


    return (
        <form
            onSubmit={buscarProducto}
            css={css`
            position:relative;
            `}>
            <InputText
                onChange={ e => guardarBusqueda(e.target.value) }
                type='text'
                placeholder='Buscar productos'
            />
            <InputSubmit type='submit'>Buscar</InputSubmit>
        </form>
    );
}

export default Buscar;
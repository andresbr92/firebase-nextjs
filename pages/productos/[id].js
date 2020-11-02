import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase'
import Error404 from '../../components/Layout/404'
import Layout from '../../components/Layout/Layout'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { Campo, InputSubmit } from '../../components/ui/Formulario'
import Boton from '../../components/ui/Boton'

const ContenedorProducto = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;
const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`


const Producto = () => {


    //state del componente
    const [producto, guardarProducto] = useState({})
    const [error, guardarError] = useState(false)


    //routing para obtener el id de la url
    const router = useRouter()
    // const id = router.query.id
    const { query: { id } } = router
    //context de firebase
    const { firebase } = useContext(FirebaseContext)

    useEffect(() => {
        if (id) {
            const obetenerProducto = async () => {
                //const producto = await firebase.db.collection('productos').doc(id).get()
                //console.log(producto.data())
                const productoQuery = await firebase.db.collection('productos').doc(id)
                const producto = await productoQuery.get()
                if (producto.exists) {
                    guardarProducto(producto.data())
                } else {
                    guardarError(true)
                }
            }
            obetenerProducto()
        }
    }, [id])



    if (Object.keys(producto).length === 0) return <Layout> <h1
        css={css`
            text-align:center;
            margin-top:5rem;
        `}
    >Cargando...</h1> </Layout>

    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador } = producto;



    return (
        <Layout>
            <>

                {error && <Error404 />}
                <div className='contenedor'>
                    <h1
                        css={css`
                            text-align:center;
                            margin-top:5rem;
                        `}
                    >{nombre}</h1>
                    <ContenedorProducto>
                        <div>
                            <p>Publicado hace: {formatDistanceToNow(new Date(creado), { locale: es })} </p>
                            <p>Por {creador.nombre} de {empresa}</p>
                            <img src={urlimagen} />
                            <p>{descripcion}</p>
                            <h2>Agrega tu comentario</h2>
                            <form>
                                <Campo>
                                    <input
                                        type='text'
                                        name='mensaje'
                                    />
                                </Campo>
                                <InputSubmit
                                    type='submit'
                                    value='Agregar Comentario'
                                />

                            </form>
                            <h2
                                css={css`
                                    margin-top:2rem 0;
                                `}
                            >Comentarios</h2>
                            {comentarios.map(comentario => (
                                <li>
                                    <p>{comentario.nombre}</p>
                                    <p>Escrito por: {comentario.usuarioNombre}</p>
                                </li>

                            ))}
                        </div>
                        <aside>
                            <Boton
                                target='_blank'
                                bgColor='true'
                                href={url}
                            >Visitar URL</Boton>
                            
                            <div
                                css={css`
                                    margin-top: 5rem;
                                `}
                            >
                                <p
                                    css={css`
                                    text-align:center;
                                    
                                    `}
                                >{votos} Votos</p>

                                <Boton>Votar</Boton>
                            </div>

                        </aside>
                    </ContenedorProducto>

                </div>
            </>
        </Layout>
    );
}

export default Producto;
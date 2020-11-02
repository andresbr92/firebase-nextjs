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
    const [comentario, guardarComentario] = useState({})
    const [consultarDB, guardarConsultarDB] = useState(true)


    //routing para obtener el id de la url
    const router = useRouter()
    // const id = router.query.id
    const { query: { id } } = router
    //context de firebase
    const { firebase, usuario } = useContext(FirebaseContext)

    useEffect(() => {
        if (id && consultarDB) {
            const obetenerProducto = async () => {
                //const producto = await firebase.db.collection('productos').doc(id).get()
                //console.log(producto.data())
                const productoQuery = await firebase.db.collection('productos').doc(id)
                const producto = await productoQuery.get()
                if (producto.exists) {
                    guardarProducto(producto.data())
                    guardarConsultarDB(false)
                } else {
                    guardarError(true)
                    guardarConsultarDB(false)
                }
            }
            obetenerProducto()
        }
    }, [id])



    if (Object.keys(producto).length === 0 && !error) return <Layout> <h1
        css={css`
            text-align:center;
            margin-top:5rem;
        `}
    >Cargando...</h1> </Layout>

    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador, haVotado } = producto;

    //administrar y validar los votos

    const votarProducto = () => {
        if (!usuario) {
            return router.push('/Login')
        }
        //obtener y sumar votos
        const nuevoTotal = votos + 1

        //verificar si el usuario ha votado
        if (haVotado.includes(usuario.uid)) return

        //guardar el id del usuario que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid]
        //actualizar en base de datos
        firebase.db.collection('productos').doc(id).update({ votos: nuevoTotal, haVotado: nuevoHaVotado })

        //actualizar el state
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        })
        guardarConsultarDB(true)
    }


    const comentarioChange = e => {
        guardarComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }
    //crear comentarios
    const agregarComentario = e => {
        e.preventDefault()
        if (!usuario) {
            return router.push('/Login')
        }

        //informacion extra al comentario
        comentario.usuarioId = usuario.uid
        comentario.usuarioNombre = usuario.displayName

        //copa de comentario y agregarlos al array
        const nuevosComentarios = [...comentarios, comentario]
        //actualizar la bbdd
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })

        //actualizar el state
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

        guardarConsultarDB(true)

    }
    //identificar si el comentario es del creador del producto
    const esCreador = id => {
        if (creador.id == id) return true
    }
    //funcion que revisa que el creador del producto es el mismo que esta logeado
    const puedeBorrar = () => {
        if (!usuario) return false

        if(creador.id === usuario.uid) return true
    }
    //eliminar producto de la base de datos
    const eliminarProducto = async () => {
        if (!usuario) return router.push('/Login')

        if (creador.id === !usuario.uid) return router.push('/Login')
        try {

            await firebase.db.collection('productos').doc(id).delete()
            router.push('/')
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <>

                {error ? <Error404 /> : (
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

                                {usuario && (<>
                                    <h2>Agrega tu comentario</h2>
                                    <form
                                        onSubmit={agregarComentario}
                                    >
                                        <Campo>
                                            <input
                                                type='text'
                                                name='mensaje'
                                                onChange={comentarioChange}
                                            />
                                        </Campo>
                                        <InputSubmit
                                            type='submit'
                                            value='Agregar Comentario'
                                        />

                                    </form>
                                </>)}
                                <h2
                                    css={css`
                                    margin-top:2rem 0;
                                `}
                                >Comentarios</h2>
                                {comentarios.length === 0 ? <p>Aun no hay comentarios</p> : (
                                    <ul>
                                        {comentarios.map((comentario, i) => (
                                            <li
                                                key={`${comentario.usuarioId}-${i}`}
                                                css={css`
                                                border: 1px solid #e1e1e1;
                                                padding:1rem;
                                            `}
                                            >
                                                <p>{comentario.mensaje}</p>
                                                <p>Escrito por:
                                             <span
                                                        css={css`
                                                        font-weight:bold;
                                                    `}
                                                    > {comentario.usuarioNombre}</span>
                                                </p>
                                                {esCreador(comentario.usuarioId) && <CreadorProducto>Es Creador</CreadorProducto>}
                                            </li>

                                        ))}

                                    </ul>
                                )}

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

                                    {usuario && (
                                        <Boton
                                            onClick={votarProducto}
                                        >Votar</Boton>
                                    )}
                                </div>

                            </aside>
                        </ContenedorProducto>
                        { puedeBorrar() && <Boton
                            onClick={eliminarProducto}
                        >Eliminar producto</Boton>}

                    </div>
                )}
            </>
        </Layout>
    );
}

export default Producto;
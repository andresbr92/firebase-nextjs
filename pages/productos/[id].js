import React, { useEffect } from 'react';
import { useRouter } from 'next/router'


const Producto = () => {


    //routing para obtener el id de la url
    const router = useRouter()
   // const id = router.query.id
    const { query: { id } } = router

    useEffect(() => {
        if (id) {
            console.log('Ya hay un id', id)
        }
    },[id])
    




    return ( <h1>desde id.js{id}</h1> );
}
 
export default Producto;
import React, {useEffect, useState, useContext} from 'react';
import Layout from '../components/Layout/Layout'
import { FirebaseContext } from '../firebase'

import DetallesProducto from '../components/Layout/DetallesProducto'



const Home = () => {

  const [productos, guardarProductos] = useState([])
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapShot)

    }
    obtenerProductos()
  }, [])
  
  function manejarSnapShot(snapshot) {
    const productos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    guardarProductos(productos)
  }


  return ( 
    <div>
      <Layout>
        
        <div className='listado-productos'>
          <div className='contenedor'>
            <ul className='bg-white'>
              {productos.map(producto => (
                <DetallesProducto
                  key={producto.id}
                  producto = {producto}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
   );
}
 
export default Home;

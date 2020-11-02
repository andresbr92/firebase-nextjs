
export default function validarCrearProducto(valores) {

    let errores = {};

    // Validar el nombre del usuario
    if (!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio";
    }

    // validar empresa
    if (!valores.empresa) {
        errores.empresa = 'El nombre de la empresa es obligatorio'
    }
   

    // validar la url
    if (!valores.url) {
        errores.url = 'la URL es obligatoria'

    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {

        errores.url = 'la URL no es valida'

    }
    //validar descripcion 
    if (!valores.descripcion) {
        errores.descripcion = 'La descripcion es obligatoria'
    }
    

    return errores;
}
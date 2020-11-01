import React, {useState, useEffect} from 'react';
const useValidacion = (stateInicial, validar, fn) => {

    const [valores, guardarValores] = useState(stateInicial)
    const [errores, guardarErrores] = useState({})
    const [submitForm, guardarSubmitForm] = useState(false)

    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0
            
            if (noErrores) {
                fn() //Fn = function from de component
            }
            guardarSubmitForm(false)
        }
    }, [])
    
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }
    const handleForSubmit = e => {
        e.preventDefault()
        const erroresValidacion = validar(valores)
        guardarSubmitForm(true)
    }

    return {
        valores,
        errores,
        submitForm,
        handleChange,
        handleForSubmit,
    }
}
 
export default useValidacion;
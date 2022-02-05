import { extend, setInteractionMode } from 'vee-validate'
import { required, numeric, max } from 'vee-validate/dist/rules'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: "Campo obrigatório!",
})

extend('numeric', {
    ...numeric,
    message: "O campo deve conter apenas números!",
})

extend('max', {
    ...max,
    message: "O campo deve conter no máximo {max} caracteres!",
    params: ['max'],
    validate(value, {max}) {
        return value.length <= max;
    }
});

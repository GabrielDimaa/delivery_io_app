import { required, digits, email, max } from 'vee-validate/dist/rules'
import { extend, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
    ...required,
    message: `O campo "{_field_}" é obrigatório!`,
})

extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
})

extend('email', {
    ...email,
    message: "E-mail inválido!",
})
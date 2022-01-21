import Vue from 'vue'
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
    iconPack: 'mdi',
    duration: 5000,
})

Vue.toasted.register(
    "showSuccess",
    msg => typeof msg === "string" ? msg : "Operação realizada com sucesso.",
    {
        type: "success",
        icon: "mdi-check-circle-outline",
        closeOnSwipe: false,
        className: "toasted-success"
    }
)

Vue.toasted.register(
    "showError",
    msg => msg !== null ? msg : "Ops... Erro inesperado.",
    {
        type: "error",
        icon: "mdi-alert-circle",
        closeOnSwipe: false,
        className: "toasted-error"
    }
)
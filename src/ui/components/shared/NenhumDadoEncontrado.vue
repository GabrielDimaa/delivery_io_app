<template>
    <div id="nenhum-dado-encotrado">
        <v-img id="icon" src="@/assets/img/no_data.svg" :alt="text"/>
        <span id="text">{{text}}</span>
    </div>
</template>

<script>
export default {
    name: "NenhumDadoEncontrado",
    props: {
        text: {
            type: String,
            default: "Nenhum dado encontrado."
        }
    }
}
</script>

<style scoped>
#nenhum-dado-encotrado {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-items: center;
}

#nenhum-dado-encotrado > #icon {
    width: auto;
    max-width: 300px;
    height: auto;
}

#nenhum-dado-encotrado > #text {
    margin-top: 25px;
    font-size: 16px;
    font-weight: 500;
}
</style>
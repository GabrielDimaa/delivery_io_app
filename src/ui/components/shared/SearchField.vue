<template>
    <v-text-field placeholder="Pesquisar..." filled rounded dense color="var(--primary-color)"
                  v-model="search" prepend-inner-icon="mdi-magnify" background-color="#c0c4c9" class="shrink">
    </v-text-field>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "SearchField",
    computed: {
        ...mapState(['search']),
        search: {
            get() {
                return this.$store.state.search;
            },
            set(value) {
                this.$store.state.search = value
            }
        },
    },
    methods: {
        ...mapActions(['setSearch'])
    },
    created() {
        this.setSearch("");
    }
}
</script>

<style scoped>

</style>
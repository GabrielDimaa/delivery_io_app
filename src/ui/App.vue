<template>
    <v-app>
        <AppBar/>
        <Drawer/>

        <v-main id="main">
            <Content/>
        </v-main>
    </v-app>
</template>

<script>
import AppBar from "./templates/AppBar";
import Drawer from "./templates/Drawer";
import Content from "./templates/Content";

export default {
    name: "App",
    components: {Content, Drawer, AppBar}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import '../assets/css/style.css';
@import '../assets/css/toasted.css';

#main {
    background: var(--background-color);
}
</style>
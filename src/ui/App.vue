<template>
    <v-app>
        <Drawer></Drawer>
        <AppBar></AppBar>

        <v-main id="main">
        </v-main>
    </v-app>
</template>

<script>
import AppBar from "./templates/AppBar";
import Drawer from "./templates/Drawer";

export default {
    name: "App",
    components: {Drawer, AppBar}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
    font-family: 'Heebo', sans-serif;

    --primary-color: #503E9D;
    --secondary-color: #FCBF49;
    --background-color: #ECE8EF;
    --dark-color: #262932;
    --error-color: #FB3640;
    --grey-color: #8B909A;

    --opacity-primary-color: #DCD5FA;
    --opacity-grey-color: rgba(185, 183, 190, 0.3);
}

#main {
    background: var(--background-color);
}
</style>
<script setup lang="ts">
import { ref } from "vue";

const imageLoaded = ref(true);

const imageModules = import.meta.glob("../assets/image/banner*.png", { eager: true });

const images = Object.values(imageModules).map((img) => (typeof img === "object" && "default" in img ? img.default : img));

const randomImage = ref(images[Math.floor(Math.random() * images.length)]);


</script>

<template>
    <header class="btn-group p-3 container">
        <!--<h1>Inventaire de resine</h1>-->
        <section id="banniere" class="d-flex row ">
            <img class="col-12 img-fluid d-none d-lg-block" :src="randomImage" alt="Bannière De l'inventaire de resin pour impression 3D">
            <!--<img v-if="!imageLoaded" class="col-12 img-fluid d-none d-lg-block" :src="../assets/image/errorWhat.jpg" alt="Bannière De l'inventaire de resin pour impression 3D">-->
            <h1 class="col-12 mb-0">Controleur d'inventaire</h1>
        </section>
    </header>
</template>

<style scoped>

</style>
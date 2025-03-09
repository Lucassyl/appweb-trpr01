<script setup lang="ts">
    import { ref, defineEmits } from 'vue';

    const emit = defineEmits(["recherche"]);

</script>

<template>
    <form class="card p-2" @submit.prevent=""></form>
    <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-0">chercher une resin</h5>
    </div>
    <div class="card-body">
        <div class="mb-3">
            <label class="form-label">Teste rechercher</label>
            <!--<input
            v-model="newGameName"
            class="form-control"
            placeholder="Entrer le nom du jeu"
            />-->
        </div>
        <div class="mb-3">
            <label class="form-label">Console</label>
            <!--<select v-model="newGameConsole" class="form-select">
            <option
            v-for="console in consoles"
            :key="console"
            :value="console"
            >
            {{ console }}
            </option>
            </select>-->
        </div>
        <!--<button
        @click="addGame"
        class="btn btn-success w-100"
        :disabled="!newGameName.trim()"
        >
        Ajouter le jeu
        </button>-->
        <button 
        @click="emit('recherche')"
        class="btn btn-primary w-100">
            Recherche
        </button>
    </div>
</template>

<style>

</style>
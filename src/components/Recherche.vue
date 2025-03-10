<script setup lang="ts">
    import { ref, defineEmits } from 'vue';

    const emit = defineEmits<{
        (event: 'recherche', marque: String): void;
    }>();

    const rechercheResin = () => {
        emit('recherche', "mock_String");
    };

</script>

<template>
    <form class="card p-2 mb-12" @submit.prevent="rechercheResin">
        <div class="align-item-center d-inline-flex flex-column">
            <div class="card-header bg-primary text-white mb-4">
                <h5 class="card-title mb-0">chercher une resin</h5>
            </div>
            <div class="mb-4 col-10">
                <label class="col-4" for="marque">Marque:</label>
                <input class="col-8"  type="text" id="marque" required />
            </div>
            <button class="btn btn-primary w-100" type="submit">Recherche Résine</button>
        </div>
    </form>
</template>

<style>

</style>
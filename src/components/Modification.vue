<script setup lang="ts">
    import { ref, watch, defineEmits, defineProps } from 'vue';
    import quantitéMinimum from './Creation.vue'
    import type { Resin, Caracteristique } from "../scripts/types";

    const emit = defineEmits<{
        (event: 'modifier', resin: Resin): void;
        (event: 'existe', resin: Resin): boolean;
    }>();

    const caracteristiqueOptions: Caracteristique[] = ["Clear", "Rigid", "Tought", "Flexible",
     "Water Washable", "Precision Model", "Biocompatible", "Hight Temp", "Castable"];

    const resinModifiee = ref<Resin>({
        id: 0, // identifiant assigner a zero a la creation et changer quand ajouter a la liste
        marque: '',
        description: '',
        color: '',
        quantity: 0,
        caracteristique: [],
    });

    const props = defineProps<{
        resinSelectionee: Resin | null;
        resinExiste: boolean;
    }>();

    function changeCaracteristique(caracteristique: Caracteristique) {
        if (resinModifiee.value.caracteristique.includes(caracteristique))
        {
            const index = resinModifiee.value.caracteristique.indexOf(caracteristique)
            resinModifiee.value.caracteristique.splice(index, 1);
        }else{
            resinModifiee.value.caracteristique.push(caracteristique);
        }
    }

    const modificationResin = () => {
        //console.log('test');
        const valeurResin = { ...resinModifiee.value };
        emit('existe', valeurResin)
        if (!props.resinExiste) {
            resinModifiee.value = {
            id: 0,
            marque: '',
            description: '',
            color: '',
            quantity: 0,
            caracteristique: []
            };
            emit('modifier', valeurResin);
        }
    };

</script>

<template>
    <form v-if="resinSelectionee != null" class="card p-2 mb-12" @submit.prevent="modificationResin">
        <div class="align-item-center d-inline-flex flex-column">
            <div class="card-header bg-warning text-white mb-4">
                <h5 class="card-title mb-0">Modifier la resine</h5>
            </div>
            <div class="mb-4 col-8">
                <label class="col-3" for="marque">Marque:</label>
                <input class="col-9" v-model="resinSelectionee.marque" type="text" id="marque" required />
            </div>
            <div class="mb-4 col-8">
                <label class="col-3" for="description">Description:</label>
                <input class="col-9" v-model="resinSelectionee.description" type="text" id="description" required />
            </div>
            <div class="mb-4 col-8">
                <label class="col-3" for="color">Couleur:</label>
                <input class="col-9" v-model="resinSelectionee.color" type="text" id="color" required />
                <p v-if="resinSelectionee.quantity < quantitéMinimum.value" class="btn-outline-danger">Impossible d'avoir un nombre négatif comme quantité.</p>
            </div>
            <div class="mb-4 col-8">
                <label class="col-3" for="quantity">Quantité:</label>
                <input class="col-9" v-model.number="resinSelectionee.quantity" type="number" id="quantity" required />
            </div>
            <div class="col-md-12">
                <label v-for="caracteristique in caracteristiqueOptions" :key="caracteristique" class="col-md-4">
                    <input
                    @click="changeCaracteristique(caracteristique)"
                    type="checkbox" 
                    :value="caracteristique" 
                    v-model="resinSelectionee.caracteristique"
                    />
                    {{ caracteristique }}
                </label>
            </div>
            <button type="submit">Créer Résine</button>
        </div>
    </form>
    <div v-if="resinSelectionee == null" class="card p-2  mb-12">
        <div  class="align-item-center d-inline-flex flex-column">
            <div class="card-header bg-warning text-white mb-4">
                <h5 class="card-title mb-0">Modifier la resine</h5>
            </div>
            <div class="text-white mb-4">
                <p class="mb-0">vous devez selectioner une resin a modifier avant de continuer</p>
            </div>
        </div>
    </div>
</template>

<style>

</style>
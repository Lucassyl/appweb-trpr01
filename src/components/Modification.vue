<script setup lang="ts">
    import { ref, watch, defineEmits, defineProps } from 'vue';
    import quantitéMinimum from './Creation.vue'
    import type { Resin, Caracteristique } from "../scripts/types";

    const caracteristiqueOptions: Caracteristique[] = ["Clear", "Rigid", "Tought", "Flexible",
    "Water Washable", "Precision Model", "Biocompatible", "Hight Temp", "Castable"];

    var resinExisteDeja = false;
    var activerMenuModification = false

    const emit = defineEmits<{
        (event: 'modifier', resin: Resin): void;
        (event: 'existe', resin: Resin): void;
        (event: 'reset'):void;
    }>();
    
    const props = defineProps<{
        resinSelectionee: Resin | null;
        resinExiste: boolean;
    }>();

    const resinModifiee = ref<Resin>({
        id: 0, // identifiant assigner a zero a la creation et changer quand ajouter a la liste
        marque: '',
        description: '',
        color: '',
        quantity: 0,
        caracteristique: [],
    });

    watch(() => props.resinSelectionee, (resinModifiable) => {
        if (resinModifiable) {
            activerMenuModification = true
            resinModifiee.value = { ...resinModifiable };
        }
    })

    function changeCaracteristique(caracteristique: Caracteristique) {
        if (resinModifiee.value.caracteristique.includes(caracteristique))
        {
            const index = resinModifiee.value.caracteristique.indexOf(caracteristique)
            resinModifiee.value.caracteristique.splice(index, 1);
        }else{
            resinModifiee.value.caracteristique.push(caracteristique);
        }
    }

    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    // Gestion de la modification d'une resin 
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====

    const modificationResin = () => {
        const valeurResin = { ...resinModifiee.value };
        emit('existe', valeurResin);
    };

    watch(() => props.resinExiste, (newValue) => {
        resinExisteDeja = newValue
        console.log('existe deja est egale a :' + resinExisteDeja);
        modificationResinCompletition();
        emit('reset');
    })

    const modificationResinCompletition = () => {
        const valeurResin = { ...resinModifiee.value };
        console.log(valeurResin.marque)
        console.log(valeurResin.description)
        console.log(valeurResin.color)
        if (!resinExisteDeja) {
            console.log("does not exist")
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
        activerMenuModification = false
    };

</script>

<template>
    <form v-if="activerMenuModification" class="card p-2 mb-12" @submit.prevent="modificationResin">
        <div class="align-item-center d-inline-flex flex-column">
            <div class="card-header bg-warning text-white mb-4">
                <h5 class="card-title mb-0">Modifier la resine</h5>
            </div>
            <div class="mb-4 col-10">
                <label class="col-4" for="marque">Marque:</label>
                <input class="col-8" v-model="resinModifiee.marque" type="text" id="marque" required />
            </div>
            <div class="mb-4 col-10">
                <label class="col-4" for="description">Description:</label>
                <input class="col-8" v-model="resinModifiee.description" type="text" id="description" required />
            </div>
            <div class="mb-4 col-10">
                <label class="col-4" for="color">Couleur:</label>
                <input class="col-8" v-model="resinModifiee.color" type="text" id="color" required />
                <p v-if="resinModifiee.quantity < quantitéMinimum.value" class="btn-outline-danger">Impossible d'avoir un nombre négatif comme quantité.</p>
            </div>
            <div class="mb-4 col-10">
                <label class="col-4" for="quantity">Quantité:</label>
                <input class="col-8" v-model.number="resinModifiee.quantity" type="number" id="quantity" required />
            </div>
            <div class="col-md-12">
                <label v-for="caracteristique in caracteristiqueOptions" :key="caracteristique" class="col-md-4">
                    <input
                    @click="changeCaracteristique(caracteristique)"
                    type="checkbox" 
                    :value="caracteristique" 
                    v-model="resinModifiee.caracteristique"
                    />
                    {{ caracteristique }}
                </label>
            </div>
            <button class="btn btn-warning" type="submit">Créer Résine</button>
        </div>
    </form>
    <div v-if="!activerMenuModification/*resinSelectionee == null*/" class="card p-2  mb-12">
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
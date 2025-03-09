<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue';
import type { Resin, Caracteristique } from "../scripts/types";

    const quantitéMinimum = 0;

    const emit = defineEmits<{
        (event: 'ajouter', resin: Resin): void;
        (event: 'existe', resin: Resin): boolean;
    }>();

    const caracteristiqueOptions: Caracteristique[] = ["Clear", "Rigid", "Tought", "Flexible", 
    "Water Washable", "Precision Model", "Biocompatible", "Hight Temp", "Castable"];
    
    const nouvelleResin = ref<Resin>({
        id: 0, // identifiant assigner a zero a la creation et changer quand ajouter a la liste
        marque: '',
        description: '',
        color: '',
        quantity: 0,
        caracteristique: [],
    });

    const props = defineProps<{
        copieResin: Resin | null;
        resinExiste: boolean;
    }>();

    watch(() => props.copieResin, (copieValeurResin) => {
        if (copieValeurResin) {
            //console.log("copy")
            nouvelleResin.value = { ...copieValeurResin };
        }
    });

    function changeCaracteristique(caracteristique: Caracteristique) {
        if (nouvelleResin.value.caracteristique.includes(caracteristique))
        {
            const index = nouvelleResin.value.caracteristique.indexOf(caracteristique)
            nouvelleResin.value.caracteristique.splice(index, 1);
        }else{
            nouvelleResin.value.caracteristique.push(caracteristique);
        }
    }

    const creationResin = () => {
        const valeurResin = { ...nouvelleResin.value };
        emit('existe', valeurResin)
        if (!props.resinExiste) {
            //console.log("does not exist")
            nouvelleResin.value = {
            id: 0,
            marque: '',
            description: '',
            color: '',
            quantity: 0,
            caracteristique: []
            };
            emit('ajouter', valeurResin);
        }
    };

</script>

<template>
    <div class="col-md-6">
        <form class="card p-2" @submit.prevent="creationResin">
            <div class="align-item-center d-inline-flex flex-column">
                <div class="card-header bg-success text-white mb-4">
                    <h5 class="card-title mb-0">Ajouter une nouvelle resine</h5>
                </div>
                <div class="mb-4 col-8">
                    <label class="col-3" for="marque">Marque:</label>
                    <input class="col-9" v-model="nouvelleResin.marque" type="text" id="marque" required />
                </div>
                <div class="mb-4 col-8">
                    <label class="col-3" for="description">Description:</label>
                    <input class="col-9" v-model="nouvelleResin.description" type="text" id="description" required />
                </div>
                <div class="mb-4 col-8">
                    <label class="col-3" for="color">Couleur:</label>
                    <input class="col-9" v-model="nouvelleResin.color" type="text" id="color" required />
                </div>
                <div class="mb-4 col-8">
                    <label class="col-3" for="quantity">Quantité:</label>
                    <input class="col-9" v-model.number="nouvelleResin.quantity" type="number" id="quantity" required />
                    <p v-if="nouvelleResin.quantity < quantitéMinimum" class="btn-outline-danger">Impossible d'avoir un nombre négatif comme quantité.</p>
                </div>
                <div class="col-md-12">
                    <label v-for="caracteristique in caracteristiqueOptions" :key="caracteristique" class="col-md-4">
                        <input
                        @click="changeCaracteristique(caracteristique)"
                        type="checkbox" 
                        :value="caracteristique" 
                        v-model="nouvelleResin.caracteristique"
                        />
                        {{ caracteristique }}
                    </label>
                </div>
                <button class="btn btn-success w-100" type="submit">Créer Résine</button>
            </div>
        </form>
    </div>
</template>

<style>
</style>
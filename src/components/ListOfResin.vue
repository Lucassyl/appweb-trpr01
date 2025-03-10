<script setup lang="ts">
import { ref } from 'vue';
import { type Resin } from "../scripts/types";

    const ZoneDangereuse = 0;

    const showDetails = ref(false);

    const props = defineProps<{
        resins: Resin[];
    }>();

    const emit = defineEmits<{
        (event: 'copierResin', resin: Resin): void;
        (event: 'retirerResine', resin: Resin): void;
        (event: 'selectionerResinModifiable', resin: Resin): void;
    }>();

    const copierResin = (resin: Resin) => {
        emit('copierResin', { ...resin });
    };

    const retirerResine = (resin: Resin) => {
        emit('retirerResine', {...resin});
    }

    const modifierResine = (resin: Resin) => {
        emit('selectionerResinModifiable', {...resin});
    }

    const quantiteZoneDanger = (resin: Resin):boolean => {
        if (resin.quantity >= ZoneDangereuse){
            return true;
        }
        return false;
    }

    const afficherDetaille = () => {
        showDetails.value = !showDetails.value;
    };

</script>

<template>
    <div class="col-md-12">
        <h2>Liste des Résines</h2>
        <div v-if="resins.length == 0" class="card">
            <h4>La liste ne contient pas de resin</h4>
        </div>
        <section class="card md-4" v-for="resin in resins" :key="resin.id">
            <div class="align-item-center d-flex justify-content-between">
                <div class="d-flex align-items-center col-4">
                    <h5 class="mb-0">Resin : {{ resin.marque }}</h5>
                    
                </div>
                <div class="d-flex align-items-center col-4">
                    <h6 class="rounded btn-danger col-6" v-if="quantiteZoneDanger(resin)">Cette article a un stock dangereusement bas!</h6>
                </div>
                <div class="d-flex col-4">
                    <button class="col-3 btn btn-light" @click="retirerResine(resin)">
                        <img class="img-fluid " src="../assets/image/retirer.ico" alt="iconogrphie retirer" />
                    </button>
                    <button class="col-3 btn btn-light" @click="copierResin(resin)">
                        <img class="img-fluid " src="../assets/image/copie.ico" alt="iconogrphie copier" />
                    </button>
                    <button class="col-3 btn btn-light" @click="modifierResine(resin)">
                        <img class="img-fluid " src="../assets/image/modifier.ico" alt="iconogrphie modifier" />
                    </button>
                    <button class="col-3 btn btn-light" @click="afficherDetaille">
                        <h6 class="">details</h6>
                    </button>
                </div>
            </div>
            <div class="d-flex align-items-center col-12">
                <hr class="solid col-12">
            </div>
            <div v-if="showDetails" class="align-items-center col-12">
                <div class="d-flex align-items-start col-12">
                    <div class="col-4">
                        <p class="col-6">Couleur: {{ resin.color }}</p>
                        <p class="col-6">Quantité: {{ resin.quantity }}</p>
                    </div>
                    <div class="col-8">
                        <p class="col-12">Description: {{ resin.description }}</p>
                    </div>
                </div>
                <div class="d-flex align-items-start col-12">
                    <p class="">Caracteristique: {{ resin.caracteristique }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.solid {
  border-top: 3px solid #bbb;
}
</style>

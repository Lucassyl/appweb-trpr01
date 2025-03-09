<script setup lang="ts">
import { type Resin } from "../scripts/types";

    const ZoneDangereuse = 2;

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
        if (resin.quantity < ZoneDangereuse){
            return true;
        }
        return false;
    }

</script>

<template>
    <div class="col-md-12">
        <h2>Liste des Résines</h2>
        <div v-if="resins.length == 0" class="card"><h4>La liste ne contient pas de resin</h4></div>
        <section class="card" v-for="resin in resins" :key="resin.id">
            <div class="">
                <div class="">
                    <h5 class="">Resin {{ resin.marque }}</h5>
                    <div class="">
                        <p class="">Couleur: {{ resin.color }}</p>
                        <div>
                            <p class="">Quantité: {{ resin.quantity }}</p>
                            <h4 v-if="quantiteZoneDanger(resin)"class="btn-danger">Cette article a un stock dangereusement bas</h4>
                        </div>
                        <p class="">Description: {{ resin.description }}</p>
                        <p class="">Caracteristique: {{ resin.caracteristique }}</p>
                    </div>
                    <div class="">
                        <button @click="retirerResine(resin)" class="">
                            <img src="../assets/image/retirer.ico" alt="iconogrphie retirer" />
                        </button>
                        <button @click="copierResin(resin)" class="">
                            <img src="../assets/image/copie.ico" alt="iconogrphie copier" />
                        </button>
                        <button @click="modifierResine(resin)" class="">
                            <img src="../assets/image/modifier.ico" alt="iconogrphie modifier" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!--<li>
        <span>{{ resins.brand }}</span>&nbsp;|&nbsp;
        <span>{{ resins.created.toFormat("d MMM") }}</span>
        
    </li>-->
</template>

<style scoped>

</style>

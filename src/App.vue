<script setup lang="ts">
import { ref/*, onMounted, onUnmounted*/} from 'vue';

import "bootstrap/dist/css/bootstrap.min.css"
import './css/bootstrap.min.css'
import './css/style.css'

import Header from './components/Header.vue'
import Creation from './components/Creation.vue'
import Modification from './components/Modification.vue'
import Recherche from './components/Recherche.vue'
import ListOfResin from './components/ListOfResin.vue'

import type { Resin } from './scripts/types.ts';

    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    // function et variable pour la gestion de l'affichage
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====

    const listeVisible = ref(false);
    const menuVisibleModification = ref(false);
    const menuVisibleRecherche = ref(true);

    const changerVisibiliterList = () => {
      listeVisible.value = !listeVisible.value;
    };

    const changerMenuVisible = () => {
      menuVisibleModification.value = !menuVisibleModification.value;
      menuVisibleRecherche.value = !menuVisibleRecherche.value;
    };


    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    // gestion des Id
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    const creationId = (): number => {
        const IncrementationId = 1
        var index = IncrementationId
        while (dejaAssigne(index)) {
            index += IncrementationId
        }
        return index
    };

    const dejaAssigne = (id: number): boolean => {
        return resins.value.some((resin) => resin.id === id);
    };


    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    // Gestion Liste resin
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    const resins = ref<Resin[]>([])

    const newTestResin = ref<Resin>({
        id: creationId(),
        marque: "Elagoo",
        description: "la resin de parametrage des imprimate Elagoo",
        caracteristique: ["Clear","Rigid"],
        color: "Clear",
        quantity: 0,
    });
    resins.value.push({ ...newTestResin.value, id: creationId() });
    

    const ajouterResine = (nouvelleResin: Resin) => {
        nouvelleResin.id = creationId();
        resins.value.push(nouvelleResin);
    };


    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    // Test si Resin existe deja
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====

    let resinExiste = ref<boolean>(true);
    let resinModifierExiste = ref<boolean>(true);

    const testerResine = (resinTester: Resin) => {
        console.log('test if resin exist');
        const existe = resins.value.some(resin =>
            resin.marque === resinTester.marque &&
            resin.description === resinTester.description &&
            resin.color === resinTester.color &&
            JSON.stringify(resin.caracteristique.sort()) === JSON.stringify(resinTester.caracteristique.sort())
        )
        console.log(existe);
        resinExiste.value = existe;
    }

    const testerModificationResine = (resinTester: Resin) => {
        console.log('test if resin exist other than modify');
        const existe = resins.value.some(resin =>
            resin.id != resinTester.id &&
            resin.marque === resinTester.marque &&
            resin.description === resinTester.description &&
            resin.color === resinTester.color &&
            JSON.stringify(resin.caracteristique.sort()) === JSON.stringify(resinTester.caracteristique.sort())
        )
        console.log(resinTester.id)
        console.log('already exist ' + existe);
        resinModifierExiste.value = existe;
    }

    const resetExist = () => {
        resinExiste.value = true;
        resinModifierExiste.value = true;
    }

    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    // Gestion des copy
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    const copieResin = ref<Resin | null>(null);

    const copierResin = (resin: Resin) => {
        //console.log('copierResin launched');
        copieResin.value = { ...resin };
    };

    
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    // Gestion des modification
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    const resinSelectionee = ref<Resin | null>(null);

    const modifierResine = (updatedResin: Resin) => {
        resins.value.forEach(resin => {
            if(updatedResin.id === resin.id ){
                resin.marque = updatedResin.marque;
                resin.description = updatedResin.description;
                resin.caracteristique = updatedResin.caracteristique;
                resin.color = updatedResin.color;
                resin.quantity = updatedResin.quantity;
                console.log('Résine mise à jour:', updatedResin);
            }
        });
    }

    const selectionerResinModifiable = (resin: Resin) => {
        menuVisibleModification.value = true;
        menuVisibleRecherche.value = false;
        resinSelectionee.value = { ...resin };
        
    };


    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    // Fonction pour retirer les resins de la liste
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    const retirerResine = (resin: Resin) => {
        resins.value = resins.value.filter(r => r.id !== resin.id);
    };


    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    // Gestion de la recherche
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    /*const resinCorrespondante = ref<Resin[]>([])*/

    const rechercheResine = () => {

    }

    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    // Gestion de la liste des resin a affichier
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    /*var listeAffichier = resins

    if (resinCorrespondante.value.length != 0) {
      listeAffichier = resinCorrespondante
    }else{
        listeAffichier = resins
    }*/

</script>

<template>
    <Header />
    <div class="container mt-4">
        <div class="d-flex row mb-4 g-4">
            
            <button @click="changerMenuVisible" class="col-md-12">
                {{ menuVisibleModification ? 'Menu de recherche' : 'Menu de modification' }}
            </button>
            <!--:resinExist="resinExist"-->
            <Creation 
                @existe="testerResine" 
                @ajouter="ajouterResine"
                @reset="resetExist" 
                :copieResin="copieResin" 
                :resinExiste="resinExiste"
              />
            <div class="col-12 col-md-6">
                  <Modification v-if="menuVisibleModification" 
                      @existe="testerModificationResine" 
                      @modifier="modifierResine" 
                      @reset="resetExist" 
                      :resinSelectionee="resinSelectionee" 
                      :resinExiste="resinModifierExiste"
                  />
                  <Recherche v-if="menuVisibleRecherche" 
                      @recherche="rechercheResine"
                  />
            </div>
            <button class="btn btn-light" @click="changerVisibiliterList">
                {{ listeVisible ? 'Cacher la liste des résines' : 'Montrer la liste des résines' }}
            </button>
            <ListOfResin v-if="listeVisible" 
                :resins="resins" 
                @copierResin="copierResin" 
                @retirerResine="retirerResine"  
                @selectionerResinModifiable="selectionerResinModifiable"
                @existe="testerResine"
             />
        </div>
    </div>
</template>

<style scoped>

</style>

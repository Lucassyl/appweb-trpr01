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

import type { Resin, Caracteristique } from './scripts/types.ts';

    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    //Constante
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    /*const emit = defineEmits<{
        (event: 'existe', resin: Resin): void;
    }>();*/

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

    /*const newResin = ref<Resin>({
        id: creationId(),
        brand: '',
        description: '',
        color: '',
        quantity: 0,
        caracteristique: []
    });*/
    
    const newTestResin = ref<Resin>({// remove test resin befor remise
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
    const resinExiste = ref<boolean>(false);

    const testerResine = (resinTester: Resin) => {
      console.log('teste 1');
      console.log(resin.marque);
      console.log(resinTester.marque);
      console.log(resin.description);
      console.log(resinTester.description);
      console.log(resin.color);
      console.log(resinTester.color);
      console.log(resin.caracteristique);
      console.log(resinTester.caracteristique);
        const existe = resins.value.some(resin => 
            resin.marque === resinTester.marque &&
            resin.description === resinTester.description &&
            resin.color === resinTester.color &&
            JSON.stringify(resin.caracteristique) === JSON.stringify(resinTester.caracteristique)
        );
        console.log(existe);
        resinExiste.value = existe;
        return existe;
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
        const resinIndex = resins.value.findIndex(resin => resin.id === updatedResin.id);
        if (resinIndex !== -1) {
        // Mettre à jour les valeurs de la résine trouvée
        resins.value[resinIndex] = { ...updatedResin };
        console.log('Résine mise à jour:', updatedResin);
  }
    }

    const selectionerResinModifiable = (resin: Resin) => {
        menuVisibleModification.value = true;
        menuVisibleRecherche.value = false;
        resinSelectionee.value = { ...resin };
        /*const game = games.value.find((game) => game.id === id);
        if (game) {
            selectedGameId.value = id;
            editGameName.value = game.name;
            editGameConsole.value = game.console;
        }*/
        console.log('copierResin launched');
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
    const resinCorrespondante = ref<Resin[]>([])

    const rechercheResine = () => {

    }

    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    // Gestion de la liste des resin a affichier
    // =====*****=====_____=====*****=====_____=====*****=====_____=====*****=====_____=====*****=====
    var listeAffichier = resins

    if (resinCorrespondante.value.length != 0) {
      listeAffichier = resinCorrespondante
    }else{
        listeAffichier = resins
    }

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
                :copieResin="copieResin" 
                :resinExiste="resinExiste"
              />
            <div class="col-md-6">
                  <Modification v-if="menuVisibleModification" 
                      @existe="testerResine" 
                      @modifier="modifierResine" 
                      :resinSelectionee="resinSelectionee" 
                      :resinExiste="resinExiste"
                  />
                  <Recherche v-if="menuVisibleRecherche" 
                      @recherche="rechercheResine"
                  />
            </div>
            <button @click="changerVisibiliterList">
                {{ listeVisible ? 'Cacher la liste des résines' : 'Montrer la liste des résines' }}
            </button>
            <ListOfResin v-if="listeVisible" 
            :resins="listeAffichier" 
            @copierResin="copierResin" 
            @retirerResine="retirerResine"  
            @selectionerResinModifiable="selectionerResinModifiable"
            @existe="testerResine"
            :resinModifiable="resinModifiable" />
        </div>
    </div>
</template>

<style scoped>
/*.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}*/
</style>

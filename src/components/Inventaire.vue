<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed} from "vue";
import type { Weapon, Classification } from '../scripts/types';
import Ajout from "./Ajout.vue";
import Modification from "./Modification.vue";
import Recherche from "./Recherche.vue";
import WeaponItem from "./WeaponItem.vue";
import Popup from "./Popup.vue";

const resetWeaponData = ref<Weapon>({
    id: 0,
    name: '',
    class: 'Melee',
    description: '',
    prix: 0,
    stock: 0,
})

const weapons = ref<Weapon[]>([
    {
        id: 1,
        name: 'Trongler',
        class: 'Melee',
        description: 'The Trongler! Fear it! \n Warning this weapon is none modifiable!',
        prix: 9999,
        stock: 1,
    }
])

const searchValue = ref('')

const shownWeapons = computed(() => {
    if (!searchValue.value) {
        return weapons.value
    }
    return weapons.value.filter((weapon) =>
        weapon.name.toLowerCase().includes(searchValue.value.toLowerCase())
    )
});

const newWeaponText = ref<string>("Ajouter")
const newWeaponData = ref<Weapon>({
    id: 0,
    name: '',
    class: 'Melee',
    description: '',
    prix: 0,
    stock: 0,
});

const addNewWeapon = () => {
    weapons.value.push({
        id: Date.now(),
        name: newWeaponData.value.name,
        class: newWeaponData.value.class,
        description: newWeaponData.value.description,
        prix: newWeaponData.value.prix,
        stock: newWeaponData.value.stock,
    });
    newWeaponData.value = resetWeaponData.value;
    newWeaponText.value = "Ajouter"
}

const modifiedWeaponData = ref<Weapon>({
    id: 0,
    name: '',
    class: 'Melee',
    description: '',
    prix: 0,
    stock: 0,
})

const deleteWeapon = (id: number) => {
    if(id)
    {
        const index = weapons.value.findIndex(modifiedWeapon => modifiedWeapon.id === id);
        weapons.value.splice(index, 1)
    }
}

/*const popupTriggers = ref({
    buttonTrigger: false
});

const TogglePopup = (trigger) => {
    popupTriggers.value[trigger] = !popupTriggers.value
    [trigger]
}*/

const copyWeapon = (weapon: Weapon) => {
    if(weapon)
    {
        newWeaponData.value.name = weapon.name;
        newWeaponData.value.class = weapon.class;
        newWeaponData.value.description = weapon.description;
        newWeaponData.value.prix = weapon.prix;
        newWeaponData.value.stock = weapon.stock;
        newWeaponText.value = "Copier";
    }
}

const editWeapon = (weapon: Weapon) => {
    if(weapon)
    {
        modifiedWeaponData.value.id = weapon.id;
        modifiedWeaponData.value.name = weapon.name;
        modifiedWeaponData.value.class = weapon.class;
        modifiedWeaponData.value.description = weapon.description;
        modifiedWeaponData.value.prix = weapon.prix;
        modifiedWeaponData.value.stock = weapon.stock;
    }
}

const modifyWeapon = (weapon: Weapon) => {
    if(weapon)
    {
        const index = weapons.value.findIndex(modifiedWeapon => modifiedWeapon.id === weapon.id);
        weapons.value[index] = weapon;
        modifiedWeaponData.value = resetWeaponData.value;
    }
}

const download = () => {
    /*
    -#####-REFERENCE-#####-
    https://www.clearpeople.com/blog/export-data-to-csv-with-typescript-without-format-issues
    */
    const data = convertListToCSV();

    const url = URL.createObjectURL(new Blob([data], { type: "text/csv;charset=utf-8;", }));

    const link = document.createElement("a");
    if (link.download !== undefined) {
        link.setAttribute('href', url);
        link.setAttribute('download', "weaponsInventory.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    URL.revokeObjectURL(url);
}

const convertListToCSV = () => {
    const headers = ["id","name","class","description","prix","stock"]

    const lignes = shownWeapons.value.map(weapon => 
        [weapon.id, weapon.name, weapon.class, weapon.description, weapon.prix, weapon.stock]
    )
    /*
    -#####-REFERENCE-#####-
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    */
    return [headers.join(","), ...lignes].join("\n");
}

</script>

<template>
    <div class="container-fluid py-4">
        <!--Title-->
        <div class="row mb-4">
            <h2 class="col text-center fw-bold">Gun Runner Arsenal</h2>
        </div>
        <!--Form-->
        <div class="row mb-4">
            <!--Add-->
            <div class="col-md-6 mb-3 mb-md-0">
                <Ajout v-model:weapon="newWeaponData" v-model:shownText="newWeaponText" @add-new-weapon="addNewWeapon"/>
            </div>
            <!--Modify-->
            <div class="col-md-6">
                <Modification v-if="modifiedWeaponData.id !== 0" v-model="modifiedWeaponData" @modify-weapon="modifyWeapon"/>
                <div v-else class="card p-3">
                    <h5 class="card-header">
                        Modifier Weapon
                    </h5>
                    <p class="text-center">Aucune arme selectioné</p>
                </div>
            </div>
        </div>
        <!--Search-->
        <div class="d-flex gap-2 mb-4">
            <Recherche v-model:searchValue="searchValue" class="flex-grow-1"/>
            <button class="btn btn-dark" @click="download">Télécharger</button>
        </div>
        <!--<Popup
            v-if="popupTriggers.buttonTrigger"
            :TogglePopup="() => TogglePopup('buttonTrigger')">
            <h2>Confirmer la suppresion</h2>
        </Popup>-->
        <div class="row">
            <div class="col">
                <div class="row g-3">
                    <div class="col-12" v-for="weapon of shownWeapons"  :key="weapon.id" >
                        <WeaponItem  :post="weapon" @delete-weapon="deleteWeapon" @copy-weapon="copyWeapon" @edit-weapon="editWeapon"/>
                    </div>
                    <!--<div v-if="weapon">

                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

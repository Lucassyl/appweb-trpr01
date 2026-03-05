<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed} from "vue";
import type { Weapon, Classification } from '../scripts/types';
import Ajout from "./Ajout.vue";
import Modification from "./Modification.vue";
import Recherche from "./Recherche.vue";
import WeaponItem from "./WeaponItem.vue";

const weapons = ref<Weapon[]>([
    {
        id: 0,
        name: 'Trongler',
        class: 'Melee',
        description: 'The Trongler! Fear it!',
        prix: 9999,
        stock: 1,
    }
])

const searchValue = ref('')
/*watch(searchValue, (newValue, oldValue) => {
    //console.log(`Le texte est passé de ${oldValue} à ${newValue}`)
    updateShownWeaponList()
})*/

const shownWeapons = computed(() => {
    if (!searchValue.value) {
        return weapons.value
    }
    return weapons.value.filter((weapon) =>
        weapon.name.toLowerCase().includes(searchValue.value.toLowerCase())
    )
});

/*const shownWeapons = computed(() => {
  const search = searchValue.value.toLowerCase()

  if (!search) return weapons.value

  return weapons.value.filter((weapon) =>
    weapon.name.toLowerCase().includes(search) ||
    weapon.class.toLowerCase().includes(search) ||
    weapon.description.toLowerCase().includes(search)
  )
})*/

/*let shownWeapons = computed<Weapon[]>(
    JSON.parse(JSON.stringify(weapons.value))
);*/

const newWeaponData = ref<Weapon>({
    id: 0,
    name: '',
    class: 'Melee',
    description: '',
    prix: 0,
    stock: 0,
});

const modifiedWeaponData = ref<Weapon>({
    id: 0,
    name: '',
    class: 'Melee',
    description: '',
    prix: 0,
    stock: 0,
})

const addNewWeapon = () => {
    weapons.value.push({
    id: Date.now(),
    name: newWeaponData.value.name,
    class: newWeaponData.value.class,
    description: newWeaponData.value.description,
    prix: newWeaponData.value.prix,
    stock: newWeaponData.value.stock,
  });
  newWeaponData.value.name = "";
  newWeaponData.value.class = "Melee"
  newWeaponData.value.description = "";
  newWeaponData.value.prix = 0;
  newWeaponData.value.stock = 0;
}

const modifyWeapon = () => {

}

/*const updateShownWeaponList = () => {
    //const shownWeapons = ref<Weapon[]>(weapons.value.slice())
    shownWeapons = computed<Weapon[]>(JSON.parse(JSON.stringify(weapons.value)))
}*/

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
    //const headers = Object.keys(shownWeapons[0].join)
    const headers = ["id","name","class","description","prix","stock"]

    const lignes = shownWeapons.value.map(weapon => 
        [weapon.id, weapon.name, weapon.class, weapon.description, weapon.prix, weapon.stock]
    )
    /*
    -#####-REFERENCE-#####-
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    */
    return [headers.join(","), ...lignes].join("\n")
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
                <Ajout v-model="newWeaponData" @add-new-weapon="addNewWeapon"/>
            </div>
            <!--Modify-->
            <div class="col-md-6">
                <Modification v-if="modifiedWeaponData.id !== 0" v-model="modifiedWeaponData" @modify-weapon="modifyWeapon"/>
                <div v-else class="card p-3">
                    <h5 class="card-header">
                        Modify Weapon
                    </h5>
                    <p class="text-center">No weapon selected</p>
                </div>
            </div>
        </div>
        <!--Search-->
        <div class="d-flex gap-2 mb-4">
            <Recherche v-model:searchValue="searchValue" class="flex-grow-1"/>
            <button class="btn btn-dark" @click="download">Download</button>
        </div>
        <div class="row">
            <div class="col">
                <div class="row g-3">
                    <div class="col-12" v-for="weapon of shownWeapons"  :key="weapon.id" >
                        <WeaponItem  :post="weapon" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

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
        description: 'The Trongler!',
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

</script>

<template>
    <div class="container mt-4">
        <h2 class="text-center mb-4">Gun Runner Arsenal</h2>
        <div class="row">
            <Ajout v-model="newWeaponData" @add-new-weapon="addNewWeapon"/>
            <Modification v-model="modifiedWeaponData" @modify-weapon="modifyWeapon"/>
            <Recherche v-model:searchValue="searchValue"/>
            <WeaponItem v-for="weapon of shownWeapons" :key="weapon.id" :post="weapon"/>
        </div>
    </div>
</template>

<style scoped>
</style>

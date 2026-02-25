<script setup lang="ts">
import { ref, onMounted, onUnmounted} from "vue";
import type { Weapon, Classification } from '../scripts/types';
import Ajout from "./Ajout.vue";
import Modification from "./Modification.vue";

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

const newWeaponData = ref<Weapon>({
    id: 0,
    name: '',
    class: 'Melee',
    description: '',
    prix: 0,
    stock: 0,
});

/*const addGame = () => {
  if (!newWeaponName.value.trim()) return;
  weapons.value.push({
    id: Date.now(),
    name: newWeaponName.value,
    class: newWeaponClass.value,
    description: newWeaponDescription.value,
    prix: newWeaponPrice.value,
    stock: newWeaponStock.value,
  });
  newWeaponName.value = "";
  newWeaponDescription.value = "";
  newWeaponPrice.value = 0;
  newWeaponStock.value = 0;
}*/
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

</script>

<template>
    <div class="container">
        <h2>Gun Runner Arsenal</h2>
        <Ajout v-model="newWeaponData" @add-new-weapon="addNewWeapon"/>
    </div>
</template>

<style scoped>
</style>

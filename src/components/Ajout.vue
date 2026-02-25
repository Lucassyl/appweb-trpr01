<script setup lang="ts">
import type { Weapon, Classification } from '../scripts/types';
import { ref } from 'vue';

const text = ref<string>('Ajouter');
const weapon = defineModel<Weapon>({ required: true });

const emit = defineEmits(['addNewWeapon'])
const handleClick = (event: MouseEvent) => {
    emit('addNewWeapon')
}

const Classification = [
    "Firearm",
    "Laser",
    "Plasma",
    "Explosives",
    "Melee"
]


</script>

<template>
    <div class="form-container">
        <label>
            nom:
            <input 
            type="text" 
            v-model="weapon.name"
            />
        </label>
        <label>
            class:
            <select v-model="weapon.class">
                <option v-for="classValue in Classification" value=classValue>{{ classValue }}</option>
            </select>
        </label>
        <label>
            description:
            <input 
            type="text" 
            v-model="weapon.description"
            />
        </label>
        <label>
            prix:
            <input 
            type="number" 
            v-model="weapon.prix"
            />
        </label>
        <label>
            quantité:
            <input 
            type="number" 
            v-model="weapon.stock"
            />
        </label>
        <button @click="handleClick">{{ text }}</button>
    </div>
</template>

<style scoped>
</style>


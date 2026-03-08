<script setup lang="ts">
import type { Weapon, Classification } from '../scripts/types';
import { ref } from 'vue';

const text = ref<string>('Ajouter');
const weapon = defineModel<Weapon>('weapon', { required: true });
const shownText = defineModel<string>('shownText')
let errorMessages = ref<string[]>([]);

const emit = defineEmits(['addNewWeapon'])
const handleClick = () => {
    if(newWeaponIsValid()){
        emit('addNewWeapon');
    }
}

const Classification = [
    "Firearm",
    "Laser",
    "Plasma",
    "Explosives",
    "Melee"
]

const MINIMUM_NAME_LENGHT = 3;
const INVALID_NAME_MESSAGE = "Le nom doit être un minimum de trois lettres"
const INVALID_CLASS_MESSAGE = "La class choisie est invalid"
const MINIMUM_DESCRIPTION_LENGHT = 10;
const INVALID_DESCRIPTION_MESSAGE = "La description doit faire un minimume de 10 lettres"
const MINIMUM_PRICE_LENGHT = 5;
const INVALID_PRICE_MESSAGE = "Le prix doit être d'un minimum de 5"
const MINIMUM_STOCK_AMOUNT = 1;
const INVALID_STOCK_MESSAGE = "Le stock a un minimum de 1 par article"

const newWeaponIsValid= () => {
    errorMessages.value = [];
    if(weapon.value.name.length < MINIMUM_NAME_LENGHT)
    {
        errorMessages.value.push(INVALID_NAME_MESSAGE);
    }
    if(!isValidClass)
    {
        errorMessages.value.push(INVALID_CLASS_MESSAGE);
    }
    if(weapon.value.description.length < MINIMUM_DESCRIPTION_LENGHT)
    {
        errorMessages.value.push(INVALID_DESCRIPTION_MESSAGE);
    }
    if(weapon.value.prix < MINIMUM_PRICE_LENGHT)
    {
        errorMessages.value.push(INVALID_PRICE_MESSAGE);
    }
    if(weapon.value.stock < MINIMUM_STOCK_AMOUNT)
    {
        errorMessages.value.push(INVALID_STOCK_MESSAGE);
    }

   return errorMessages.value.length === 0;
}

const isValidClass = Object.values(Classification).includes(weapon.value.class);


</script>

<template>
    <div class="card h-100 p-3">
        <h5 class="card-header">
            {{ shownText }} Arme
        </h5>
        <div class="card-body">
            <div class="mb-3">
                <label>
                    nom:
                    <input 
                    class="form-control"
                    type="text" 
                    v-model="weapon.name"
                    required
                    />
                </label>
            </div>
            <div class="mb-3">
                <label>
                    class:
                    <select 
                    class="form-select"
                    v-model="weapon.class"
                    >
                        <option v-for="classValue in Classification" :key="classValue" :value="classValue">{{ classValue }}</option>
                    </select>
                </label>
            </div>
            <div class="mb-3">
                <label>
                    description:
                    <input 
                    class="form-control" 
                    type="text" 
                    v-model="weapon.description"
                    required
                    />
                </label>
            </div>
            <div class="mb-3">
                <label>
                    prix:
                    <input 
                    class="form-control" 
                    type="number" 
                    v-model="weapon.prix"
                    required
                    />
                </label>
            </div>
            <div class="mb-3">
                <label>
                    quantité:
                    <input 
                    class="form-control"
                    type="number" 
                    v-model="weapon.stock"
                    required
                    />
                </label>
            </div>
            <p v-if="errorMessages.length > 0" class="text-danger fw-bold">
                <span v-for="error in errorMessages" :key="error">
                    {{ error }} <br />
                </span>
                
            </p>
            <button class="w-100" @click="handleClick">{{ text }}</button>
        </div>
    </div>
</template>

<style scoped>
</style>


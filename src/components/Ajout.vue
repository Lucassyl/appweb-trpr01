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
    <!--Bootstrap generer par chatGPT-->
    <div class="col-md-6 mb-3">
        <div class="card h-100 shadow-sm">
            <div class="card-header">
                Add Weapon
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label>
                        nom:
                        <input 
                        type="text" 
                        v-model="weapon.name"
                        />
                    </label>
                </div>
                <div class="mb-3">
                    <label>
                        class:
                        <select v-model="weapon.class">
                            <option v-for="classValue in Classification" value=classValue>{{ classValue }}</option>
                        </select>
                    </label>
                </div>
                <div class="mb-3">
                    <label>
                        description:
                        <input 
                        type="text" 
                        v-model="weapon.description"
                        />
                    </label>
                </div>
                <div class="mb-3">
                    <label>
                        prix:
                        <input 
                        type="number" 
                        v-model="weapon.prix"
                        />
                    </label>
                </div>
                <div class="mb-3">
                    <label>
                        quantité:
                        <input 
                        type="number" 
                        v-model="weapon.stock"
                        />
                    </label>
                </div>
                <button @click="handleClick">{{ text }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>


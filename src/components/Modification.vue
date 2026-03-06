<script setup lang="ts">
import type { Weapon, Classification } from '../scripts/types';
import { ref } from 'vue';

const text = ref<string>('Modifier');
const weapon = defineModel<Weapon>({ required: true });

const emit = defineEmits<{
    (e: 'modifyWeapon', post: Weapon): void;
}>();
const handleClick = (event: MouseEvent) => {
    emit('modifyWeapon', weapon.value)
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
    <div class="card p-3">
        <h5 class="card-header">
            Modifier Arme
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
            <button class="w-100" @click="handleClick">{{ text }}</button>
        </div>
    </div>
</template>

<style scoped>
</style>

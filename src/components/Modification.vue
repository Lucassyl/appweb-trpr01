<script setup lang="ts">
import type { Weapon, Classification } from '../scripts/types';
import { ref } from 'vue';

const text = ref<string>('Modifier');
const weapon = defineModel<Weapon>({ required: true });

const emit = defineEmits(['modifierWeapon'])
const handleClick = (event: MouseEvent) => {
    emit('modifierWeapon')
}
</script>

<template>
    <div class="col-md-6 mb-3">
        <div class="card h-100 shadow-sm">
            <div class="card-header">
                Modify Weapon
            </div>
            <button @click="handleClick">{{ text }}</button>
        </div>
    </div>
</template>

<style scoped>
</style>

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
    <div class="card p-3">
        <h5 class="card-header">
            Modify Weapon
        </h5>
        <button @click="handleClick">{{ text }}</button>
    </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
const props = defineProps<{
    searchValue: String
}>()

const emit = defineEmits<{
    (e: 'update:searchValue', value: string): void
}>()

function onInput(event: Event) {
    const target = event.target as HTMLInputElement | null
    if (target) {
        emit('update:searchValue', target.value)
    }
}
</script>

<template>
    <input
        type="text"
        class="form-control"
        placeholder="Rechercher..."
        :value="searchValue"
        @input="onInput"
    />
</template>

<style scoped>
</style>

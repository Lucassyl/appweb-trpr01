<script setup lang="ts">
const props = defineProps({
    leftIcon: Object,
});
</script>

<template>
    <div class="col-md-4">
        <button class="inline-flex items-center">
            <component 
            :is="$props.leftIcon"
            class="w-5 h-5 mr-2"/>
        </button>
        <button class="inline-flex items-center">
            <component 
            :is="$props.leftIcon"
            class="w-5 h-5 mr-2"/>
        </button>
        <button class="inline-flex items-center">
            <component 
            :is="$props.leftIcon"
            class="w-5 h-5 mr-2"/>
        </button>
    </div>
</template>

<style>

</style>
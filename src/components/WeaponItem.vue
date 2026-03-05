<script setup lang="ts">
import { ref } from "vue"
import type { Weapon, Classification } from '../scripts/types';
defineProps<{
post: Weapon
}>()

const showDetail = ref(false);

const toggleDetail = () => {
    showDetail.value = !showDetail.value;
}

</script>

<template>
    <div class="card shadow-sm mb-3">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex gap-4">
                    <span class="fw-bold">
                        {{ post.name }}
                    </span>
                    <span class="">
                        {{ post.class }}
                    </span>
                    <span class="">
                        Prix: {{ post.prix }}
                    </span>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-primary">A1</button>
                    <button class="btn btn-sm btn-warning">A2</button>
                    <button class="btn btn-sm btn-danger">A3</button>
                </div>
                
            </div>
            <div class="d-flex justify-content-between mt-2">
                <a v-if="!showDetail" @click="toggleDetail" class="text-decoration-none small">Details...</a>
                <a v-else @click="toggleDetail" class="text-decoration-none small">Show less</a>
                <span class="post.stock > 0
                    ? 'text-success fw-bold'
                    : 'text-danger fw-bold'
                    "
                >
                    Stock: {{ post.stock }}
                </span>
            </div>
            <div v-if="showDetail" class="d-flex justify-content-start mt-2">
                <p>
                    {{ post.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
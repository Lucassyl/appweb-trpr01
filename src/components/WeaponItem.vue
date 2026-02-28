<script setup lang="ts">
import type { Weapon, Classification } from '../scripts/types';
defineProps<{
post: Weapon
}>()
</script>

<template>
    <div class="col-12 col-md-6 mb-3">
        <div class="d-flex align-items-center justify-content-between border rounded p-2 bg-light card md-4">
            <div class="d-flex col-3 fw-bold">
                {{ post.name }}
            </div>
            <div class="d-flex col-3">
                {{ post.class }}
            </div>
            <div class="d-flex col-3">
                prix: {{ post.prix }}
            </div>
            <div class="d-flex col-3">
                Stock:
                <span :class="post.stock > 0 ? 'text-success fw-bold' : 'text-danger fw-bold'">
                {{ post.stock }}
                </span>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-primary">A1</button>
                <button class="btn btn-sm btn-warning">A2</button>
                <button class="btn btn-sm btn-danger">A3</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
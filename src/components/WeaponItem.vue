<script setup lang="ts">
import { ref } from "vue"
import type { Weapon } from '../scripts/types';

const props = defineProps<{
post: Weapon
}>()

const emit = defineEmits<{
    (e: 'deleteWeapon', id: number): void;
    (e: 'copyWeapon', post: Weapon): void;
    (e: 'editWeapon', post: Weapon): void;
}>();

const handleClickDelete = () => {
    emit('deleteWeapon',  props.post.id );
}

const handleClickCopy = () => {
    emit('copyWeapon', props.post);
}

const handleClickEdit = () => {
    emit('editWeapon', props.post);
}

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
                    <button @click="handleClickDelete" class="btn btn-sm btn-primary">
                        <img class="img-fluid " src="../assets/image/delete.ico" alt="iconographie delete" style="width: 16px;"/>
                    </button>
                    <button @click="handleClickCopy" class="btn btn-sm btn-warning">
                        <img class="img-fluid " src="../assets/image/copy.ico" alt="iconographie copy" style="width: 16px;"/>
                    </button>
                    <button @click="handleClickEdit" class="btn btn-sm btn-danger">
                        <img class="img-fluid " src="../assets/image/edit.ico" alt="iconographie edit" style="width: 16px;"/>
                    </button>
                </div>
                
            </div>
            <div class="d-flex justify-content-between mt-2">
                <a v-if="!showDetail" @click="toggleDetail" class="text-decoration-none small clickable-text" >Details...</a>
                <a v-else @click="toggleDetail" class="text-decoration-none small clickable-text">Show less</a>
                <!--
                Code générer précèdament par ChatGPT et utiliser comme base pour le code en dessous
                <span class="post.stock > 0
                    ? 'text-success fw-bold'
                    : 'text-danger fw-bold'
                    "
                >-->
                <span
                    :class="{
                        'text-danger fw-bold': post.stock <= 0,
                        'text-warning fw-bold': post.stock > 0 && post.stock <= 2,
                        'text-white fw-bold': post.stock > 2
                    }"    
                >
                    <span v-if="post.stock <= 2">⚠</span>
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
.clickable-text {
  cursor: pointer;
  transition: color 0.3s;
}
</style>
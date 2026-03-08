<script setup lang="ts">

const emit = defineEmits<{
    (e: 'confirmDelete'): void;
    (e: 'closePopup'): void;
}>();


const handleClickConfirm = () => {
    emit('confirmDelete');
}

const handleClickAnnule = () => {
    emit('closePopup');
}

</script>

<template>
    <div class="popup">
        <div class="popup-inner">
            <h2>Confirmer la suppresion</h2>
            <div class="d-flex justify-content-around align-items-center">
                <button class="popup-close" @click="handleClickConfirm">
                    Confirmer
                </button>
                <button class="popup-close" @click="handleClickAnnule">
                    Annuler
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
/*
Reference
https://www.youtube.com/watch?v=HorXomQrOi8
*/
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        background: #1b1b1b;
        padding: 32px;
    }
}
</style>
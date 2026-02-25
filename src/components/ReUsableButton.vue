<script setup lang="ts">
interface Props {
    btnType?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  btnType: 'button',
  disabled: false,
});

interface Emits {
  (e: 'myClick', value: string): void;
}

const emit = defineEmits<Emits>();

const onClick = (event: MouseEvent) => {
    console.log('Click handler', event);
    emit('myClick', 'Button was clicked in child');
};

/*
Usage in parents
<template>
  <div>
    <MyButton @myClick="handleButtonClick">
      Save
    </MyButton>
    <p>Status: {{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyButton from './MyButton.vue'; // Adjust the path as needed

const status = ref<string>('Waiting for click');

// The event handler for the custom 'myClick' event expects a string argument
const handleButtonClick = (message: string) => {
  status.value = message;
};
/script>
*/
</script>

<template>
    <button :type="btnType" :disabled="disabled" @click="onClick">
        <slot></slot>
    </button>
</template>

<style scoped>
</style>

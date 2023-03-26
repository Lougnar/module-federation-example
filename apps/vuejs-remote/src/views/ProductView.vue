<script setup lang="ts">

interface Product {
  id: number;
  title: string
  description: string
  price: number
}


const props =  defineProps<{id: number}>();

function addToCart() {
    window.dispatchEvent(new CustomEvent<{id: number}>('ADD_TO_CART', { detail: { id: props.id } }));
}
function back() {
    window.history.back();
}
</script>

<template>
  <main>
    <button @click="back">BACK TO PRODUCTS LIST</button>
    <button @click="addToCart">ADD PRODUCT {{ props.id }} TO CART</button>
  </main>
</template>

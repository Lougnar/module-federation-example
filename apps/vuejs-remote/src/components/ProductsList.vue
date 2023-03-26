<script setup lang="ts">
import ProductComponent from './ProductComponent.vue';
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const products = [
  { id: 1, title: 'Souris', description: 'PMW 3389, 16000DPI', price: 29.99},
  { id: 2, title: 'Clavier', description: 'Clavier mécanique, switch rouge, silencieux', price: 79.99},
  { id: 3, title: 'Ecran Pc', description: 'Dalle VA, 24", 165hz, 1ms', price: 149.99},
  { id: 4, title: 'Rx 6700 XT', description: 'MSI Radeon RX 6700 XT MECH 2X 12G OC', price: 399.99}] as Product[];


</script>

<template>
  <h2>
      PRODUCTS LIST ({{ products.length }})
  </h2>
  <ProductComponent  v-for="product in products" v-bind:product="product" :key="product.id"/>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Product {
  id: number;
  title: string
  description: string
  price: number
}

const props =  withDefaults(defineProps<{product: Product}>(), {
  product: () => ({ id: 0, title: '', description: '', price: 0})
});


</script>

<template>
  <router-link :to="{ name: 'products', params: { id: product.id }}">
    <div id="product">
      <span>{{ product.id }}</span>
      <span>{{ product.title }}</span>
      <span id="description">{{ product.description }}</span>
      <span>{{ product.price }}$</span>
    </div>
  </router-link>
  
</template>

<style scoped>
#description {
  flex: 1;
}

#product {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}

#product:hover {
  background-color: lightblue;
}

#product > span {
  border: solid 1px black;
  padding: 16px;
}

#product > span + span {
  border-left: none;
}
</style>

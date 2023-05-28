<script></script>

<script setup>
import ProductList from './components/ProductList.vue'
import MyHeader from './components/MyHeader.vue'
import axios from './api/api'
import { computed, ref, onBeforeMount } from 'vue'

const products = ref({})
onBeforeMount(async () => {
  products.value = (await axios.get(`/products`)).data
})

console.log('products', products)
const query = ref('')

const queryProducts = computed(() => {
  let p = products.value
  let search = query.value
  if (search) {
    p = p.filter((product) => {
      console.log(search)
      return (
        product.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 || product.price <= search
      )
    })
  }
  return p
})
</script>

<template>
  <my-header :modelValue="query" @update:modelValue="query = $event"></my-header>
  <input type="search" placeholder="Поиск продуктов..." v-model="query" />
  <product-list :products="queryProducts"></product-list>
</template>

<style scoped lang="scss"></style>

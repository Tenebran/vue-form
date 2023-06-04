<script setup>
import ProductList from './components/ProductList.vue'
import MyHeader from './components/MyHeader.vue'
import axios from './api/api'
import { computed, ref, onBeforeMount } from 'vue'
import { Modal } from 'usemodal-vue3'

const products = ref({})
onBeforeMount(async () => {
  products.value = (await axios.get(`/products`)).data
})

const query = ref('')
let isVisibleAddProduct = ref(false)

const queryProducts = computed(() => {
  let p = products.value
  let search = query.value
  if (search) {
    p = p.filter((product) => {
      return (
        product.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 || product.price <= search
      )
    })
  }
  return p
})
</script>

<template>
  <my-header
    :modelValue="query"
    :addProduct="isVisibleAddProduct"
    @update:modelValue="query = $event"
  ></my-header>
  <input type="search" placeholder="Поиск продуктов..." v-model="query" />
  <product-list :products="queryProducts"></product-list>
</template>

<style scoped lang="scss"></style>

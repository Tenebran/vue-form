<script setup>
import ProductList from './components/ProductList.vue'
import MyHeader from './components/MyHeader.vue'
import AddProduct from './components/AddProduct.vue'
import axios from './api/api'
import { computed, ref, onBeforeMount, reactive } from 'vue'
import { Modal, useModal } from 'usemodal-vue3'

const products = ref({})
const localStorageProducts = JSON.parse(localStorage.getItem('products'))
if (!localStorageProducts) {
  onBeforeMount(async () => {
    products.value = (await axios.get(`/products`)).data
    localStorage.setItem('products', JSON.stringify(products.value))
  })
} else {
  products.value = localStorageProducts
}

let modalVisible = reactive({})
let modalVisible2 = reactive({})
const query = ref('')

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

let setModal = useModal({
  m1: 2,
  m2: 1
})
modalVisible = setModal('m1', false)
modalVisible2 = setModal('m2', false)
</script>

<template>
  <my-header
    :modelValue="query"
    :setModal="setModal"
    :modalVisible="modalVisible"
    @update:modelValue="query = $event"
  ></my-header>
  <input type="search" placeholder="Поиск продуктов..." v-model="query" />
  <product-list :products="queryProducts"></product-list>
  <Modal
    name="m1"
    v-model:visible="modalVisible"
    :animation="true"
    :closable="false"
    :draggable="true"
    @onVisible="onVisible2"
    @onUnVisible="onUnVisible"
    :okButton="{
      onclick: okfn,
      loading: true
    }"
    ><add-product></add-product>
  </Modal>

  <Modal name="m2" v-model:visible="modalVisible2"> </Modal>
</template>

<style scoped lang="scss"></style>

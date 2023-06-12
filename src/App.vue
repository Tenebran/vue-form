<script setup>
import ProductList from './components/ProductList.vue'
import MyHeader from './components/MyHeader.vue'
import AddProduct from './components/AddProduct.vue'
import PaymentProduct from './components/PaymentProduct.vue'
import axios from './api/api'
import { computed, ref, onBeforeMount, reactive } from 'vue'
import { useModal } from 'usemodal-vue3'

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
const submitProduct = (newProduct) => {
  products.value.push(newProduct)
  localStorage.setItem('products', JSON.stringify(products.value))
  setModal('m1', false)
  axios
    .post('api/review', products, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err))
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
  <MyHeader :modelValue="query" :setModal="setModal" @update:modelValue="query = $event" />
  <input type="search" placeholder="Поиск продуктов..." v-model="query" />
  <ProductList :products="queryProducts" :setModal="setModal" />
  <AddProduct :submitAddProduct="submitProduct" :modalVisible="modalVisible" />
  <PaymentProduct :modalVisible="modalVisible2" :setModal="setModal" />
</template>
<style scoped lang="scss"></style>

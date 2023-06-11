<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Modal
    name="m1"
    v-model:visible="props.modalVisible"
    :animation="true"
    :draggable="true"
    title="Форма Добавление Товара"
    :okButton="{
      onclick: () => props.submitAddProduct(review),
      loading: true,
      text: 'Купить'
    }"
    :cancelButton="{
      text: 'Отмена'
    }"
  >
    <form class="container pt-5 pd-5" @submit.prevent.stop="submitAddProduct">
      <div>Категория</div>
      <select v-model="review.category">
        <option disabled>Категория</option>
        <option>men's clothing</option>
        <option>jewelery</option>
        <option>women's clothing</option>
        <option>electronic</option>
      </select>
      <input type="text" placeholder="Имя товара" id="addTitle" v-model="review.title" />
      <input
        type="text"
        placeholder="Описание товара"
        id="addSubtitle"
        v-model="review.description"
      />
      <input type="text" placeholder="Картинка Url" id="addImg" v-model="review.image" />
      <input type="text" placeholder="Цена" id="addPrice" v-model="review.price" />
      <input type="text" placeholder="Количество шт." id="addCount" v-model="review.rating.count" />
    </form>
  </Modal>
</template>

<script setup>
import { reactive } from 'vue'
import { v4 } from 'uuid'
import { Modal } from 'usemodal-vue3'

const props = defineProps(['submitAddProduct', 'modalVisible'])

const review = reactive({
  category: '',
  description: '',
  id: v4(),
  image: '',
  price: null,
  rating: { rate: 0, count: null },
  title: ''
})
</script>

<style lang="scss" scoped>
input {
  display: block;
  margin: 10px 0 0 0;
  width: 100%;
}
</style>

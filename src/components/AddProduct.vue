<template>
  <form class="container pt-5 pd-5" @submit.prevent.stop="submitAddProduct">
    <div>Категория</div>
    <select v-model="selected">
      <option disabled value="">Категория</option>
      <option>men's clothing</option>
      <option>jewelery</option>
      <option>women's clothing</option>
      <option>electronic</option>
    </select>
    <input type="text" placeholder="Имя товара" id="addTitle" />
    <input type="text" placeholder="Описание товара" id="addSubtitle" />
    <input type="text" placeholder="Картинка Url" id="addImg" />
    <input type="text" placeholder="Цена" id="addPrice" />
    <input type="text" placeholder="Количество шт." id="addCount" />
  </form>
</template>

<script setup></script>

<style lang="scss" scoped>
input {
  display: block;
  margin: 10px 0 0 0;
  width: 100%;
}
</style>

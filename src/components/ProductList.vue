<template>
  <ul class="products">
    <ProductItem
      :onSelectProduct="props.onSelectProduct"
      v-for="list in props.products"
      :key="list.id"
      :title="list.title"
      :description="list.description"
      :image="list.image"
      :price="list.price"
      :rating="list.rating"
    />
  </ul>
</template>

<script setup>
import ProductItem from './ProductItem.vue'
const props = defineProps(['products', 'onSelectProduct'])
</script>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 120px;
}
</style>

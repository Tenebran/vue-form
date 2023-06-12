<template>
  <Modal
    name="m1"
    v-model:visible="props.modalVisible"
    :animation="true"
    :draggable="true"
    title="Форма Добавление Товара"
    :okButton="{
      onclick: () => console.log(schema.errors),
      // props.submitAddProduct(review),
      loading: false,
      text: 'Купить'
    }"
    footer="none"
    :cancelButton="{
      text: 'Отмена'
    }"
    :ok-disabled="true"
  >
    <Form @submit="onSubmit()" :validation-schema="schema" v-slot="{ errors }">
      <div class="form-row">
        <div class="form-group col">
          <label>Категория</label>
          <Field
            placeholder="Выберите Категорию"
            name="category"
            as="select"
            class="form-control"
            :class="{ 'is-invalid': errors.category }"
            v-model="review.category"
          >
            <option disabled>Категория</option>
            <option value="men's clothing">men's clothing</option>
            <option value="jewelery">jewelery</option>
            <option value="women's clothing">women's clothing</option>
            <option value="electronic">electronic</option>
          </Field>
          <div class="invalid-feedback">{{ errors.category }}</div>
        </div>
        <div class="form-group">
          <label>Введите имя товара</label>
          <Field
            placeholder="Имя товара"
            name="title"
            type="text"
            class="form-control"
            v-model="review.title"
            :class="{ 'is-invalid': errors.title }"
          />
          <div class="invalid-feedback">{{ errors.title }}</div>
        </div>

        <div class="form-group">
          <label>Введите Описание товара</label>
          <Field
            placeholder="Описание товара"
            name="description"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.description }"
            v-model="review.description"
          />
          <div class="invalid-feedback">{{ errors.description }}</div>
        </div>

        <div class="form-group">
          <label>Картинка Товара</label>
          <Field
            placeholder="Введите Картинку url"
            name="image"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.image }"
            v-model="review.image"
          />
          <div class="invalid-feedback">{{ errors.image }}</div>
        </div>

        <div class="form-group">
          <label>Цена</label>
          <Field
            placeholder="Введите цену"
            name="price"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.price }"
            v-model="review.price"
          />
          <div class="invalid-feedback">{{ errors.price }}</div>
        </div>

        <div class="form-group">
          <label>Количество</label>
          <Field
            placeholder="Введите Количество шт."
            name="count"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.count }"
            v-model="review.rating.count"
          />
          <div class="invalid-feedback">{{ errors.count }}</div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mr-1">Добавить</button>
    </Form>
  </Modal>
</template>

<script setup>
import { reactive } from 'vue'
import { v4 } from 'uuid'
import { Modal } from 'usemodal-vue3'
import * as Yup from 'yup'
import { Form, Field } from 'vee-validate'

const props = defineProps(['submitAddProduct', 'modalVisible'])

const schema = Yup.object().shape({
  category: Yup.string().required('Нужно выбрать категорию'),
  title: Yup.string().required('Нужно ввести имя товара'),
  description: Yup.string().required('Нужно ввести описание товара'),
  image: Yup.string().required('Нужно вставить картинку'),
  price: Yup.string().required('Нужно ввести цену'),
  count: Yup.string().required('Введите количество')
})

const review = reactive({
  category: '',
  description: '',
  id: v4(),
  image: '',
  price: null,
  rating: { rate: 0, count: null },
  title: ''
})
const onSubmit = () => {
  props.submitAddProduct(review)
  review.category = ''
  review.description = ''
  review.image = ''
  review.price = null
  review.title = ''
  review.rating.count = null
}
</script>

<style lang="scss" scoped>
input {
  display: block;
  margin: 10px 0 0 0;
  width: 100%;
}
div.modal-vue3-footer {
  display: none !important;
}
</style>

<style lang="scss">
div.modal-vue3-footer {
  display: none !important;
}
</style>

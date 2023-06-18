<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Modal
    name="m2"
    v-model:visible="props.modalVisible"
    :animation="true"
    :draggable="true"
    :closable="false"
    title="Форма Покупки Товара"
  >
    <Form
      v-if="!props.productsBuyDone"
      @submit="(e) => props.onBuyProducts(e)"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <div class="form-row">
        <div class="form-group col">
          <label>Title</label>
          <Field
            name="title"
            as="select"
            class="form-control"
            :class="{ 'is-invalid': errors.title }"
          >
            <option value=""></option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
          </Field>
          <div class="invalid-feedback">{{ errors.title }}</div>
        </div>
        <div class="form-group col-5">
          <label>First Name</label>
          <Field
            name="firstName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.firstName }"
          />
          <div class="invalid-feedback">{{ errors.firstName }}</div>
        </div>
        <div class="form-group col-5">
          <label>Last Name</label>
          <Field
            name="lastName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.lastName }"
          />
          <div class="invalid-feedback">{{ errors.lastName }}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label>Date of Birth</label>

          <Field
            name="dob"
            type="date"
            id="start"
            :max="brithDate(18)"
            :min="brithDate(100)"
            class="form-control"
            v-validate="'date_format:dd/MM/yyyy'"
            :class="{ 'is-invalid': errors.dob }"
          />
          <div class="invalid-feedback">{{ errors.dob }}</div>
        </div>
        <div class="form-group col">
          <label>Email</label>
          <Field
            name="email"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
          />
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>

        <div class="form-group col">
          <label>Credit Card</label>
          <Field
            name="cardNumber"
            type="number"
            class="form-control"
            v-cardformat:formatCardCVC
            :class="{ 'is-invalid': errors.cardNumber }"
          />
          <div class="invalid-feedback">{{ errors.cardNumber }}</div>
        </div>

        <div class="form-group col">
          <label>CVC</label>
          <Field
            name="cvc"
            type="number"
            class="form-control"
            v-cardformat:formatCardCVC
            :class="{ 'is-invalid': errors.cvc }"
          />
          <div class="invalid-feedback">{{ errors.cvc }}</div>
        </div>

        <div class="form-group col">
          <label>name Card</label>
          <Field
            name="nameOnCard"
            type="text"
            class="form-control"
            v-validate="'credit_card'"
            :class="{ 'is-invalid': errors.nameOnCard }"
          />
          <div class="invalid-feedback">{{ errors.nameOnCard }}</div>
        </div>

        <div class="form-group col">
          <label>expiry Month</label>
          <Field
            name="expiryMonth"
            type="month"
            :min="expiryDate(0)"
            :max="expiryDate(8)"
            class="form-control"
            v-validate="'date_format:MM/yyyy'"
            :class="{ 'is-invalid': errors.expiryMonth }"
          />
          <div class="invalid-feedback">{{ errors.expiryMonth }}</div>
        </div>
      </div>

      <div class="form-group form-check" style="margin: 20px 0">
        <Field
          name="acceptTerms"
          type="checkbox"
          id="acceptTerms"
          value="true"
          class="form-check-input"
          :class="{ 'is-invalid': errors.acceptTerms }"
          style="max-width: 20px; max-height: 20px; border-radius: 100%; padding: 10px"
        />
        <label for="acceptTerms" class="form-check-label">Accept Terms & Conditions</label>
        <div class="invalid-feedback">{{ errors.acceptTerms }}</div>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary mr-2">Купить</button>
        <button type="reset" class="btn btn-secondary">Сброс</button>
        <button type="reset" class="btn btn-secondary">Закрыть</button>
      </div>
    </Form>
    <div v-else-if="!!props.productsBuyDone" class="success__payment">
      <div class="success__payment_title">
        Thanks For Payment
        <button class="btn btn-primary mr-2" @click="props.onClosePayment">Закрыть Окно</button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { Modal } from 'usemodal-vue3'
import * as Yup from 'yup'
import { Form, Field } from 'vee-validate'

const props = defineProps([
  'modalVisible',
  'setModal',
  'onBuyProducts',
  'productsBuyDone',
  'onClosePayment'
])
const fullYear = new Date().getFullYear()
const brithDate = (year) =>
  `${fullYear - year}-${
    new Date().getMonth() < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
  }-${new Date().getUTCDate()}`

const expiryDate = (year) =>
  `${fullYear + year}-${
    new Date().getMonth() < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
  }`

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last name is required'),
  dob: Yup.date().required('Date of Birth is required').min(brithDate(100)).max(brithDate(18)),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  cardNumber: Yup.string().label('Card number').min(16).max(16).required(),
  cvc: Yup.string().label('CVC').min(3).max(4).required(),
  nameOnCard: Yup.string().label('Name on card').required(),
  expiryMonth: Yup.date()
    .label('Expiry month')
    .min(fullYear + 0)
    .max(fullYear + 8)
    .required(),
  acceptTerms: Yup.string().required('Accept Ts & Cs is required')
})
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

.form-check-input {
  width: 10px;
}
.success__payment {
  background-color: rgb(199, 236, 143);
  height: 500px;
  &_title {
    font-size: 20px;
    color: rgb(14, 10, 10);
    font-weight: 800;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>

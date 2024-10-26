<template>
  <div>
    <v-btn @click="addNewOrder">Create Order</v-btn>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="order in allOrders" :key="order.id" :title="order.id" :text="order.dateTimeOrderRecieved">
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
  
<script>
import axios from 'axios'

export default {
  data() {
    return {
      allOrders: null
    }
  },
  methods: {
    getAllOrders() {
      axios.get('https://localhost:7187/Item/GetAllOrders/')
      .then(response => this.allOrders = response.data)
    },
    addNewOrder() {
      axios.post('https://localhost:7187/Item/CreateOrder/')
    }
  },
  mounted() {
    this.getAllOrders()
  }
}
</script>

<style scoped>
</style>
  
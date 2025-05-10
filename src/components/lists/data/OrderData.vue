<template>
  <div>
    <v-content v-for="order in orderData">
      <v-row>
        <v-col>Name:</v-col>
        <v-col>{{ order.name }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Description:</v-col>
        <v-col>{{ order.description }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Order ID:</v-col>
        <v-col>{{ order.orderId }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Timestamp Of Last Event Type Change:</v-col>
        <v-col>{{ order.dateTimeStamp }}</v-col>
      </v-row>
    </v-content>
  </div>
</template>
  
<script setup>
const props = defineProps({
  orderData: Array
})

</script>

<style scoped>
</style>
      
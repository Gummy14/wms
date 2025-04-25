<template>
  <div>
        <v-content v-for="order in orderData">
          <!-- <v-row>
            <v-col cols="12">
              <v-btn 
                v-if="order.containerUsedToPickOrder.length == 0"
                @click="acknowledgeOrder(order.orderData[0].orderId)"
              >
                Acknowledge Order
              </v-btn>
            </v-col>
          </v-row> -->
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
    <!-- <v-dialog 
      v-model="openScanner"
      max-width="400"
    >
      <ObjectScanner :orderId="orderIdToAddContainerTo"/>
    </v-dialog> -->
  </div>
</template>
  
<script setup>
// import { ref } from 'vue'
// import ObjectScanner from '@/components/ObjectScanner.vue'

// var openScanner = ref(false)
// var orderIdToAddContainerTo = ref(false)
const props = defineProps({
  orderData: Array
})

function isEmpty(id) {
  return id == null ? true : false
}
// function acknowledgeOrder(orderId) {
//   orderIdToAddContainerTo.value = orderId
//   openScanner.value = true
// }
</script>

<style scoped>
</style>
      
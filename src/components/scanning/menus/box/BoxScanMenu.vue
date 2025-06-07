<template>
  <div>
    <v-card
      :title="box.boxData[0].name"
      :text="box.boxData[0].description"
    >
      <div v-if="actionSelected == 0">
        <v-btn
          @click="actionSelected = 1"
        >
          Add Box To Shipment
        </v-btn>
        <v-btn
          @click="actionSelected = 2"
        >
          Get Box History
        </v-btn>
      </div>

      <AddBoxToShipment
        v-if="actionSelected == 1"
        :box="box"
      />

      <BoxHistory
        v-if="actionSelected == 2"
        :box="box"
      />
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddBoxToShipment from './shipment/AddBoxToShipment.vue'
import BoxHistory from './history/BoxHistory.vue'

var actionSelected = ref(0)

const props = defineProps({
  box: Object
})

</script>

<style scoped>
</style>
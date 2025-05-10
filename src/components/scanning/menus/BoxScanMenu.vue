<template>
  <div>
    <v-card>
      {{ box }}
      <v-btn>
        Add Box To Shipment
      </v-btn>
      <v-btn>
        Add Box To Truck
      </v-btn>
      <v-btn>
        Get Box History
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps({
  box: Object
})


</script>

<style scoped>
</style>
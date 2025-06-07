<template>
  <div>
    <v-content v-for="shipment in shipmentData">
      <v-row>
        <v-col>Name:</v-col>
        <v-col>{{ shipment.name }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Description:</v-col>
        <v-col>{{ shipment.description }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Shipment ID:</v-col>
        <v-col>{{ shipment.shipmentId }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Timestamp Of Last Event Type Change:</v-col>
        <v-col>{{ shipment.dateTimeStamp }}</v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script setup>
const props = defineProps({
  shipmentData: Array
})
</script>

<style scoped>
</style>
          
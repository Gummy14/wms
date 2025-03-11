<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="warehouseObject in warehouseObjects">
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col v-if="warehouseObject.objectType == 0" class="d-flex justify-start" cols="8">
              {{ warehouseObject.itemName }}
            </v-col>
            <v-col v-else-if="warehouseObject.objectType == 1" class="d-flex justify-start" cols="8">
              {{ warehouseObject.locationName }}
            </v-col>
            <v-col v-else-if="warehouseObject.objectType == 2" class="d-flex justify-start" cols="8">
              {{ warehouseObject.containerName }}
            </v-col>
            <v-col v-else-if="warehouseObject.objectType == 3" class="d-flex justify-start" cols="8">
              {{ warehouseObject.orderName }}
            </v-col>
            <v-col class="d-flex justify-end" cols="4">
              {{ warehouseObject.status }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <!-- <v-row>
            <v-col>Description:</v-col>
            <v-col>{{ warehouseObject.description }}</v-col>
          </v-row> -->
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Item:</v-col>
            <v-col v-if="isEmpty(warehouseObject.itemId)">N/A</v-col>
            <v-col v-else>{{ warehouseObject.itemName }} ({{ warehouseObject.itemId }})</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Location:</v-col>
            <v-col v-if="isEmpty(warehouseObject.locationId)">N/A</v-col>
            <v-col v-else>{{ warehouseObject.locationName }} ({{ warehouseObject.locationId }})</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Container:</v-col>
            <v-col v-if="isEmpty(warehouseObject.containerId)">N/A</v-col>
            <v-col v-else>{{ warehouseObject.containerName }} ({{ warehouseObject.containerId }})</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Order:</v-col>
            <v-col v-if="isEmpty(warehouseObject.orderId)">N/A</v-col>
            <v-col v-else>{{ warehouseObject.orderName }} ({{ warehouseObject.orderId }})</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Status:</v-col>
            <v-col>{{ warehouseObject.status }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Timestamp Of Last Status Change:</v-col>
            <v-col>{{ warehouseObject.dateTimeStamp }}</v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
const props = defineProps({
  warehouseObjects: Array
})

function isEmpty(id) {
  return id == '00000000-0000-0000-0000-000000000000' ? true : false
}
</script>

<style scoped>
</style>
    
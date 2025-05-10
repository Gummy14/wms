<template>
  <div>
    <v-content v-for="item in itemData">
      <v-row>
        <v-col>Name:</v-col>
        <v-col>{{ item.name }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Description:</v-col>
        <v-col>{{ item.description }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Item ID:</v-col>
        <v-col>{{ item.itemId }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Item Type:</v-col>
        <v-col>{{ item.itemType }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Event Description:</v-col>
        <v-col>{{ item.eventDescription }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Location:</v-col>
        <v-col v-if="isEmpty(item.locationId)">Not Currently In Any Storage Location</v-col>
        <v-col v-else>{{ item.locationName }} ({{ item.locationId }})</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Container:</v-col>
        <v-col v-if="isEmpty(item.containerId)">Not Currently In Any Container</v-col>
        <v-col v-else>{{ item.containerName }} ({{ item.containerId }})</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Order:</v-col>
        <v-col v-if="isEmpty(item.orderId)">Not Currently Part of Any Order</v-col>
        <v-col v-else>{{ item.orderName }} ({{ item.orderId }})</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Timestamp Of Last Event Type Change:</v-col>
        <v-col>{{ item.dateTimeStamp }}</v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script setup>
const props = defineProps({
  itemData: Array
})

function isEmpty(id) {
  return id == null ? true : false
}
</script>

<style scoped>
</style>
    
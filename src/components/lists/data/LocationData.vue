<template>
  <div>
    <v-content v-for="location in locationData">
      <v-row>
        <v-col>Name:</v-col>
        <v-col>{{ location.name }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Description:</v-col>
        <v-col>{{ location.description }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Location ID:</v-col>
        <v-col>{{ location.locationId }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Timestamp Of Last Event Type Change:</v-col>
        <v-col>{{ location.dateTimeStamp }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Item ID:</v-col>
        <v-col v-if="isEmpty(location.itemId)">No Item In Location</v-col>
        <v-col v-else>{{ location.itemName }} ({{ location.itemId }})</v-col>
      </v-row>
    </v-content>
  </div>
</template>
  
<script setup>
const props = defineProps({
  locationData: Array
})

function isEmpty(id) {
  return id == null ? true : false
}
</script>

<style scoped>
</style>
        
<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="item in items">
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="8">
              {{ item.name }}
            </v-col>
            <v-col class="d-flex justify-end" cols="4">
              {{ item.status }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col>Description:</v-col>
            <v-col>{{ item.description }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Item ID:</v-col>
            <v-col>{{ item.id }}</v-col>
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
            <v-col v-else>{{ item.containerId }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Order:</v-col>
            <v-col v-if="isEmpty(item.orderId)">Not Currently Part of Any Order</v-col>
            <v-col v-else>>{{ item.orderId }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Status:</v-col>
            <v-col>{{ item.status }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Timestamp Of Last Status Change:</v-col>
            <v-col>{{ item.dateTimeStamp }}</v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
const props = defineProps({
  items: Array
})

function isEmpty(id) {
  return id == '00000000-0000-0000-0000-000000000000' ? true : false
}
</script>

<style scoped>
</style>
  
<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="location in locations">
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="8">
              {{ location.name }}
            </v-col>
            <v-col class="d-flex justify-end" cols="4">
              {{ location.status }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col>Description:</v-col>
            <v-col>{{ location.description }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Location ID:</v-col>
            <v-col>{{ location.id }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Status:</v-col>
            <v-col>{{ location.status }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Timestamp Of Last Status Change:</v-col>
            <v-col>{{ location.dateTimeStamp }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Item ID:</v-col>
            <v-col>{{ location.itemId }}</v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
  
<script setup>
const props = defineProps({
  locations: Array
})
</script>

<style scoped>
</style>
      
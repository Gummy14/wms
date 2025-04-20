<template>
    <div>
      <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="truck in trucks">
          <v-expansion-panel-title v-slot="{ expanded }">
            <v-row no-gutters>
              <v-col class="d-flex justify-start" cols="8">
                {{ truck.licensePlate }}
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col>License Plate:</v-col>
              <v-col>{{ truck.licensePlate }}</v-col>
            </v-row>
            <v-divider class="border-opacity-25"></v-divider>
            <v-row>
              <v-col>Truck ID:</v-col>
              <v-col>{{ truck.id }}</v-col>
            </v-row>
            <v-divider class="border-opacity-25"></v-divider>
            <v-row>
              <v-col>Timestamp Of Arrival:</v-col>
              <v-col>{{ truck.arrivalDateTimeStamp }}</v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    trucks: Array
  })
  
  </script>
  
  <style scoped>
  </style>
        
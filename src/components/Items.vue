<template>
  <div>
    <div v-if="!retrievedAllItems">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-expansion-panels multiple>
          <v-expansion-panel v-for="item in allItems">
            <v-expansion-panel-title v-slot="{ expanded }">
             <v-row no-gutters>
               <v-col>
                 {{ item.name }}
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
                <v-col>{{ item.locationId }}</v-col>
              </v-row>
              <v-divider class="border-opacity-25"></v-divider>
              <v-row>
                <v-col>Container:</v-col>
                <v-col>{{ item.containerId }}</v-col>
              </v-row>
              <v-divider class="border-opacity-25"></v-divider>
              <v-row>
                <v-col>Order:</v-col>
                <v-col>{{ item.orderId }}</v-col>
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
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllItems } from '@/functions/functions'

var allItems = ref(null)
var retrievedAllItems = ref(false)

onMounted(() => {
  GetAllItems()
  .then(response => {
    allItems.value = response.data
    retrievedAllItems.value = true
  })
})
</script>

<style scoped>
</style>

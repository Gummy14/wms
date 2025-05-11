<template>
  <div>
    <v-card
      :title="container.containerData[0].name"
      :text="container.containerData[0].description"
    >
      <div v-if="actionSelected == 0">
        <v-btn
          @click="actionSelected = 1"
        >
          Package Items
        </v-btn>
        <v-btn
          @click="actionSelected = 2"
        >
          Get Container History
        </v-btn>
      </div>

      <AddBoxToPackageOrder 
        v-if="actionSelected == 1"
        :container="container"
      />

      <ContainerHistory
        v-if="actionSelected == 2"
        :container="container"
      />
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddBoxToPackageOrder from './pack/AddBoxToPackageOrder.vue'
import ContainerHistory from './history/ContainerHistory.vue'

var actionSelected = ref(0)

const props = defineProps({
  container: Object
})

</script>

<style scoped>
</style>
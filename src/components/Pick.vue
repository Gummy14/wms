<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Container Or Item Id" v-model="genericId"></v-text-field>
      </v-card>
      <v-btn @click="getItemContainerRelationship">Search</v-btn>
    </div>
    <div>
      <v-dialog
        v-model="containerData"
        width="auto"
      >
        <v-card v-if="containerData"
          max-width="400"
          :text="containerData.item.description"
          :title="containerData.item.name"
        >
          Container Id: {{ containerData.id }}
          Container Name: {{ containerData.name }}
          <v-btn @click="pickItemFromContainer">Pick</v-btn>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      genericId: 0,
      containerData: null
    }
  },
  methods: {
    getItemContainerRelationship() {
      axios.get('https://localhost:7187/Item/GetItemContainerRelationship/' + this.genericId)
      .then(response => this.containerData = response.data)
    },
    pickItemFromContainer() {
      axios.post('https://localhost:7187/Item/PickItem/', this.containerData)
      .then(this.resetAllPutawayData())
    },
    resetAllPutawayData() {
      this.containerToPickFrom = 0,
      this.containerData = null
    }
  }
}
</script>

<style scoped>
</style>

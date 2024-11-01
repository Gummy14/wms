<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Item Id" v-model="itemToPutawayId"></v-text-field>
      </v-card>
      <v-btn @click="getItemById">Find Item</v-btn>
    </div>
    <div>
      <v-dialog
        v-model="putawayItem"
        width="auto"
      >
        <v-card v-if="putawayItem"
          max-width="400"
          :text="putawayItem.description"
          :title="putawayItem.name"
        >
        <div v-if="putawayContainer == null">
          <v-btn @click="getPutawayLocationForItem">Get Putaway Location</v-btn>
        </div>
        <div v-else>
          Putaway In Location: {{ putawayContainer.name }}
          <v-btn @click="putItemInContainer">Putaway</v-btn>
        </div>
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
      itemToPutawayId: '',
      putawayContainer: null,
      putawayItem: null
    }
  },
  methods: {
    getItemById() {
      axios.get('https://localhost:7187/WMS/GetItemById/' + this.itemToPutawayId)
      .then(response => this.putawayItem = response.data)
    },
    getPutawayLocationForItem() {
      axios.get('https://localhost:7187/WMS/GetPutawayLocation')
      .then(response => this.putawayContainer = response.data)
    },
    putItemInContainer() {
      this.putawayContainer.itemEventId = this.putawayItem.itemEventId
      axios.post('https://localhost:7187/WMS/PutawayItem', this.putawayContainer)
      .then(this.resetAllPutawayData())
    },
    resetAllPutawayData() {
      this.itemToPutawayId = '',
      this.putawayContainer = null,
      this.putawayItem = null
    }
  }
}
</script>

<style scoped>
</style>
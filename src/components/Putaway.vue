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
        v-model="openPutawayDialog"
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
          Putaway In Location: {{ putawayContainer.id }}
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
      itemToPutawayId: 0,
      openPutawayDialog: false,
      putawayContainer: null,
      putawayItem: null,
      putawayAction: {
        itemId: null,
        containerId: null
      }
    }
  },
  methods: {
    getItemById() {
      axios.get('https://localhost:7187/Item/GetItemById/' + this.itemToPutawayId)
      .then(response => this.putawayItem = response.data)
      .then(this.openPutawayDialog = true)
    },
    getPutawayLocationForItem() {
      axios.get('https://localhost:7187/Item/GetPutawayLocation')
      .then(response => this.putawayContainer = response.data)
    },
    putItemInContainer() {
      this.putawayAction.itemId = this.putawayItem.id;
      this.putawayAction.containerId = this.putawayContainer.id;
      axios.post('https://localhost:7187/Item/PutawayItem', this.putawayAction)
      .then(this.resetAllPutawayData())
    },
    resetAllPutawayData() {
      this.itemToPutawayId = 0,
      this.openPutawayDialog = false,
      this.putawayContainer = null,
      this.putawayItem = null,
      this.putawayAction = {
        itemId: null,
        containerId: null
      }
    }
  }
}
</script>

<style scoped>
</style>
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
        <v-card
          max-width="400"
          :text="putawayItemData.description"
          :title="putawayItemData.name"
        >
        <div v-if="foundPutawayLocation == 0">
          <v-btn @click="getPutawayLocationForItem">Get Putaway Location</v-btn>
        </div>
        <div v-else>
          Putaway In Location: {{ foundPutawayLocation }}
          <v-btn @click="putawayItem">Putaway</v-btn>
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
      foundPutawayLocation: 0,
      openPutawayDialog: false,
      putawayItemData: {}
    }
  },
  methods: {
    getItemById() {
      axios.get('https://localhost:7187/Item/GetItemById/' + this.itemToPutawayId)
      .then(response => this.putawayItemData = response.data)
      .then(this.openPutawayDialog = true)
    },
    getPutawayLocationForItem() {
      axios.get('https://localhost:7187/Item/GetPutawayLocation')
      .then(response => this.foundPutawayLocation = response.data.id)
    },
    putawayItem() {
      axios.post('https://localhost:7187/Item/PutawayItem', this.putawayItemData)
      .then(this.resetAllPutawayData())
    },
    resetAllPutawayData() {
      this.itemToPutawayId = 0
      this.foundPutawayLocation = 0
      this.openPutawayDialog = false
      this.putawayItemData = {}
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Item Id" v-model="itemIdToSearchFor"></v-text-field>
      </v-card>
      <v-btn @click="getItemData">Find Item</v-btn>
    </div>
    <div>
      <v-dialog
        v-model="openItemDialog"
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
      itemIdToSearchFor: 0,
      containerData: null,
      openItemDialog: false,
      pickAction: {
        containerId: null,
        itemId: null
      }
    }
  },
  methods: {
    getItemData() {
      axios.get('https://localhost:7187/Item/GetItemContainerRelationshipByItemId/' + this.itemIdToSearchFor)
      .then(response => this.containerData = response.data)
      .then(this.openItemDialog = true)
    },
    getContainerByItemId() {
      axios.get('https://localhost:7187/Item/GetContainerByItemId/' + this.itemIdToSearchFor)
      .then(response => this.containerData = response.data)
    },
    pickItemFromContainer() {
      this.pickAction.containerId = this.containerData.id;
      this.pickAction.itemId = this.containerData.item.id;
      axios.post('https://localhost:7187/Item/PickItem/', this.pickAction)
      .then(this.resetAllPutawayData())
      .then(this.openItemDialog = false)
    },
    resetAllPutawayData() {
      this.itemIdToSearchFor = 0,
      this.containerData = null,
      this.openItemDialog = false,
      this.pickAction = {
        containerId: null,
        itemId: null
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>

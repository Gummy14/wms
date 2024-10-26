<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Container Id" v-model="containerToPickFrom"></v-text-field>
      </v-card>
      <v-btn @click="getItemContainerRelationshipByContainerId">Find Contents of Container</v-btn>
    </div>
    <div>
      <v-dialog
        v-model="openContainerContentsDialog"
        width="auto"
      >
        <v-card v-if="containerData"
          max-width="400"
          :text="containerData.item.description"
          :title="containerData.item.name"
        >
          <v-btn @click="pickItemFromContainer">Pick Item</v-btn>
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
      containerToPickFrom: 0,
      openContainerContentsDialog: false,
      containerData: null,
      pickAction: {
        containerId: null,
        itemId: null
      }
    }
  },
  methods: {
    getItemContainerRelationshipByContainerId() {
      axios.get('https://localhost:7187/Item/GetItemContainerRelationshipByContainerId/' + this.containerToPickFrom)
      .then(response => this.containerData = response.data)
      .then(this.openContainerContentsDialog = true)
    },
    pickItemFromContainer() {
      this.pickAction.containerId = this.containerData.id;
      this.pickAction.itemId = this.containerData.item.id;
      axios.post('https://localhost:7187/Item/PickItem/', this.pickAction)
      .then(this.openContainerContentsDialog = false)
    },
    resetAllPutawayData() {
      this.containerToPickFrom = 0,
      this.openContainerContentsDialog = false,
      this.containerData = null,
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

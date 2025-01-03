import axios from 'axios'

const baseUrl = 'https://localhost:7187/'

//WMS
export async function GetAllItems() {
    return await axios.get(baseUrl + 'WMS/GetAllItems/')
}
export async function GetAllLocations() {
    return await axios.get(baseUrl + 'WMS/GetAllLocations/')
}
export async function GetAllContainers() {
    return await axios.get(baseUrl + 'WMS/GetAllContainers/')
}
export async function GetAllOrders() {
    return await axios.get(baseUrl + 'WMS/GetAllOrders/')
}
export async function GetItemById(id) {
    return await axios.get(baseUrl + 'WMS/GetItemById/' + id)
}
export async function GetLocationById(id) {
    return await axios.get(baseUrl + 'WMS/GetLocationById/' + id)
}
export async function GetContainerById(id) {
    return await axios.get(baseUrl + 'WMS/GetContainerById/' + id)
}
export async function GetOrderById(id) {
    return await axios.get(baseUrl + 'WMS/GetOrderById/' + id)
}
export async function GetNextOrderByStatus(status) {
    return await axios.get(baseUrl + 'WMS/GetNextOrderByStatus/' + status)
}

export async function PrintQRCode(objectToRegister) {
    return await axios.post(baseUrl + 'WMS/PrintQRCode/', objectToRegister)
}
export async function RegisterWarehouseObject(objectToRegister) {
    return await axios.post(baseUrl + 'WMS/RegisterWarehouseObject', objectToRegister)
}
export async function UpdateItem(item) {
    return await axios.post(baseUrl + 'WMS/UpdateItem', item)
}
export async function UpdateItemSelectForPutaway(itemId) {
    return await axios.post(baseUrl + 'WMS/UpdateItemSelectForPutaway/' + itemId)
}
export async function UpdateItemPutInLocation(itemId, locationId) {
    return await axios.post(baseUrl + 'WMS/UpdateItemPutInLocation/' + itemId + '/' + locationId)
}
export async function UpdateItemPick(itemId, containerId) {
    return await axios.post(baseUrl + 'WMS/UpdateItemPick/' + itemId + '/' + containerId)
}
export async function UpdateLocation(location) {
    return await axios.post(baseUrl + 'WMS/UpdateLocation', location)
}
export async function UpdateContainer(container) {
    return await axios.post(baseUrl + 'WMS/UpdateContainer', container)
}
export async function UpdateOrder(order) {
    return await axios.post(baseUrl + 'WMS/UpdateOrder', order)
}

//Order
export async function RegisterOrder(newOrderItems) {
    return await axios.post(baseUrl + 'Order/RegisterOrder/', newOrderItems)
}

//EventTypes
export async function GetAllEventTypes() {
    return await axios.get(baseUrl + 'EventTypes/GetAllEventTypes/')
}

//Other
export async function GetPutawayLocation() {
    return await axios.get(baseUrl + 'Putaway/GetPutawayLocation')
}
export async function PickItem(item) {
    return await axios.post(baseUrl + 'Pick/PickItem/', item)
}


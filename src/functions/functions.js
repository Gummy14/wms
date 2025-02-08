import axios from 'axios'

const baseUrl = 'https://localhost:7187/'

//Item
export async function GetAllItems() {
    return await axios.get(baseUrl + 'Item/GetAllItems/')
}
export async function GetItemById(id) {
    return await axios.get(baseUrl + 'Item/GetItemById/' + id)
}

//Location
export async function GetAllLocations() {
    return await axios.get(baseUrl + 'Location/GetAllLocations/')
}
export async function GetLocationById(id) {
    return await axios.get(baseUrl + 'Location/GetLocationById/' + id)
}

//Container
export async function GetAllContainers() {
    return await axios.get(baseUrl + 'Container/GetAllContainers/')
}
export async function GetContainerById(id) {
    return await axios.get(baseUrl + 'Container/GetContainerById/' + id)
}

//Order
export async function GetAllOrders() {
    return await axios.get(baseUrl + 'Order/GetAllOrders/')
}
export async function GetOrderById(id) {
    return await axios.get(baseUrl + 'Order/GetOrderById/' + id)
}
export async function GetNextOrderWaitingForPicking() {
    return await axios.get(baseUrl + 'Order/GetNextOrderWaitingForPicking/' + status)
}
export async function RegisterOrder(newOrderItems) {
    return await axios.post(baseUrl + 'Order/RegisterOrder/', newOrderItems)
}
export async function UpdateOrderSelectForPicking(orderId) {
    return await axios.post(baseUrl + 'Order/UpdateOrderSelectForPicking/' + orderId)
}

//Putaway
export async function GetPutawayLocation() {
    return await axios.get(baseUrl + 'Putaway/GetPutawayLocation')
}
export async function UpdateItemSelectForPutaway(itemId) {
    return await axios.post(baseUrl + 'Putaway/UpdateItemSelectForPutaway/' + itemId)
}
export async function UpdateItemPutInLocation(itemId, locationId) {
    return await axios.post(baseUrl + 'Putaway/UpdateItemPutInLocation/' + itemId + '/' + locationId)
}

//Pick
export async function UpdateItemSelectForPick(itemId) {
    return await axios.post(baseUrl + 'Pick/UpdateItemSelectForPick/' + itemId)
}
export async function UpdateItemPick(itemId, containerId) {
    return await axios.post(baseUrl + 'Pick/UpdateItemPick/' + itemId + '/' + containerId)
}

//WMS
export async function PrintQRCode(objectToRegister) {
    return await axios.post(baseUrl + 'WMS/PrintQRCode/', objectToRegister)
}

//EventTypes
export async function GetAllEventTypes() {
    return await axios.get(baseUrl + 'EventTypes/GetAllEventTypes/')
}

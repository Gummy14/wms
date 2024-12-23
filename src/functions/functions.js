import axios from 'axios'

const baseUrl = 'https://localhost:7187/'

//WMS
export async function GetAllItems() {
    return await axios.get(baseUrl + 'WMS/GetAllItems/')
}
export async function GetAllLocations() {
    return await axios.get(baseUrl + 'WMS/GetAllLocations/')
}
export async function GetAllOrders() {
    return await axios.get(baseUrl + 'WMS/GetAllOrders/')
}
export async function GetItemById(objectId) {
    return await axios.get(baseUrl + 'WMS/GetItemById/' + objectId)
}
export async function GetLocationById(objectId) {
    return await axios.get(baseUrl + 'WMS/GetLocationById/' + objectId)
}
export async function GetOrderById(objectId) {
    return await axios.get(baseUrl + 'WMS/GetOrderById/' + objectId)
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
export async function UpdateLocation(location) {
    return await axios.post(baseUrl + 'WMS/UpdateLocation', location)
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


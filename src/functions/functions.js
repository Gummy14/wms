import axios from 'axios'

const baseUrl = 'https://localhost:7187/'

//WMS
export async function GetAllWarehouseObjects() {
    return await axios.get(baseUrl + 'WMS/GetAllWarehouseObjects/')
}
export async function GetAllWarehouseObjectsByType(objectType) {
    return await axios.get(baseUrl + 'WMS/GetAllWarehouseObjectsByType/' + objectType)
}
export async function GetWarehouseObjectById(objectId) {
    return await axios.get(baseUrl + 'WMS/GetWarehouseObjectById/' + objectId)
}
export async function GetWarehouseParentObjectWithChildrenByParentId(parentObjectId) {
    return await axios.get(baseUrl + 'WMS/GetWarehouseParentObjectWithChildrenByParentId/' + parentObjectId)
}
export async function PrintQRCode(objectToRegister) {
    return await axios.post(baseUrl + 'WMS/PrintQRCode/', objectToRegister)
}
export async function RegisterObject(objectToRegister) {
    return await axios.post(baseUrl + 'WMS/RegisterObject', objectToRegister)
}
export async function UpdateWarehouseObject(warehouseObject) {
    return await axios.post(baseUrl + 'WMS/UpdateWarehouseObject', warehouseObject)
}

//Order
export async function GetAllOrders() {
    return await axios.get(baseUrl + 'Order/GetAllOrders/')
}
export async function GetOrderById(orderId) {
    return await axios.get(baseUrl + 'Order/GetOrderById/' + orderId)
}
export async function GetNextOrderByStatus(orderStatus) {
    return await axios.get(baseUrl + 'Order/GetNextOrderByStatus/' + orderStatus)
}
export async function GetOrderByContainerId(containerId) {
    return await axios.get(baseUrl + 'Order/GetOrderByContainerId/' + containerId)
}
export async function RegisterOrder(newOrderItems) {
    return await axios.post(baseUrl + 'Order/RegisterOrder/', newOrderItems)
}
export async function UpdateOrderDetail(orderDetail) {
    return await axios.post(baseUrl+ 'Order/UpdateOrderDetail/', orderDetail)
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


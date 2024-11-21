import axios from 'axios'

const baseUrl = 'https://localhost:7187/'

//Item
export async function GetItemById(itemId) {
    return await axios.get(baseUrl + 'Item/GetItemById/' + itemId)
}
export async function GetAllItems() {
    return await axios.get(baseUrl + 'Item/GetAllItems/')
}
export async function RegisterItem(itemToRegister) {
    return await axios.post(baseUrl + 'Item/RegisterItem', itemToRegister)
}
export async function UpdateItem(item) {
    return await axios.post(baseUrl + 'Item/UpdateItem', item)
}

//Container
export async function GetContainerById(containerId) {
    return await axios.get(baseUrl + 'Container/GetContainerById/' + containerId)
}
export async function GetContainerDetailById(containerId) {
    return await axios.get(baseUrl + 'Container/GetContainerDetailById/' + containerId)
}
export async function RegisterContainer(containerToRegister) {
    return await axios.post(baseUrl + 'Container/RegisterContainer', containerToRegister)
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

import ApiService from './ApiService'

export async function apiGetWishList(data) {
    return ApiService.fetchData({
        url: "/api/messages/getAllMessages",
        method: 'get',
        data,
    })
}

//Dont understand need to change this

export async function apiCreateWish(data) {
    return ApiService.fetchData({
        url: '/api/messages/createMessage',
        method: 'post',
        data,
    })
}


export async function apiUpdateWish(id, data) {
    return ApiService.fetchData({
        url: `/api/messages/updateMessage/${id}`, // Append the ID to the URL
        method: "put", // Use 'put' for updates
        data, // Pass the rest of the data
    });
}
export async function apiAchieveWish(id, data) {
    return ApiService.fetchData({
        url: `/api/messages/achieve/${id}`, // Append the ID to the URL
        method: "put", // Use 'put' for updates
        data, // Pass the rest of the data
    });
}


// Function to delete a wish
export async function apiDeleteWish(id, role) {
    return ApiService.fetchData({
        url: `/api/messages/deleteMessage/${id}`,
        method: 'delete', // HTTP DELETE method
        data: { role },   // Include role in the request body
    });
}

// Function to get one particular wish
export async function apiGetOneWish(id) {
    return ApiService.fetchData({
        url: `/api/messages/getMessage/${id}`,
        method: 'get', // Use 'get' for fetching details
    });
}

export async function apiPutReact(id, data) {
    return ApiService.fetchData({
        url: `/api/messages/reacted/${id}`,
        method: 'put',
        data,
    });
}
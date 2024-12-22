import ApiService from './ApiService'

export async function apiGetAchievedWishList(data) {
    return ApiService.fetchData({
        url: "/api/messages/achieved",
        method: 'get',
        data,
    })
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
import axios from 'axios'
// import appConfig from '../configs/app.config'
// import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '../constants/api.constant'
// import { PERSIST_STORE_NAME } from '../constants/app.constant'
// import { onSignOutSuccess } from '../store/auth/sessionSlice'


const BaseService = axios.create({
  timeout: 60000,
  baseURL: 'https://wishlist-backend-2.onrender.com',
  // https://property-s62m.onrender.com
})
//"https://e0cb-2409-4081-2b1b-25fd-1155-886f-3a56-3fc7.ngrok-free.app"
BaseService.interceptors.request.use(
  (config) => {
    const rawPersistData = localStorage.getItem('token')
    // //console.log("rawPersistData", rawPersistData);

    // //console.log("persistData", rawPersistData);

    let accessToken = rawPersistData ? rawPersistData : null

    // // //console.log(accessToken);
    // // if (accessToken) {
    config.headers['authorization'] = `Bearer ${accessToken}`

    // }
    // config.headers["apikey"] = "FRNu754#SMk)8BerWc5YcAdPs1!3bCispTyN";
    config.headers['Content-Type'] = 'application/json'

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

BaseService.interceptors.response.use(
  (response) => {
    if (response.data.code === 403) {
      localStorage.removeItem('UserData')
      localStorage.removeItem('authentication')
      window.location.href = '/login'
    }
    //console.log(response.data);
    return response
  },
  (error) => {


    // if (response && unauthorizedCode.includes(response.status)) {
    //   store.dispatch(onSignOutSuccess());
    // }

    return Promise.reject(error)
  }
)

export default BaseService

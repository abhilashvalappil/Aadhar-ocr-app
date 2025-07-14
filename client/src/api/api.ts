import API from "./axiosInstance"

export const fetchDataFromAadharPhotos = async(formData: FormData) => {
    try { 
        const response = await API.post('/aadhaar',formData)
        console.log('hellooooooooo',response.data)
        return response.data;
    } catch (error) {
        console.error(error)
    }
}
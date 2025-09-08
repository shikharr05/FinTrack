import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    //append the image file to form data
    formData.append('image', imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', //set header for file uplaod
            },
        });
        return response.data;

    } catch(err) {
        console.error('Error Uploading the image: ', err);
        throw err; //rethroow error for handling
    }
};

export default uploadImage;
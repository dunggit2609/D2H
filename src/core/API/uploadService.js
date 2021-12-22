import axiosClient from "./axiosClient";
import axios from 'axios'

const url = "/api/upload/cloudinary-upload";


const uploadService = {

uploadToServer(fileToUpload)  {
    return axiosClient.post(fileToUpload)
}
 
};

export default uploadService;

/* eslint-disable prettier/prettier */
import axios from "axios";

const httpInstance=axios.create({
    // eslint-disable-next-line prettier/prettier
    baseURL:'http://localhost:4000'
})
// eslint-disable-next-line prettier/prettier
export default httpInstance;
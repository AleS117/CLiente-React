import axios from "axios";

const clienteAxios=axios.create({
    //baseURL:"https://rest-mongodb-pzds.onrender.com/"
    baseURL:"http://localhost:3002"
})

export default clienteAxios
import axios from 'axios'

const url='http://localhost:3000/getAllEmployeeInfo'

class GetAllEmployeeInfo{
    getAllEmployeeInfo(){
        return axios.get(url);
    }
}

export default new GetAllEmployeeInfo()
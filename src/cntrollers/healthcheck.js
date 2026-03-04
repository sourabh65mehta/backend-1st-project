import {Apiresponse} from "../utils/api-response"

const healthcheck = {
    try {
        res
           .status(200)
           .json(new Apiresponse(200,{meassgae: server is good}))
    } catch (error) {
        
    }
}

export {healthcheck}
class Apiresponse{
    constructor(statuscode,data,message = "sucess"){
        this.statuscode= statuscode;
        this.data = data;
        this.message = meassage
        this.sucess = statuscode<400
    }
}

export {Apiresponse};
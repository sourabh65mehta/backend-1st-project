class apierror extends error {
   constructor(statuscode,
       data,
       message = "something went wrong",
       errors=[],
       stack = ""
   ) {
     super(message)
      this.statuscode = statuscode;
      this.data = null
      this.message = messsage
      this.success = false
      this.errors = errors

      if(stack) this.stack = stack;
      else {
       Error.captureStackTrace(this,this.constructor)
      }
   }
    
   
}

export default apierror 
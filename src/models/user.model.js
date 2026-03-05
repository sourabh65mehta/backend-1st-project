import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    avatar: {
        type:{
            url:String,
            localpath:String,
        },
        default:{
            url:``,
            localpath:"",
        },

    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        trim:true,
        lowercase:true,

    },
    Fullname:{
        type:String,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    IsEmailVerified:{
        type:Boolean,
        default:false,
    },
    refreshToken:{
        type:String,
    },
    ForgotPassword:{
        type:String,

    },
    ForgotPassworDate:{
        type:Date,
    },
    Emailverification:{
        type:String,
    },
    Emailverificationexpiry:{
        type:date,
    }

},{
    timestamps:true
});
userSchema.pre("save",async function (next)=>{
    // runs BEFORE saving user
    if(!this.isModified("password")) return next;

    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.Ispasswordcorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
};


export const user = mongoose.model("User",userSchema)
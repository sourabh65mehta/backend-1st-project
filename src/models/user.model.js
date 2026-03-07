import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"

// Define the User schema (shape of each user document in MongoDB)
const userSchema = new Schema({
    // Avatar object stores hosted URL and local file path
    avatar: {
        type:{
            url:String,
            localpath:String,
        },
        // Default empty avatar values
        default:{
            url:``,
            localpath:"",
        },

    },
    // Unique username, normalized to lowercase, indexed for faster lookup
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    // Unique email, required and normalized
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        trim:true,
        lowercase:true,

    },
    // Optional display name
    Fullname:{
        type:String,
        trim:true,
    },
    // Hashed password will be stored here
    password:{
        type:String,
        required:[true,"password is required"],
    },
    // Email verification flag
    IsEmailVerified:{
        type:Boolean,
        default:false,
    },
    // Stores refresh token for session renewal
    refreshToken:{
        type:String,
    },
    // Hashed forgot-password token
    ForgotPassword:{
        type:String,

    },
    // Forgot-password token expiry timestamp
    ForgotPassworDate:{
        type:Date,
    },
    // Hashed email verification token
    Emailverification:{
        type:String,
    },
    // Email verification token expiry
    Emailverificationexpiry:{
        type:Date,
    }

},{
    // Adds createdAt and updatedAt automatically
    timestamps:true
});

// Hash password before saving, only if password was changed
userSchema.pre("save",async function (next) => {
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password,10)
});

// Compare plain password with stored hashed password
userSchema.methods.Ispasswordcorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
};

// Create short-lived access token with user identity claims
userSchema.methods.generateAccesstoken  = function () {
   return jwt.sign(
        {
            _id:this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    );
};

// Create long-lived refresh token (minimal payload)
userSchema.methods.generateRefreshtoken  = function () {
   return jwt.sign(
        {
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    );
};


// Generate raw token + hashed version + expiry (used for email/forgot-password flows)
userSchema.methods.generatetemporarytoken = function () {
     const unHashedToken = crypto.randomBytes(25).toString("hex");

     const hashedToken = crypto
                   .createHash("sha256")
                   .update(unHashedToken)
                   .digest("hex")

    const TokenExpiry = Date.now() + 20*60*1000 
    return {unHashedToken,hashedToken,TokenExpiry};
};


// Export User model based on userSchema
export const user = mongoose.model("User",userSchema)

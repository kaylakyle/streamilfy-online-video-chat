import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    //login page info
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    //onboarding page info
    bio: {
        type: String,
        default: '',
    },
    profilePic: {
        type: String,
        default: '',
    },
    nativeLanguage: {
        type: String,
        default: '',
    },
    learningLanguage: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
    isOnboarded: {
        type: Boolean,
        default: false,
    },
    friends : [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
   ],
}, { timestamps: true });

// Hash password before saving creating a pre hook
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
       (error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
    return isPasswordCorrect;
}

// Compare passwordmethod

//MODEL OF THE SCHEMA
const User = mongoose.model('User', userSchema);
export default User;
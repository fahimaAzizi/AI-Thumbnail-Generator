import mongoose from 'mongoose';


export interface Iuser extends Document{
    name: string;
    email: string;
    password?:string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<Iuser>({
    name: {type: String , required : true, trim: true},
    email: {type: String , required : true, trim: true, unique : true,
        lowercase : true},
    
 
 
} ,{Timestamp: true})

const User = mongoose.models.User || mongoose.mpdel<Iuser>('User',
    userSchema)

    export default User;
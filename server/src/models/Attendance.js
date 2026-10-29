import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},date:{type:String,required:true},checkIn:{type:Date,default:Date.now},note:{type:String,default:'',maxlength:250}},{timestamps:true});schema.index({user:1,date:1},{unique:true});export default mongoose.model('Attendance',schema);

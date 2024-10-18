import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    
  },
  dateOfBirth: {
    type: Date,
   
  },
  address:{
    type: String,
  
  },
  contactNo: {
    type: Number,
    require: true
  },
  email:{
    type: String,
    require: true
   } ,
  password: {
    type: String,
    require: true,
    min: 8,
},
  feesPaid: {
    type: Boolean,
    default: false
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
});

export default mongoose.model('Student', studentSchema);

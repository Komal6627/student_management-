import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address:{
    type: String,
    require: true
  },
  contactNo: {
    type: Number,
    require: true
  },
  email:{
    type: String
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
  }
});

export default mongoose.model('Student', studentSchema);

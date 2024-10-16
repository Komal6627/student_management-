import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
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
    required: true
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
  salary: {
    type: Number,
  },
});

export default mongoose.model('admin', adminSchema);

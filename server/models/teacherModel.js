import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
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
    required: true
  },
  assignedClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }
});

export default mongoose.model('Teacher', teacherSchema);

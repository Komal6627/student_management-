import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'teacher', // Default type
},
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
    required: false
  },
  assignedClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }
});

export default mongoose.model('Teacher', teacherSchema);

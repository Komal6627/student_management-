import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
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
  contactNo: {
    type: Number,
    required: true
  },
   email:{
    type: String
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

import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false
  },
  studentFees: {
    type: Number,
    required: true
  },
  studentList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

// Apply validation to the whole `studentList` array
classSchema.path('studentList').validate(function (val) {
  return val.length <= 70;
}, 'Exceeds the limit of 70 students');

export default mongoose.model('Class', classSchema);

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
    required: true
  },
  studentFees: {
    type: Number,
    required: true
  },
  studentList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    validate: [arrayLimit, 'Exceeds the limit of 70 students']
  }]
});

function arrayLimit(val) {
  return val.length <= 70; 
}

export default mongoose.model('Class', classSchema);

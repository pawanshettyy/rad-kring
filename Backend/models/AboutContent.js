const mongoose = require('mongoose');

const aboutContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: [true, 'Section is required'],
    enum: ['hero', 'mission', 'vision', 'values', 'team-intro', 'history', 'achievements'],
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  subtitle: {
    type: String,
    trim: true,
    maxlength: [300, 'Subtitle cannot exceed 300 characters']
  },
  image: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metadata: {
    backgroundColor: String,
    textColor: String,
    layout: {
      type: String,
      enum: ['left', 'right', 'center', 'full-width'],
      default: 'center'
    }
  }
}, {
  timestamps: true
});

// Index for ordering and filtering
aboutContentSchema.index({ section: 1 });
aboutContentSchema.index({ order: 1 });
aboutContentSchema.index({ isActive: 1 });

module.exports = mongoose.model('AboutContent', aboutContentSchema);

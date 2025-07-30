const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
  version: {
    type: String,
    required: [true, 'Version is required'],
    unique: true,
    default: '1.0'
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    default: 'Privacy Policy'
  },
  lastUpdated: {
    type: Date,
    required: [true, 'Last updated date is required'],
    default: Date.now
  },
  effectiveDate: {
    type: Date,
    required: [true, 'Effective date is required'],
    default: Date.now
  },
  sections: [{
    heading: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    order: {
      type: Number,
      required: true
    }
  }],
  contactInfo: {
    email: {
      type: String,
      default: 'privacy@radkringaviation.com'
    },
    address: {
      type: String,
      default: 'Aviation Hub, India'
    },
    phone: {
      type: String,
      default: '+91 (555) 123-4567'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  complianceRegions: [{
    type: String,
    enum: ['GDPR', 'CCPA', 'PIPEDA', 'LGPD', 'India-PDPB']
  }]
}, {
  timestamps: true
});

// Index for version and active status
privacyPolicySchema.index({ version: 1 });
privacyPolicySchema.index({ isActive: 1 });
privacyPolicySchema.index({ effectiveDate: -1 });

module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);

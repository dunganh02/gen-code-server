"use strict";

var mongoose = require('mongoose');
var arContentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  modelPath: {
    type: String,
    required: true
  },
  modelType: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  scale: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    z: {
      type: Number,
      required: true
    }
  },
  position: {
    x: {
      type: Number,
      "default": 0
    },
    y: {
      type: Number,
      "default": 0
    },
    z: {
      type: Number,
      "default": 0
    }
  },
  rotation: {
    x: {
      type: Number,
      "default": 0
    },
    y: {
      type: Number,
      "default": 0
    },
    z: {
      type: Number,
      "default": 0
    }
  }
});
module.exports = mongoose.model('ARContent', arContentSchema);
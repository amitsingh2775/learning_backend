const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  watchedIntervals: { type: [[Number]], default: [] }, // e.g., [[0, 10], [20, 40]]
  lastWatchedPosition: { type: Number, default: 0 },
  videoDuration: { type: Number, required: true },
  percentWatched: { type: Number, default: 0 }, // Add this to store the calculated progress
}, { timestamps: true });

// Calculate the watched percentage based on watched intervals
progressSchema.methods.calculateProgress = function () {
  const totalWatchedTime = this.watchedIntervals.reduce((acc, [start, end]) => acc + (end - start), 0);
  const progress = Math.min((totalWatchedTime / this.videoDuration) * 100, 100);
  this.percentWatched = progress;
  return progress;
};

module.exports = mongoose.model('Progress', progressSchema);

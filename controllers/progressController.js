const Progress = require('../models/Progress');
const mergeIntervals = require('../utils/mergeIntervals');

// Save progress and calculate percentage
exports.saveProgress = async (req, res) => {
  const { userId, videoId, newInterval, currentTime, videoDuration } = req.body;

  try {
    let progress = await Progress.findOne({ userId, videoId });

    if (!progress) {
      progress = new Progress({
        userId,
        videoId,
        watchedIntervals: [newInterval],
        lastWatchedPosition: currentTime,
        videoDuration,
      });
    } else {
      const mergedIntervals = mergeIntervals([...progress.watchedIntervals, newInterval]);
      progress.watchedIntervals = mergedIntervals;
      progress.lastWatchedPosition = currentTime;
    }

    progress.calculateProgress();
    await progress.save();

    res.status(200).json({
      watchedIntervals: progress.watchedIntervals,
      lastWatchedPosition: progress.lastWatchedPosition,
      percentWatched: progress.percentWatched.toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get the progress of a user for a specific video
exports.getProgress = async (req, res) => {
  const { userId, videoId } = req.params;

  try {
    const progress = await Progress.findOne({ userId, videoId });
    if (!progress) return res.status(404).json({ message: 'No progress found' });

    progress.calculateProgress();

    res.status(200).json({
      lastWatchedPosition: progress.lastWatchedPosition,
      percentWatched: progress.percentWatched.toFixed(2),
      watchedIntervals: progress.watchedIntervals,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reset progress for a specific user and video
exports.resetProgress = async (req, res) => {
  const { userId, videoId } = req.body;

  try {
    let progress = await Progress.findOne({ userId, videoId });
    if (!progress) return res.status(404).json({ message: 'No progress found' });

    // Reset progress fields
    progress.watchedIntervals = [];
    progress.lastWatchedPosition = 0;
    progress.percentWatched = 0;

    await progress.save();

    res.status(200).json({ message: 'Progress reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
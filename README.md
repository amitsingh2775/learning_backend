# 🎥 Unique Video Watch Time Tracker

This project tracks all the intervals a user watches a video and calculates the **total unique time** watched by merging overlapping intervals. It ensures that even if the same portion is watched multiple times, the watch time is only counted once.

---

##  Features

-  Track watched video segments (`start` and `pause`)
-  Merge overlapping or repeated intervals
- Display accurate **unique watch time** in seconds
- Built using React and `react-player`

---

##  Approach

### 1. **Tracking Watched Intervals**

We use React state to store all intervals the user watched:

```js
const [watchedIntervals, setWatchedIntervals] = useState([]);

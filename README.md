

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

When the video is paused, a new interval from startTime to currentTime is pushed into the array:

```js
const newInterval = [startTime, playerRef.current.getCurrentTime()];
setWatchedIntervals([...watchedIntervals, newInterval]);


2. Merging Intervals to Avoid Double-Counting
We merge overlapping intervals using a sort and greedy algorithm:

```js
const mergeIntervals = (intervals) => {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged = [];

  for (const interval of sorted) {
    if (!merged.length || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    } else {
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        interval[1]
      );
    }
  }

  return merged;
};



After merging, we calculate the total unique progress:

```js
const calculateProgress = () => {
  const merged = mergeIntervals(watchedIntervals);
  const total = merged.reduce((sum, [start, end]) => sum + (end - start), 0);
  setProgress(total.toFixed(2));
};


Example
If a user watches these segments:

[0, 10]

[5, 20]

[30, 40]

After merging:

[0, 20]

[30, 40]

Total Unique Time Watched = 20 + 10 = 30 seconds

clone both repo
cd backend and cd frontend
npm install in both file
in backend run : npm start
in frontend run : npm run dev



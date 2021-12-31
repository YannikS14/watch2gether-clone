import { useState, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player/lazy';
import screenfull from 'screenfull';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [currentVideo, setCurrentVideo] = useState(
    'https://www.youtube.com/watch?v=ufLCnrYcXzI&ab_channel=DIYHuntress',
  );
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  // const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [seeking, setSeeking] = useState(false);

  const reactPlayer = useRef(null);

  const handleClickFullscreen = () =>
    screenfull.request(findDOMNode(reactPlayer.current));

  const handleDuration = (videoDuration) =>
    setDuration(videoDuration);

  const handleStop = () => {
    setCurrentVideo('');
    setIsPlaying(false);
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleVolumeChange = (e) =>
    setVolume(parseFloat(e.target.value));

  const handleSetPlaybackRate = (e) =>
    setPlaybackRate(parseFloat(e.target.value));

  const handleOnPlaybackRateChange = (speed) =>
    setPlaybackRate(parseFloat(speed));

  const handlePlay = () => setIsPlaying(true);

  const handlePause = () => setIsPlaying(false);

  const handleProgress = ({ played }) =>
    !seeking ? setPlayed(played) : null;

  const handleSeekMouseDown = () => setSeeking(true);

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    reactPlayer.current.seekTo(parseFloat(e.target.value));
  };

  const handleSeekChange = (e) =>
    setPlayed(parseFloat(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ReactPlayer.canPlay(videoUrl)) return setHasError(true);

    setCurrentVideo(videoUrl);
    setVideoUrl('');
  };

  const handleChange = (e) => {
    setHasError(false);
    setVideoUrl(e.target.value);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Watch2Gether Clone
      </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleChange(e)}
          value={videoUrl}
          className="mr-4 border-2 border-gray-700 rounded"
        />
        {hasError && (
          <span className="text-red-500 mr-4">Wrong Video URL</span>
        )}
        <button
          type="submit"
          className="px-2 py-1 border-2 border-gray-700 rounded"
        >
          Submit
        </button>
      </form>
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          ref={reactPlayer}
          url={currentVideo}
          width="100%"
          height="100%"
          playbackRate={playbackRate}
          playing={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onPlaybackRateChange={handleOnPlaybackRateChange}
          onDuration={handleDuration}
          onProgress={handleProgress}
          volume={volume}
        />
      </div>
      <div>
        <div>
          <button
            className="px-2 py-1 border-2 border-gray-700 rounded m-2"
            onClick={handlePlayPause}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            className="px-2 py-1 border-2 border-gray-700 rounded m-2"
            onClick={handleStop}
          >
            Stop
          </button>
          <button
            className="px-2 py-1 border-2 border-gray-700 rounded m-2"
            onClick={handleClickFullscreen}
          >
            Fullscreen
          </button>
        </div>
        <div>
          <span className="pr-2">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <div>
          <span className="pr-2">Seek</span>
          <input
            className="mr-2"
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onChange={handleSeekChange}
          />
          <span>
            {Math.floor((played * duration) / 60)}:
            {Math.floor((played * duration) % 60)
              .toString()
              .padStart(2, '0')}
          </span>
          <span> / </span>
          <span>
            {Math.floor(duration / 60)}:
            {(duration % 60).toString().padStart(2, '0')}
          </span>
        </div>
        <div>
          <span className="pr-2">Playback rate</span>
          <button
            className="px-2 py-1 border-2 border-gray-700 rounded m-2"
            onClick={handleSetPlaybackRate}
            value={1}
          >
            1x
          </button>
          <button
            className="px-2 py-1 border-2 border-gray-700 rounded m-2"
            onClick={handleSetPlaybackRate}
            value={1.5}
          >
            1.5x
          </button>
          <button
            className="px-2 py-1 border-2 border-gray-700 rounded m-2"
            onClick={handleSetPlaybackRate}
            value={2}
          >
            2x
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

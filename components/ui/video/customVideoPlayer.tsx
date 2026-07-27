'use client'
import { useRef, useState } from 'react'
import styles from './videoPlayer.module.css'

export default function CustomVideoPlayer(Url: any) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')

  const togglePlay = () => {
    const video = videoRef.current!
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current!
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current!
    const percent = (video.currentTime / video.duration) * 100
    setProgress(percent)
    setCurrentTime(formatTime(video.currentTime))
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current!
    setDuration(formatTime(video.duration))
  }

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current!
    const time = (Number(e.target.value) / 100) * video.duration
    video.currentTime = time
  }

  return (
    <div className={styles.playerContainer}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          src={Url.Url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className={styles.video}
        />
        <div className={styles.playButtonOverlay} onClick={togglePlay}>
          {!isPlaying && (
            <button aria-label={isPlaying ? "Pause video" : "Play video"} className={styles.playButton}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.progressContainer}>
          <input
            aria-label="range video"
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={seek}
            className={styles.progressBar}
          />
        </div>

        <div className={styles.controlButtons}>
          <div className={styles.leftControls}>
            <button onClick={togglePlay} className={styles.button} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button onClick={toggleMute} className={styles.button} title={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C23.16 14.74 24 13.48 24 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            <span className={styles.timeDisplay}>
              {currentTime} / {duration}
            </span>
          </div>

          <button className={styles.button} title="Fullscreen">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
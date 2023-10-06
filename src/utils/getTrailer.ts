import { VideoResult } from '../types/tmdbTypes';

export const getTrailer = (videos: VideoResult[]): string => {
  const video = videos.find(video => (video.type = 'Trailer'))!;
  return `https://www.youtube.com/watch?v=${video.key}`;
};

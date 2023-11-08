import { VideoResult } from '../interfaces/tmdbInterfaces';

export const getTrailer = (videos: VideoResult[]): string => {
  const video = videos.find(video => (video.type = 'Trailer'))!;
  return `https://www.youtube.com/watch?v=${video.key}`;
};

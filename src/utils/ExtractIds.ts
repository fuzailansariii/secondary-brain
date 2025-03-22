const extractYouTubeId = (url: string) => {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const extractTweetId = (url: string) => {
  const regex = /status\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export { extractYouTubeId, extractTweetId };

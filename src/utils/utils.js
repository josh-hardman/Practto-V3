export const toRem = size => `${(size / 16).toFixed(5)}rem`;

export const youtubeEmbedUrl = watchUrl =>
  watchUrl && watchUrl.replace("watch", "embed");

export const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  if (path.startsWith('/')) {
    return `${base.replace(/\/$/, '')}${path}`;
  }
  return path;
};

export const resolveProjectImageUrl = (src) =>
  /^https?:\/\//i.test(src)
    ? src
    : `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;

export const img = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

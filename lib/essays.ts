export type Essay = {
  slug: string;
  title: string;
};

export const ESSAYS: Essay[] = [];

export const LATEST_ESSAYS = ESSAYS.slice(0, 4);

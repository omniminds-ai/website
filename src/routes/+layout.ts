import { browser } from '$app/environment';

export const load = async () => {
  if (browser) {
    // Do nothing
  }
  return;
};

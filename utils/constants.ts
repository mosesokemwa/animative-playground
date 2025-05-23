const BEST_CUISINE = "Italian";
export const ICON_SIZE = 30;

export const Cuisines = new Array(20)
  .fill(BEST_CUISINE)
  .map((cuisine, index) => ({
    id: index,
    name: cuisine,
    selected: false,
  }));

export const ACTIVE_COLOR = "#EF8E52";
export const INACTIVE_COLOR = "#B3B1B4";
export const DOTS_ACTIVE_COLOR = "#66E070";

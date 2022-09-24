// to set pagination configs
const SET_PAGINATION_CONFIGS = (coins) => {
  return { type: "SET_PAGINATION_CONFIGS", payload: coins };
};

// to go to next page
const NEXT_PAGE = () => {
  return { type: "NEXT_PAGE" };
};

// to go to prev page
const PREV_PAGE = () => {
  return { type: "PREV_PAGE" };
};

// to go to the selected page based on the page number
const CHANGE_PAGE = page => {
  return { type: "CHANGE_PAGE", payload: page };
};

export { SET_PAGINATION_CONFIGS, NEXT_PAGE, PREV_PAGE, CHANGE_PAGE };
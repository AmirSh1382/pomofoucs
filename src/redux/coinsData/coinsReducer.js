const initialState = {
  loading: false,
  coins: [],
  error: "",
};

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_COINS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_ALL_COINS_SUCCESS":
      return {
        ...state,
        loading: false,
        coins: action.payload,
      };

    case "GET_ALL_COINS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default coinsReducer;
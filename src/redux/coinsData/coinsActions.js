import axios from "axios";

// To return requseting status action
const GET_ALL_COINS_REQUEST = () => {
  return { type: "GET_ALL_COINS_REQUEST" };
};

// To return success status action
const GET_ALL_COINS_SUCCESS = (coins) => {
  return { type: "GET_ALL_COINS_SUCCESS", payload: coins };
};

// To return failure status action
const GET_ALL_COINS_FAILURE = (error) => {
  return { type: "GET_ALL_COINS_FAILURE", payload: error };
};

// to send request to API
const getAllCoins = () => {
  return async (dispatch) => {
    try {
      dispatch(GET_ALL_COINS_REQUEST());

      const response = await axios.get("api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false");
      const coins = response.data;

      dispatch(GET_ALL_COINS_SUCCESS(coins));
    } catch (error) {
      dispatch(GET_ALL_COINS_FAILURE(error.message));
    }
  };
};

export { getAllCoins };
// Add a coin to watchlist based on its id
const ADD_COIN_TO_WATCHLIST = coinId => {
  return { type: "ADD_COIN_TO_WATCHLIST", payload: coinId };
};

// Remove a coin from watchlist based on its id
const REMOVE_FROM_WATCHLIST = coinId => {
  return { type: "REMOVE_FROM_WATCHLIST", payload: coinId };
};

// To get wachlist coins id from local storage
const GET_WATCHLIST_COINS_ID_FROM_LOCAL_STORAGE = () => {
  return { type: "GET_WATCHLIST_COINS_ID_FROM_LOCAL_STORAGE" }
}

// to get watchlist coins data
const GET_WATCHLIST_COINS_DATA = (allCoins, watchlistCoinsId) => {
  return { type: "GET_WATCHLIST_COINS_DATA", payload: {allCoins, watchlistCoinsId} }
}

export { ADD_COIN_TO_WATCHLIST, REMOVE_FROM_WATCHLIST }
export { GET_WATCHLIST_COINS_ID_FROM_LOCAL_STORAGE, GET_WATCHLIST_COINS_DATA };
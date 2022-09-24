const initialState = {
  coinId: "",
  error: "",
  chartData: null,
  coinData: null,
  defaultChartDate: null,
};

const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COIN_DATA_SUCCESS":
      return {
        ...state,
        coinId: action.payload.coinId,
        chartData: action.payload.chartData,
        coinData: action.payload.coinData,
        defaultChartDate: action.payload.chartData.daily,
      };

    case "GET_COIN_DATA_FAILURE":
      return {
        ...state,
        error: action.payload,
      };

    case "CHANGE_CHART_DATE_FORMAT":
      return {
        ...state,
        defaultChartDate: action.payload,
      };

    case "RESET_STATE":
      return {
        initialState,
      };

    default:
      return state;
  }
};

export default coinReducer;
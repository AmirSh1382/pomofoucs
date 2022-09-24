// Axios
import axios from "axios";

// To return success status action
const GET_COIN_DATA_SUCCESS = data => {
  return { type: "GET_COIN_DATA_SUCCESS", payload: data };
};

// To return failure status action
const GET_COIN_DATA_FAILURE = error => {
  return { type: "GET_COIN_DATA_FAILURE", payload: error };
};

// To change default time format of chart
const CHANGE_CHART_DATE_FORMAT = format => {
  return { type: "CHANGE_CHART_DATE_FORMAT", payload: format }
}

// To return reset coin state action
const RESET_STATE = () => {
  return { type: "RESET_STATE" };
};

// sending request to get coin chart data and market data from API
const getCoinDataRequest = (coinId) => {
  return async (dispatch) => {
    const dailyUrl = `api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`;
    const weeklyUrl = `api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`;
    const monthlyUrl = `api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`;
    const yearlyUrl = `api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=360`;

    const coinDetailUrl = `api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

    axios.all([
      axios.get(dailyUrl),
      axios.get(weeklyUrl),
      axios.get(monthlyUrl),
      axios.get(yearlyUrl),
      axios.get(coinDetailUrl)
    ])
    .catch(error => {
      const errorMsg = error.message;
      
      dispatch(GET_COIN_DATA_FAILURE(errorMsg));
    })
    .then(
      axios.spread(
        (
          dailyResponse,
          weeklyResponse,
          monthlyResponse,
          yearlyResponse,
          coinDetailResponse
        ) => {
          // To set chart data foramts configs (x: time, y: chart data)
          const dailyData = dailyResponse.data.prices.map(value => ({
            x: value[0],
            y: value[1].toFixed(2),
          }));
          const weeklyData = weeklyResponse.data.prices.map(value => ({
            x: value[0],
            y: value[1].toFixed(2),
          }));
          const monthlyData = monthlyResponse.data.prices.map(value => ({
            x: value[0],
            y: value[1].toFixed(2),
          }));
          const yearlyData = yearlyResponse.data.prices.map(value => ({
            x: value[0],
            y: value[1].toFixed(2),
          }));

          const chartData = {
            daily: { data: dailyData, format: "ha" },
            weekly: { data: weeklyData, format: "DD MMM" },
            monthly: { data: monthlyData, format: "MMM DD" },
            yearly: { data: yearlyData, format: "MMM YYYY" },
          };

          const coinData = coinDetailResponse.data

          const finallData = { chartData, coinData, coinId };

          dispatch(GET_COIN_DATA_SUCCESS(finallData));
        }
      )
    );
  };
};

export { getCoinDataRequest, RESET_STATE, CHANGE_CHART_DATE_FORMAT };
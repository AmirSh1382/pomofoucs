import React, { useEffect } from "react";

// Componetns
import CoinMarketData from "./CoinMarketData";
import ChartElement from "./ChartElement";
import Loading from "./Loading"

// React-router-dom
import { useParams } from "react-router-dom";

// MUI Icons
import MovingIcon from '@mui/icons-material/Moving';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Fucntions
import { isInWatchlist } from "../../helper/functions";

// React-toastify
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getCoinDataRequest } from "../../redux/coinData/coinActions";
import { RESET_STATE } from "../../redux/coinData/coinActions";
import { ADD_COIN_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from "../../redux/watchlist/watchlistActions"


const CoinDetail = () => {

  // Coin id
  const { id } = useParams();

  const dispatch = useDispatch();

  const coinState = useSelector(state => state.coinState);

  const { chartData, defaultChartDate, coinData, error } = coinState;

  const watchlistState = useSelector(state => state.watchlistState)

  useEffect(() => {
    // To scroll to top on load
    window.scrollTo({top: 0, behavior: "smooth"})

    // To remove previous coin data if it exists
    dispatch(RESET_STATE());

    // To get coin data based on its ID
    dispatch(getCoinDataRequest(id));

    // eslint-disable-next-line
  }, []);
  
  if (error) return (
    <div className="flex flex-1 items-center justify-center font-semibold">
      {error}
    </div>
  )

  if (!defaultChartDate && !chartData && !coinData) return <Loading /> ;

  const { image, market_data } = coinData

  const { current_price, price_change_percentage_24h } = market_data

  // To add a coin to watchlist
  const addToWatchlist = coinId => {
    dispatch(ADD_COIN_TO_WATCHLIST(coinId))

    toast.success(`${coinId} added to your watchlist`)
  }

  // To remove a coin from watchlist
  const removeFromWatchlist = coinId => {
    dispatch(REMOVE_FROM_WATCHLIST(coinId))

    toast.error(`${coinId} removed from watchlist`)
  }

  return (
    <div className="max-w-5xl w-full mx-auto my-10 px-3 md:px-12">
      <div className="flex items-center flex-col">
        <ToastContainer 
          toastStyle={{
            backgroundColor: "rgb(25,25,25)",
            color: "rgba(255,255,255,0.9)"
          }} 
        />

        {/* Img */}
        <img className="w-20 md:w-28" src={image.large} alt={id} />
        {/* Current price */}
        <div className="text-3xl mt-4 ">
          ${current_price.usd.toFixed(2).toLocaleString()}
        </div>
        {/* Price change percentage (24h) */}
        <div className={`${price_change_percentage_24h < 0 ? "text-rose-700" : "text-emerald-500"}
            text-lg font-semibold mt-3`
          }
        >
          {price_change_percentage_24h > 0 ? <MovingIcon /> : <TrendingDownIcon />}
          &nbsp;
          {price_change_percentage_24h.toFixed(2)}% 
          <span> (24h)</span>
        </div>
      </div>

      {/* Chart */}
      <div>
        <ChartElement />
      </div>

      {/* Watch list btn */}
      {
        <div className="max-w-5xl mx-auto px-5 py-3 text-end">
          {
            isInWatchlist(watchlistState, id) ? (
              <button 
                onClick={() => removeFromWatchlist(id)}
                className="border border-rose-700 rounded text-rose-700
                  transition during-50 hover:opacity-90 active:scale-90 py-1 px-3"
                >
                Remove From Watchlist
              </button>
            ) : (
              <button 
                onClick={() => addToWatchlist(id)}
                className="rounded text-black bg-amber-300 transition
                  during-50 hover:opacity-90 active:scale-90 py-1 px-3"
                >
                Add To Watchlist
              </button>
            )
          }
        </div>
      }

      {/* Market Data */}
      <div>
        <CoinMarketData />
      </div>

    </div>
  );
};

export default CoinDetail;
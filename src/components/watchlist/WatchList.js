import React, { useEffect } from "react";

// Components
import Coin from "../shared/Coin";

// React-router-dom
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_WATCHLIST_COINS_DATA } from "../../redux/watchlist/watchlistActions";


const WatchList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const watchlistState = useSelector(state => state.watchlistState);

  const coinsState = useSelector(state => state.coinsState);

  const { coinsId, coinsData } = watchlistState;

  useEffect(() => {
    // to avoid happening an error when refreshing the page
    !coinsState.coins.length && navigate("/spotmarket");

    // To get watchlist coins data
    dispatch(GET_WATCHLIST_COINS_DATA(coinsState.coins, coinsId));

    // eslint-disable-next-line
  }, []);

  if (!coinsData.length) return (
    <div className="flex items-center justify-center flex-col flex-1">
        <div className="text-lg font-semibold">
            Watchlist is empty !
        </div>
        <Link 
          to="/spotmarket"
          className="bg-amber-300 text-black rounded px-3 py-1 mt-3
          transition during-50 hover:opacity-90 active:scale-95"
        >
          Add coin
        </Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto w-full px-6 md:px-12 my-10">
      <div className="font-bold text-xl">
        Watchlist
      </div>

      <div className="mt-5 mb-12">
        {
          coinsData.map(coin => <Coin key={coin.id} coin={coin} />)
        }
      </div>
    </div>
  );
};

export default WatchList;
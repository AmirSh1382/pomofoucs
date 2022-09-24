import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// MUI Icons
import MovingIcon from '@mui/icons-material/Moving';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Momnet js
import moment from "moment";

const CoinMarketData = () => {

  const coinState = useSelector(state => state.coinState)

  const { market_data } = coinState.coinData

  const { 
    market_cap,
    market_cap_change_percentage_24h,
    circulating_supply, max_supply,
    market_cap_rank,
    total_supply,
    ath,
    atl,
    ath_date,
    atl_date,
    ath_change_percentage,
    atl_change_percentage,
  } = market_data

  return (
    <div className="max-w-5xl divide-y divide-stone-800 mx-auto">
        
      {/* Rank */}
      <div className="px-5 py-3">
        <div className="text-sm text-slate-400 mb-1">Rank</div>
        <div className="font-semibold">#{market_cap_rank}</div>
      </div>

      {/* Market Cap */}
      <div className="flex items-center justify-between px-5 py-3">
        <div>
          <div className="text-sm text-slate-400 mb-1">
            Market Cap
          </div>
          <div className="font-semibold">
            ${market_cap.usd.toLocaleString()}
          </div>
        </div>
        <div className={`${market_cap_change_percentage_24h < 0 ? "text-rose-700" : "text-emerald-500"}`}>
          {market_cap_change_percentage_24h > 0 ? <MovingIcon /> : <TrendingDownIcon />}
          &nbsp;
          {market_cap_change_percentage_24h.toFixed(2)}%
        </div>
      </div>

      {/* All time high */}
      <div className="flex items-center justify-between px-5 py-3">
        <div>
          <div className="text-xs md:text-sm text-slate-400 mb-1">
            All Time High 
            ({moment(ath_date.usd).format("MMMMDD,YYYY")})
          </div>
          <div className="font-semibold">
            ${ath.usd.toLocaleString()}
          </div>
        </div>
        <div className={`${ath_change_percentage.usd < 0 ? "text-rose-700" : "text-emerald-500"}`}>
          {ath_change_percentage.usd > 0 ? <MovingIcon /> : <TrendingDownIcon />}
          &nbsp;
          {ath_change_percentage.usd.toFixed(2)}%
        </div>
      </div>

      {/* All time low */}
      <div className="flex items-center justify-between px-5 py-3">
        <div>
          <div className="text-xs md:text-sm text-slate-400 mb-1">
            All Time Low 
            ({moment(atl_date.usd).format("MMMMDD,YYYY")})
          </div>
          <div className="font-semibold">
            ${atl.usd.toLocaleString()}
          </div>
        </div>
        <div className={`${atl_change_percentage.usd < 0 ? "text-rose-700" : "text-emerald-500"}`}>
          {atl_change_percentage.usd > 0 ? <MovingIcon /> : <TrendingDownIcon />}
          &nbsp;
          {atl_change_percentage.usd.toFixed(2)}%
        </div>
      </div>

      {/* Circulating supply */}
      <div className="px-5 py-3">
        <div className="text-slate-400 text-sm mb-1">Circulating Supply</div>
        <div>
          <span className="font-semibold">
            {circulating_supply.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400"> tokens</span>
        </div>
      </div>

      {/* Max supply */}
      {
        max_supply && (
          <div className="px-5 py-3">
            <div className="text-slate-400 text-sm mb-1">
              Max Supply
            </div>
            <div className="font-semibold">
              {max_supply.toLocaleString()}
            </div>
          </div>
        )
      }

      {/* Total supply */}
      {
        total_supply && (
          <div className="px-5 py-3">
            <div className="text-slate-400 text-sm mb-1">
              Total Supply
            </div>
            <div className="font-semibold">
              {total_supply.toLocaleString()}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default CoinMarketData;
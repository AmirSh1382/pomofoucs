import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_CHART_DATE_FORMAT } from "../../redux/coinData/coinActions";

// Moment js
import moment from "moment";

// React-chart-js-2
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend );

const ChartElement = () => {
  const dispatch = useDispatch();

  const coinState = useSelector(state => state.coinState);

  const { defaultChartDate, chartData, coinId } = coinState;

  const options = {
    resposnsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    interaction: {
      intersect: false,
    },
  };

  const data = {
    labels: defaultChartDate.data.map(value => moment(value.x).format(defaultChartDate.format)),
    datasets: [
      {
        fill: true,
        label: coinId,
        data: defaultChartDate.data.map(value => value.y),
        borderWidth: 2,
        borderColor: "rgb(252, 211, 77)",
        backgroundColor: "rgba(252, 211, 77, 0.37)",
      },
    ],
  };

  return (
    <div className="py-10">

      {/* Line Chart */}
      <Line options={options} data={data} />
      
      {/* Time format Btns */}
      <div className="flex justify-center rounded w-fit mt-5 mx-auto">
        <button
          className={`${ defaultChartDate.format === "ha" && "bg-amber-300 text-black" }
            border border-amber-300 text-amber-300 rounded text-md w-12 transition duration-50 
            active:scale-90 mx-2`
          }
          onClick={() => dispatch(CHANGE_CHART_DATE_FORMAT(chartData.daily))}
        >
          24h
        </button>

        <button
          className={`${ defaultChartDate.format === "DD MMM" && "bg-amber-300 text-black" }
            border border-amber-300 text-amber-300 rounded text-md w-12 transition duration-50
            active:scale-90 mx-2`
          }
          onClick={() => dispatch(CHANGE_CHART_DATE_FORMAT(chartData.weekly))}
        >
          7d
        </button>

        <button
          className={`${ defaultChartDate.format === "MMM DD" && "bg-amber-300 text-black" }
            border border-amber-300 text-amber-300 rounded text-md w-12 transition duration-50
            active:scale-90 mx-2`
          }
          onClick={() => dispatch(CHANGE_CHART_DATE_FORMAT(chartData.monthly))}
        >
          30d
        </button>

        <button
          className={`${ defaultChartDate.format === "MMM YYYY" && "bg-amber-300 text-black" }
            border border-amber-300 text-amber-300 rounded text-md w-12 transition duration-50
            active:scale-90 mx-2`
          }
          onClick={() => dispatch(CHANGE_CHART_DATE_FORMAT(chartData.yearly))}
        >
          1y
        </button>
      </div>
    </div>
  );
};

export default ChartElement;
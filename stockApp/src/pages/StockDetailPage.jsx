import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import finHub from "../apis/finHub";
import * as Components from "../components";

const formatData = (data) => {
  return data.t.map((el, i) => {
    // api menerima dalam bentuk second sedangkan default js milis
    return { x: el * 1000, y: Math.floor(data.c[i]) };
  });
};

const StockDetailPage = () => {
  const [chartData, setChartData] = useState();
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);

      // if it's saturday I neead two days of data,if it's sunday I need three (cuz on the weekend they're off):
      let oneDay;
      //if it's saturday
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      }
      //if it's sunday
      else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else if (date.getDay() === 1) {
        oneDay = currentTime - 4 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;

      // try catch :
      try {
        const responses = await Promise.all([
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        // console.log(responses);
        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
        // console.log(chartData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [symbol]);
  return (
    <div>
      {chartData && (
        <div>
          <Components.StockChart chartData={chartData} symbol={symbol} />
          <Components.StockData symbol={symbol} />
        </div>
      )}
    </div>
  );
};

// const chartData = {
//   day:"data for one day",
//   week:"data fpr a week",
//   year:"data fpr year"
// }

// const data= [{x:4,y:2,},{x:4,y:2}]

export default StockDetailPage;

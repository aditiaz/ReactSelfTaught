import { useState, useEffect } from "react";
import finHub from "../apis/finHub";
export const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState();
  let isMounted = true;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finHub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });
        // console.log(response);
        isMounted && setStockData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [symbol]);
  return (
    <div>
      {stockData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5">
          <div className="col">
            <div>
              <span className="fw-bold">name: </span>
              {stockData.name}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">country: </span>
              {stockData.country}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">ticker: </span>
              {stockData.ticker}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Exchange: </span>
              {stockData.exchange}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Industry: </span>
              {stockData.finnhubIndustry}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">IPO</span>
              {stockData.ipo}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">MarketCap: </span>
              {stockData.marketCapitalization}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Share Outstanding :</span>
              {stockData.shareOutstanding}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">url: </span>
              <a href={stockData.weburl}>{stockData.weburl}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

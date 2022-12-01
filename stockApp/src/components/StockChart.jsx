import { useState } from "react";
import Chart from "react-apexcharts";
export const StockChart = ({ chartData, symbol }) => {
  const [dateFormat, setDateFormat] = useState("24h");
  const { day, week, year } = chartData;

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const color =
    // untuk menentukan warna chart jika hasil positif hijau jika negatif merah
    // elemen terakhir diarray dikurangi elemen pertama
    determineTimeFormat()[determineTimeFormat().length - 1].y - determineTimeFormat()[0].y > 0
      ? "#26C281"
      : "#ed3419";

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  // alternative way to toggle class in buttons:
  const renderButtonSelect = (button) => {
    const classes = "btn m-1";
    return `${classes} btn-${button === dateFormat ? "primary" : "outline-primary"}`;
    // following syntax won't work :
    // return button === dateFormat ? `${classes} btn-primmary` : `${classes} btn-outline-primary `;
  };

  const series = [{ name: symbol, data: determineTimeFormat() }];
  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>
          24h
        </button>
        <button
          className={"7d" === dateFormat ? "btn m-1 btn-primary" : "btn m-1 btn-outline-primary"}
          onClick={() => setDateFormat("7d")}
        >
          7d
        </button>
        <button
          className={"1y" === dateFormat ? "btn m-1 btn-primary" : "btn m-1 btn-outline-primary"}
          onClick={() => setDateFormat("1y")}
        >
          1y
        </button>
      </div>
    </div>
  );
};

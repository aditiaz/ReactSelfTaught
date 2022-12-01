import { useState, useEffect, useContext } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import finHub from "../apis/finHub";
import { WatchListContext } from "../context/watchListContext";
import { useNavigate } from "react-router-dom";

export const StockList = () => {
  const [stock, setStock] = useState([]);
  const { watchList, deleteStock } = useContext(WatchListContext);
  const navigate = useNavigate();

  const changeColor = (change) => {
    return change > 0 ? "succes" : "danger";
  };
  const renderIcon = (change) => {
    return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  };

  useEffect(() => {
    // isMounted untuk menghindari
    // setStock ke unmounted component
    // ky jika kita fetch lg,ga mungkin kan setStock data ke
    // component yg unmounted,karena tidak akan terender
    // not dry :
    // const responses = []
    let isMounted = true;
    const fetchData = async () => {
      try {
        // const response = await finHub.get("/quote?symbol=MSFT");
        // not dry :
        //  const response1 = await finHub.get("/quote", {
        // params: {
        // symbol:GOOGL
        // }
        // })
        // responses.push(response1) di ulang sampe 3 x sesuai array watchList
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        console.log(data);
        if (isMounted) {
          // jika dapat repsonse lagi
          // dan componennya unounted ini akan cek
          // dan menskipnya(tidak me setStock)
          setStock(data);
        }
      } catch (err) {}
    };
    fetchData();
    return () => (isMounted = false);
  }, [watchList]);

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  };

  return (
    <div>
      <table className="table hover mt-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData) => {
            return (
              <tr
                style={{ cursor: "pointer" }}
                onClick={() => handleStockSelect(stockData.symbol)}
                className="table-row"
                key={stockData.symbol}
              >
                <th scope="row">{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`}>
                  {stockData.data.d}
                  {renderIcon(stockData.data.d)}
                </td>
                <td className={`text-${changeColor(stockData.data.dp)}`}>
                  {stockData.data.dp} {renderIcon(stockData.data.d)}
                </td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>
                  {stockData.data.pc}
                  <button
                    className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                    onClick={(e) =>
                      // prevent the event from buble up to the parent componet
                      {
                        e.stopPropagation();
                        deleteStock(stockData.symbol);
                      }
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

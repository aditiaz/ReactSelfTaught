import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    // when read and write to local storage they're string,so convert to array with split method
    // tanda tanya untuk menegecek jika null akan ke default(["GOOGL", ...])
    localStorage.getItem("watchList")?.split(",") || ["GOOGL", "MSFT", "AMZN"]
  );

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);

  const addStock = (stock) => {
    // jika stock index tidak ada diwatchList maka setWatchList
    watchList.indexOf(stock) === -1 && setWatchList([...watchList, stock]);
  };

  const deleteStock = (stock) => {
    setWatchList(
      watchList.filter((el) => {
        return el != stock;
      })
    );
  };

  return (
    <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
      {props.children}
    </WatchListContext.Provider>
  );
};

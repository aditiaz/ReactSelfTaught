import { useState, useEffect, useContext } from "react";
import finHub from "../apis/finHub";
import { WatchListContext } from "../context/watchListContext";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addStock } = useContext(WatchListContext);

  // merender sebuah ui which is longer i don't use this eventually:
  // const renderDropdown = () => {
  //   const dropDownClass = search ? "show" : null;
  //   return (
  //     <ul className={`dropdown-menu ${dropDownClass}`}>
  //       <li>stock1</li>
  //       <li>stock2</li>
  //       <li>stock3</li>
  //     </ul>
  //   );
  // };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finHub.get("/search", {
          params: {
            q: search,
          },
        });
        // console.log(response);
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };
    search.length > 0 ? fetchData() : setResults([]);
    return () => (isMounted = false);
  }, [search]);

  // jika tidak pakai dependency array search maka function
  // di dalam useEffect akan berjalan tiap kali komponen re renders,bukan
  // tiap kali value search berubah
  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145,158,171,0.04" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <label htmlFor="search">Search</label>
        {/* {renderDropdown()} */}
        <ul
          style={{ height: "500px", overflowY: "scroll", overflowX: "hidden", cursor: "pointer" }}
          className={search ? "dropdown-menu show" : "dropdown-menu"}
        >
          {results.map((result) => {
            return (
              <li
                onClick={() => {
                  addStock(result.symbol);
                  setSearch("");
                }}
                key={result.symbol}
                className="dropdown-item"
              >
                {result.description} ({result.symbol})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

import axios from "axios";

const TOKEN = "ce08fjaad3i6dc1ceot0ce08fjaad3i6dc1ceotg";
// lengkapnya :
// https://finnhub.io/api/v1/quote?symbol=MSFT&token=ce08fjaad3i6dc1ceot0ce08fjaad3i6dc1ceotg
// params adalah ini : &token=ce08fjaad3i6dc1ceot0ce08fjaad3i6dc1ceotg
// creates an axios instance :
export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});

import axios from "axios";
import { dateToUnix } from "../utils/utils";

export const fetchTrades = async (crypto, date) => {

  // # The date parameter is optional, so if the user doens't provide
  // one, it just fetches the newest trades for that crypto
  if (!date) {
    return axios
      .get(`https://www.mercadobitcoin.net/api/${crypto}/trades/`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // # Useful util for turning a string date to unix
  const dateInUnix = dateToUnix(date);

  return axios
    .get(`https://www.mercadobitcoin.net/api/${crypto}/trades/${dateInUnix}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

import axios from "axios";
import { dateToUnix } from "../utils/utils";

export const fetchTrades = async (crypto, date) => {
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

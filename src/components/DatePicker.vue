<script>
import axios from "axios";
import { fetchTrades } from "@/api/api";
import { todayDate, dateToUnix, bitcoinCreationDate } from "@/utils/utils";

export default {

  // # The components receives the crypto coin from the parent
  // component so it can fetch
  props: {
    cryptoCoin: {
      type: String,
      required: true,
      default: "ETH",
    },
  },
  data() {

    // # Specified the dateInUnix so it does not crash when the user
    // clicks on "search" without inserting a value for the first time
    // when the page renders
    return {
      trades: [],
      dateToFetch: "01/01/2023",
      dateInUnix: 1672542000,
      selectedCrypto: this.cryptoCoin,
      dateOfToday: todayDate(),
    };
  },
  methods: {

    // # If the date is lower than bitcoin's first mining date (3rd of dec of 2009)
    // or bigger than today's date, the trades are not fetched and the ErrorSearch
    // component is shown in the parent component
    async onSubmit() {
      if (this.dateInUnix < bitcoinCreationDate || this.dateInUnix > this.dateOfToday) {
        this.$emit("error-on-search");
        return;
      }

      // # When it fetches the trades, it sends up to the parent
      // component
      this.trades = await fetchTrades(this.selectedCrypto, this.dateToFetch);
      this.$emit("date-picked", {
        date: this.dateToFetch,
        trades: this.trades,
      });
    },

    // # It automatically formats the date with the '/'s when the
    // date is fully inserted. Unfortunately I was not able to make a mask
    // for it to be done while typing. It also does not allow anything
    // except numbers
    formatDate() {
      let inputValue = this.dateToFetch;
      inputValue = inputValue.replace(/\D/g, "");
      inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");

      this.dateToFetch = inputValue;
    },
  },
  watch: {

    // # Every time the prop changes, this has to be updated so
    // it can be fetched
    cryptoCoin(newValue) {
      this.selectedCrypto = newValue;
    },

    // # The new Date() only accept dates in the American format
    // MM/DD/YYYY, so this function not only turns a date to unix,
    // but before doing it, it turns the Brazilian date to an
    // American date
    dateToFetch(newValue) {
      this.dateInUnix = dateToUnix(newValue);
    },
  },
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="form-container">
      <label for="date">Data: </label>
      <input
        id="date"
        class="date-input"
        @input="formatDate"
        v-model="dateToFetch"
        maxlength="10"
      />
      <button type="submit">Pesquisar</button>
    </div>
  </form>
</template>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 14vh;
}

.form-container label {
  font-size: 20px;
}

.date-input {
  text-align: center;
  font-size: 16px;
  width: 10vw;
}
</style>

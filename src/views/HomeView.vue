<!-- eslint-disable prettier/prettier -->
<script>
import axios from "axios";
import { cryptoOptions } from "@/data/cryptoOptions";

  //# Useful util for fetching trades, isolating the logic in
  // another file and not making it too long
import { fetchTrades } from "@/api/api";
import NavBar from "@/components/NavBar.vue";
import DatePicker from "@/components/DatePicker.vue";
import CryptoDropdown from "@/components/CryptoDropdown.vue"
import Loading from "@/components/Loading.vue"
import ErrorSearch from "@/components/ErrorSearch.vue"
import Negotiations from "@/components/Negotiations.vue"
import Footer from "@/components/Footer.vue"

export default {
  components: {
    NavBar,
    DatePicker,
    CryptoDropdown,
    Loading,
    ErrorSearch,
    Negotiations,
    Footer,
  },
  data() {

    // # Booleans for errors conditional rendering
    // # cryptoOptions pulled from another file so it's not too long
    // # Initial dateToFetch so it doesn't break
    return {
      isLoading: false,
      trades: [],
      errorMsg: "",
      errorSearch: false,
      dateToFetch: "01/01/2023",
      selectedCrypto: "ETH",
      cryptoName: "Ethereum",
      cryptoOptions,
    };
  },
  methods: {
    async getTrades() {
      this.trades = await fetchTrades(this.selectedCrypto, this.dateToFetch);
      this.isLoading = false;
    },

    // # Method for elevating the state from the DatePicker to the
    // parent component, updating the trades to be shown, the date state,
    // as well as setting the error to false (if it was true before)
    setDateToFetch(date) {
      this.dateToFetch = date.date;
      this.trades = date.trades;
      this.errorSearch = false;
    },

    // # Method for fetching new trades every time the user selects
    // a new crypto from the dropdown, without the need to click on "search"
    // actively. Also sets the error to false (if it was true before)
    async setCryptoName(name) {
      this.cryptoName = name.name;
      this.selectedCrypto = name.ticker;
      this.trades = await fetchTrades(this.selectedCrypto, this.dateToFetch);
      this.errorSearch = false;
    },
    errorOnSearch() {
      this.errorSearch = true;
    }
  },
  created() {
    this.isLoading = true;
    this.getTrades();
  },
};
</script>

<template>
  <main>
    <NavBar />

    <!-- Haven't created a component for this section because it's too short -->
    <section class="main-header-container">
      <h2 class="main-header">Cripto Trades</h2>
    </section>
    <section class="forms">
      <div class="form-container">
        <DatePicker
          :cryptoCoin="this.selectedCrypto"
          @date-picked="setDateToFetch"
          @error-on-search="errorOnSearch"
        />
      </div>

      <div class="form-container">
        <CryptoDropdown @crypto-picked="setCryptoName" />
      </div>
    </section>

    <!-- Every time a user picks a new Crypto, it automatically searches
    the trades for the new crypto and updates the crypto name -->
    <h2 class="coin-header">{{ cryptoName }}</h2>

    <Loading v-if="isLoading" class="loading-text" />

    <!-- The ErrorSearch only shows up if no trades are received from the
    request's response or if errorSearch is true -->
    <ErrorSearch v-else-if="trades.length === 0 || errorSearch" />
    <Negotiations v-else :errMsg="errMsg" :trades="trades" />

    <Footer />
  </main>
</template>

<style>
.main-header-container {
  width: 100%;
  text-align: center;
  top: 10px;
}

.main-header {
  font-size: 42px;
  padding: 24px 0;
}

.forms {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  margin: 0 30px;
}

.coin-header {
  text-align: center;
  font-size: 35px;
  padding: 50px 0 20px 0;
  margin-top: -24px;
}
</style>

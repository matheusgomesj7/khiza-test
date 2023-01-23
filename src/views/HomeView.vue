<!-- eslint-disable prettier/prettier -->
<script>
import axios from "axios";
import { cryptoOptions } from "@/data/cryptoOptions";
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
    return {
      isLoading: false,
      trades: [],
      errorMsg: "",
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
    setDateToFetch(date) {
      this.dateToFetch = date.date;
      this.trades = date.trades;
    },
    async setCryptoName(name) {
      this.cryptoName = name.name;
      this.selectedCrypto = name.ticker;

      this.trades = await fetchTrades(this.selectedCrypto, this.dateToFetch);
    },
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

    <section class="main-header-container">
      <h2 class="main-header">Cripto Trades</h2>
    </section>
    <section class="forms">
      <div class="form-container">
        <DatePicker
          :cryptoCoin="this.selectedCrypto"
          @date-picked="setDateToFetch"
        />
      </div>

      <div class="form-container">
        <CryptoDropdown @crypto-picked="setCryptoName" />
      </div>
    </section>

    <h2 class="coin-header">{{ cryptoName }}</h2>

    <Loading v-if="isLoading" class="loading-text" />
    <ErrorSearch v-else-if="trades.length === 0" />
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

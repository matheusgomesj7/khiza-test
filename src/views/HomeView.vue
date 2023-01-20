<script>
import axios from "axios";
import { cryptoOptions } from "../data/cryptoOptions";
import NavBar from "../components/NavBar.vue"
export default {
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
    getTrades() {
      axios
        .get(
          `https://www.mercadobitcoin.net/api/${this.selectedCrypto}/trades/`
        )
        .then((res) => {
          console.log(res.data);
          this.isLoading = false;
          this.trades = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onSubmit() {
      console.log("im working");
      // const newStr = this.dateToFetch.replace(/-/g, "."); fixme*
      const dateToUnix = Math.floor(
        new Date(this.dateToFetch).getTime() / 1000
      );
      axios
        .get(
          `https://www.mercadobitcoin.net/api/${this.selectedCrypto}/trades/${dateToUnix}`
        )
        .then((res) => {
          console.log(res.data);
          this.trades = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    formatDate() {
      let inputValue = this.dateToFetch;
      inputValue = inputValue.replace(/\D/g, "");
      inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");

      this.dateToFetch = inputValue;
    },
    setCryptoName() {
      const newCryptoName = this.cryptoOptions.find(
        (crypto) => crypto.value === this.selectedCrypto
      );
      this.cryptoName = newCryptoName.label;

      const dateToUnix = Math.floor(
        new Date(this.dateToFetch).getTime() / 1000
      );
      axios
        .get(
          `https://www.mercadobitcoin.net/api/${this.selectedCrypto}/trades/${dateToUnix}`
        )
        .then((res) => {
          console.log(res.data);
          this.trades = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.isLoading = true;
    this.getTrades();
  },
};
</script>

<template>
  <main>
    <Navbar />

    <section class="main-header-container">
      <h2 class="main-header">Cripto Trades</h2>
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
    </section>

    <h2 class="coin-header">{{ cryptoName }}</h2>
    <div class="dropdown-container">
      <select
        id="crypto-select"
        v-model="selectedCrypto"
        @change="setCryptoName"
      >
        <option
          v-for="crypto in cryptoOptions"
          :value="crypto.value"
          :key="crypto.value"
        >
          {{ crypto.label }}
        </option>
      </select>
    </div>
    <div v-if="isLoading" class="loading-text">Loading...</div>
    <div v-else-if="trades.length === 0" class="invalid-search">
      Invalid date! Try again with a valid one.
    </div>
    <section v-else class="negotiations">
      <h3 v-if="errorMsg">{{ errorMsg }}</h3>
      <div class="trades-data-container">
        <h3>Preço (R$)</h3>
        <div v-for="trade in trades.slice(0, 25)" :key="trade.tid">
          <h4 :class="trade.type === 'buy' ? 'green-text' : 'red-text'">
            {{ trade.price.toFixed(2) }}
          </h4>
        </div>
      </div>
      <div class="trades-data-container">
        <h3>Quantidade</h3>
        <div v-for="trade in trades.slice(0, 25)" :key="trade.tid">
          <h4>{{ trade.amount.toFixed(4) }}</h4>
        </div>
      </div>
      <div class="trades-data-container">
        <h3>Horário</h3>
        <div v-for="trade in trades.slice(0, 25)" :key="trade.tid">
          <h4>{{ new Date(trade.date * 1000).toLocaleTimeString() }}</h4>
        </div>
      </div>
    </section>
    <footer class="footer-styles">This is the footer</footer>
  </main>
</template>

<style>
.navbar {
  text-align: center;
  font-size: 22px;
  width: 100%;
  height: 70px;
  /* border-bottom: 3px solid lightgray; */
  padding: 8px 0;
  background-color: white;
  box-shadow: 0px 0px 20px 3px #e1e5e8;
}

.loading-text {
  font-size: 30px;
  text-align: center;
  vertical-align: center;
  margin-top: 75px;
}

.invalid-search {
  font-size: 16px;
  text-align: center;
  vertical-align: center;
}

.main-header-container {
  width: 100%;
  text-align: center;
  top: 10px;
}

.main-header {
  font-size: 42px;
  padding: 24px 0;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-container label {
  font-size: 20px;
}

.date-input {
  text-align: center;
  font-size: 16px;
}

.coin-header {
  text-align: center;
  font-size: 35px;
  padding: 50px 0 20px 0;
}

.dropdown-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 68px;
}

.negotiations {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.negotiations h3 {
  font-size: 20px;
  color: black;
  text-align: center;
}

.trades-data-container {
  width: 25vw;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 30px;
  margin-bottom: 14px;
  background-color: white;
  box-shadow: 0px 0px 10px 2px lightblue;
  padding: 10px 0;
}

.trades-data-container div {
  margin: 4px 0;
}

.green-text {
  color: green;
}

.red-text {
  color: red;
}

.footer-styles {
  text-align: center;
  font-size: 16px;
  width: 100%;
  height: 50px;
  padding: 8px 0;
  background-color: white;
}
</style>

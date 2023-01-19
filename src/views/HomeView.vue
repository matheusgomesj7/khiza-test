<!-- <script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
</script> -->

<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      trades: [],
      errorMsg: "",
      dateToFetch: "",
    };
  },

  methods: {
    getTrades() {
      axios
        .get("https://www.mercadobitcoin.net/api/eth/trades/")
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
      console.log('im working')
      const newStr = this.dateToFetch.replace(/-/g, ".");
      const dateToUnix = Math.floor(new Date(newStr).getTime() / 1000);
      axios
        .get(`https://www.mercadobitcoin.net/api/eth/trades/${dateToUnix}`)
        .then((res) => {
          console.log(res.data);
          this.trades = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.isLoading = true;
    this.getTrades();
  },
};
</script>

<!-- 
  fixme*
  1. tirar esse input de date, e colocar um normal com string sanitizer
  2. colocar algum tipo de erro quando a data não existir, pra frente ou pra trás
-->

<template>
  <main>
    <nav class="navbar">
      <h1>Khiza DAO</h1>
    </nav>

    <section class="main-header-container">
      <h2 class="main-header">Cripto Trades</h2>
      <form @submit.prevent="onSubmit">
        <label for="date">Procurar por data: </label>
        <input id="date" type="date" v-model="dateToFetch" min="2008-10-01" />
        <button type="submit">Pesquisar</button>
      </form>
    </section>

    <h2 class="coin-header">Ethereum</h2>
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
  border-bottom: 3px solid lightgray;
  padding: 8px 0;
  background-color: white;
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

.coin-header {
  text-align: center;
  font-size: 35px;
  padding: 50px 0 20px 0;
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
  border-top: 3px solid lightgray;
  padding: 8px 0;
  background-color: white;
}
</style>

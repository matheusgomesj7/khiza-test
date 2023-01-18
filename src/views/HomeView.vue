<!-- <script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
</script> -->

<script>
import axios from "axios";
export default {
  data() {
    return {
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
    this.getTrades();
  },
};
</script>

<template>
  <main>
    <div class="main-header-container">
      <h2 class="main-header">Negociações Cripto</h2>
      <form @submit.prevent="onSubmit">
        <label for="date">Procurar por data: </label>
        <input
          id="date"
          type="date"
          v-model="dateToFetch"
          min="2008-10-01"
          max="2023-01-19"
        />
        <button type="submit">Pesquisar</button>
      </form>
    </div>

    <h2 class="coin-header">Ethereum</h2>
    <section class="negotiations">
      <h3 v-if="errorMsg">{{ errorMsg }}</h3>
      <div class="price-container">
        <h3>Preço (R$)</h3>
        <div v-for="trade in trades.slice(0, 25)" :key="trade.tid">
          <h4 :class="trade.type === 'buy' ? 'green-text' : 'red-text'">
            {{ trade.price.toFixed(2) }}
          </h4>
        </div>
      </div>
      <div class="quantity-container">
        <h3>Quantidade</h3>
        <div v-for="trade in trades.slice(0, 25)" :key="trade.tid">
          <h4>{{ trade.amount.toFixed(4) }}</h4>
        </div>
      </div>
      <div class="time-container">
        <h3>Horário</h3>
        <div v-for="trade in trades.slice(0, 25)" :key="trade.tid">
          <h4>{{ new Date(trade.date * 1000).toLocaleTimeString() }}</h4>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.main-header-container {
  width: 100%;
  text-align: center;
  top: 10px;
}

.main-header {
  font-size: 50px;
  padding: 24px 0;
}

.coin-header {
  text-align: center;
  font-size: 35px;
  padding: 50px 0 20px 0;
}

.negotiations {
  width: 100%;
  background-color: aqua;
  display: flex;
  justify-content: space-around;
}

.negotiations h3 {
  font-size: 20px;
  color: black;
  text-align: center;
}

.price-container {
  height: 500px;
  width: 25vw;
  text-align: center;
}

.quantity-container {
  height: 500px;
  width: 25vw;
  text-align: center;
}

.time-container {
  height: 500px;
  width: 25vw;
  text-align: center;
}

.green-text {
  color: green;
}

.red-text {
  color: red;
}
</style>

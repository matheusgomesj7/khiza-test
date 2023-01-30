<script>
export default {
  props: {
    errMsg: {
      type: Error,
    },
    trades: {
      type: Array,
    },
  },
};
</script>

<template>
  <section class="negotiations">
    <h3 v-if="errorMsg">An error occurred! Please try again.</h3>
    <div class="trades-data-container">
      <h3>Preço (R$)</h3>

      <!-- # It only shows the first 25 results, as the page has
      no pagination feature -->
      <div v-for="trade in trades.slice(0, 25)" :key="trade.tid">

        <!-- The value is displayed in green if it was a buying operation,
        a red if it was a selling one -->
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
</template>

<style>
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
</style>

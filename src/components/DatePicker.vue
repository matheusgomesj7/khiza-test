<script>
import axios from "axios";
import { fetchTrades } from "@/api/api";

export default {
  props: {
    cryptoCoin: {
      type: String,
      required: true,
      default: "ETH",
    },
  },
  data() {
    return {
      trades: [],
      dateToFetch: "01/01/2023",
      selectedCrypto: this.cryptoCoin,
    };
  },
  methods: {
    async onSubmit() {
      this.trades = await fetchTrades(this.selectedCrypto, this.dateToFetch);
      console.log(this.selectedCrypto);
      this.$emit("date-picked", {
        date: this.dateToFetch,
        trades: this.trades,
      });
    },
    formatDate() {
      let inputValue = this.dateToFetch;
      inputValue = inputValue.replace(/\D/g, "");
      inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");

      this.dateToFetch = inputValue;
    },
  },
  watch: {
    cryptoCoin(newValue) {
      this.selectedCrypto = newValue;
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

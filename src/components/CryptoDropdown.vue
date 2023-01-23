<script>
import { cryptoOptions } from "@/data/cryptoOptions";

export default {
  data() {
    return {
      selectedCrypto: "ETH",
      cryptoOptions,
    };
  },
  methods: {
    setCrypto() {
      const selectedOption = this.cryptoOptions.find(
        (crypto) => crypto.value === this.selectedCrypto
      );

      this.selectedCrypto = selectedOption.value;
      this.$emit("crypto-picked", {
        name: selectedOption.label,
        ticker: selectedOption.value,
      });
    },
  },
};
</script>

<template>
  <div class="dropdown-container">
    <select
      id="crypto-select"
      class="dropdown-styles"
      v-model="selectedCrypto"
      @change="setCrypto"
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
</template>

<style>
.dropdown-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 14vh;
  margin-top: 10px;
}

.dropdown-styles {
  width: 15vw;
  height: 3.5vh;
}
</style>

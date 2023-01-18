<!-- <script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
</script> -->

<template>
  <main>
    <div class="main-header-container">
      <h2 class="main-header">Negociações Cripto</h2>
      <form>
        <input />
      </form>
    </div>

    <h2 class="coin-header">Ethereum</h2>
    <section class="negotiations">
      <div class="price-container">
        <h3>Preço (R$)</h3>
      </div>
      <div class="quantity-container">
        <h3>Quantidade</h3>
      </div>
      <div class="time-container">
        <h3>Horário</h3>
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
  background-color: red;
  width: 25vw;
}

.quantity-container {
  height: 500px;
  background-color: red;
  width: 25vw;
}

.time-container {
  height: 500px;
  background-color: red;
  width: 25vw;
}
</style>

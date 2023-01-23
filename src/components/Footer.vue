<script>
export default {};
</script>

<template>
  <footer class="footer-styles">
    <div class="icon-container">
      <a href="https://twitter.com/khizaDAO">
        <img class="icon twitter" src="@/assets/icons/twitter-khiza.png" />
      </a>
    </div>
    <div class="icon-container">
      <a href="https://instagram.com/khizaDAO">
        <img class="icon instagram" src="@/assets/icons/ig-khiza.png" />
      </a>
    </div>
    <div class="icon-container">
      <a href="https://www.linkedin.com/company/khizadao">
        <img class="icon linkedin" src="@/assets/icons/linkedin-khiza.png" />
      </a>
    </div>
  </footer>
</template>

<style>
.footer-styles {
  text-align: center;
  font-size: 16px;
  width: 100%;
  height: 10vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.icon-container {
  width: 24px;
  height: 24px;
}

.icon {
  width: 100%;
  height: 100%;
}

.twitter {
  filter: invert(48%) sepia(79%) saturate(994%) hue-rotate(175deg) brightness(96%) contrast(98%);
}

.instagram {
  filter: invert(38%) sepia(41%) saturate(5210%) hue-rotate(304deg) brightness(79%) contrast(88%);
}

.linkedin {
  filter: invert(31%) sepia(76%) saturate(5322%) hue-rotate(183deg) brightness(90%) contrast(89%);
}

</style>

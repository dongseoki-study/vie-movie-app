<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
/* scoped는 제거해야 한다..  */
//@import "~/scss/main";
</style>
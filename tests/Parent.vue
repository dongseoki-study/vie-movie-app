<template>
  <h1>Parent</h1>
  <Child msg="Hello" />
</template>

<script>
import Child from "./Child";
export default {
  components: {
    Child,
  },
};
</script>
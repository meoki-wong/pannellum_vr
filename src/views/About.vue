<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  watch: {
    '$route': function (to, from) {
    // 在这里执行需要的操作
    console.log('---=-=监听', to,  from);
  }
  },
  beforeRouteEnter (to, from, next) {
    console.log('----进入');
    next()
  }
}
</script>

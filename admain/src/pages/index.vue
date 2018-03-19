<template>
  <el-container style="height: 100%; border: 1px solid skyblue">
    <choice-box :click="intoClick"></choice-box>
    <el-container>
      <el-header>
        <search :content="intocontent"></search>
      </el-header>
      <el-main>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import choiceBox from '@/components/choiceBox.vue'
  import search from '@/components/search.vue'
  export default {
    name: 'index',
    components: {
      choiceBox,
      search
    },
    data() {
      return {
        intoClick: '',
        intocontent: '',
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    border-bottom: 1px solid #B3C0D1;
    line-height: 60px;
    width: 100%;
  }

  .title {
    padding: 20px;
    color: #B3C0D1;
    font-size: 20px;
  }
</style>

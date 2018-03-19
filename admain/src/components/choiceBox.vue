<template>
  <el-aside width="200px" class="bg">
    <p class="title">清瘤圈</p>
    <p class="system">后台管理系统</p>
    <router-link to="/official">
      <div v-bind:class="[click==0? 'rowclick':'', 'row',]">
        <i class="el-icon-edit-outline" style="margin-left: 30px;"></i>
        <span>官方圈发布</span>
        <i class="el-icon-arrow-right" style="float:right;margin-right: 8px; line-height: 50px;"></i>
      </div>
    </router-link>
    <router-link to="/tumorIndex">
      <div v-bind:class="[click==1? 'rowclick':'', 'row',]">
        <i class="el-icon-edit-outline" style="margin-left: 30px;"></i>
        <span>肿瘤百科</span>
        <i class="el-icon-arrow-right" style="float:right;margin-right: 8px; line-height: 50px;"></i>
      </div>
    </router-link>
    <router-link to="/hospital">
      <div v-bind:class="[click==2? 'rowclick':'', 'row',]">
        <i class="el-icon-edit-outline" style="margin-left: 30px;"></i>
        <span>医院图片</span>
        <i class="el-icon-arrow-right" style="float:right;margin-right: 8px; line-height: 50px;"></i>
      </div>
    </router-link>
    <router-link to="/drug">
      <div v-bind:class="[click==3? 'rowclick':'', 'row',]">
        <i class="el-icon-edit-outline" style="margin-left: 30px;"></i>
        <span>药品管理</span>
        <i class="el-icon-arrow-right" style="float:right;margin-right: 8px; line-height: 50px;"></i>
      </div>
    </router-link>
    <router-link to="/authentication">
      <div v-bind:class="[click==4? 'rowclick':'', 'row',]">
        <i class="el-icon-edit-outline" style="margin-left: 30px;"></i>
        <span>认证</span>
        <i class="el-icon-arrow-right" style="float:right;margin-right: 8px; line-height: 50px;"></i>
      </div>
    </router-link>

    <router-link to="/advertising">
      <div v-bind:class="[click==5? 'rowclick':'', 'row',]">
        <i class="el-icon-edit-outline" style="margin-left: 30px;"></i>
        <span>广告推送</span>
        <i class="el-icon-arrow-right" style="float:right;margin-right: 8px; line-height: 50px;"></i>
      </div>
    </router-link>
  </el-aside>
</template>

<script>
  export default {
    name: 'choice',
    props: ['click'],
    data() {
      return {}
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  a {
    text-decoration: none;
  }

  .bg {
    background-image: url(../assets/chioiceBg.png)
  }

  .title {
    color: #FFF;
    font-size: 20px;
    margin-left: 30px;
    margin-bottom: 10px;
  }

  .system {
    color: #FFF;
    opacity: 0.8;
    margin-top: 0px;
    margin-left: 30px;
    margin-bottom: 50px;
  }

  .row {
    height: 50px;
    line-height: 50px;
    color: #fff;
  }

  .rowclick {
    background-color: #069EC6
  }
</style>

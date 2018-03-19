<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <choice-box :click="intoClick"></choice-box>
        <el-container>
            <el-header>
                <search :content="intocontent"></search>
            </el-header>
            <el-main>

               <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item >广告推送</el-breadcrumb-item>
                </el-breadcrumb>


                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span> 广告列表</span>
                    <span>(<span v-text="list.length">1</span>/8)</span>
                     <!-- <router-link to="/editadvertising"> -->
                    <span class="addbtn" style="float: right;" @click="addadvertising(list.length)">
                        <i data-v-5f79ab52="" class="el-icon-circle-plus"></i> 新建广告
                    </span>
                <!-- </router-link> -->
                </div>

                <div class="list">
                    <div class="li" v-for="items in list">
                        <img src="../../assets/noPic.png" v-bind:src="items.imageUrl" alt="广告封面">
                        <div class="txt">
                            <span style="float:left">内容：</span>
                            <span v-text="items.pageUrl" class="maxlength">https://mp.weixin.qq.com/s/a4LJDMPQnCnaIhTi5J6HNg</span>
                            <span class="Del" @click="Del(items.advertisementId)">
                                删除
                            </span>
                        </div>
                    </div>
                </div>

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
                intoClick: '5',
                intocontent: '',
                list: ''
            }
        },
        mounted() {
            this.getlist();

        },
        methods: {
            getlist(){
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/topadvertisement/list',
                }).then(function(res) {
                    console.log(res)
                    that.list = res.data.list;

                }).catch((error) => {
                    console.log(error)
                });
            },
            addadvertising(len){
                console.log(len)

                if(len >= 8){
                     this.$message({
                        type: 'success',
                        message: '最多添加8条'
                    });
                }else{
                   this.$router.push({ path: '/editadvertising'})
                }
            },

            Del (adid){
                var that = this;

                 this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/topadvertisement/admin/delete',
                    params: {
                        "advertisementId" : adid
                    }

                }).then(function(res) {
                    that.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    that.getlist();
                }).catch(function(err) {
                    that.$message({
                        type: 'warning',
                        message: '删除失败'
                    });
                })
            },
           
        }
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
        padding-bottom: 8px;
    }
    .list .li{
        padding: 20px;
        border-bottom: 1px solid #e6ebf5;
        overflow: hidden
    }
    .list .li img{
        width: 210px;
        height: 140px;
        margin-right: 15px;
        float: left;
    }
    .list .li .txt{
        line-height: 26px;
        font-size: 18px;
    }
   .list .li .txt .Del{
       float: right;
       color: #E64B3B;
       cursor: pointer;
   }
   .addbtn{
        background: #21CBBD;
        font-size: 15px;
        padding: 5px 10px;
        border-radius: 10px;
        color: #FFF;
        cursor: pointer;
   }
   .maxlength{width: 66%;display:inline-block;word-wrap:break-word;white-space:normal}
</style>

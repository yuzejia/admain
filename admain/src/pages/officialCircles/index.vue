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
                    <el-breadcrumb-item>官方圈发布</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span> 官方圈列表 (共0条)</span>
                    <router-link to="/editOfficial/-1">
                        <span class="newOfficial" style="float:right"><i class="el-icon-circle-plus"></i> 新建官方圈</span>
                    </router-link>
                </div>
                <div class="contentBox" :key="item.officialCircleId" v-for="item in contentList">
                    <img :src="item.images[0] | nopic" style="height:150px; width: 200px;float:left">
                    <div class="content">标题： {{item.title}}</div>
                    <div class="content ellipsis">内容： {{item.content}}</div>
                    <div class="content">发布人： {{item.author}}</div>
                    <div class="operation">
                        <span style="margin-right:50px">{{item.createDate | changDate}}</span>
                        <router-link :to="'/editOfficial/'+ item.officialCircleId">
                            <el-button type="text" style="color:#21CBBD;margin-right:20px">编辑</el-button>
                        </router-link>
                        <el-button style="color:#21CBBD" type="text" @click="delate(item.officialCircleId)">删除</el-button>
                    </div>
                </div>
                <el-pagination :current-page.sync="page.currentPage" :page-size="page.pageSize" layout="prev, pager, next, jumper" :total="page.total">
                </el-pagination>
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
                intoClick: '0',
                intocontent: '官方圈搜索',
                page: {
                    currentPage: 0,
                    pageSize: 10,
                    total: 1000
                },
                contentList: [],
                newContentList: {
                    title: '',
                    content: '',
                    author: '',
                    date: '',
                    url: ''
                }
            }
        },
        mounted() {
            // this.getContentList(1)
            this.showContent(1)
        },
        filters:{
            changDate(dates){
                var date = new Date(parseInt(dates));
				return date.toLocaleDateString();
            },
            nopic(pic){
                var img = "src/assets/noPic.png"
                return pic?pic.url:img
            }
        },
        methods: {
            showContent(val){
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/officialcircle/list',
                    params: {
                        pageNumber: val,
                        pageSize: 10
                    }
                }).then(function(res) {
                    console.log(res)
                    that.contentList = res.data.list
                })
            },
            delate(id) {
                console.log(id)
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        method: "POST",
                        url: 'http://47.100.15.135/TPBitz/officialcircle/admin/delete',
                        params: {
                            officialCircleId: id,
                        }
                    }).then(function(res) {
                        console.log(res)
                    }).catch(function(err) {
                        console.log(err)
                    })
                    this.showContent(1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
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
    }
    .newOfficial {
        background: #21CBBD;
        font-size: 15px;
        padding: 5px 10px;
        border-radius: 10px;
        color: #FFF;
    }
    .contentBox {
        height: 150px;
        line-height: 50px;
        padding: 20px;
        border-top: 1px solid #D3D3D3;
        position: relative;
    }
    .content {
        margin-left: 230px
    }
    .ellipsis{
        width: 500px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .operation {
        position: absolute;
        top: 20px;
        right: 0;
    }
    .el-pagination {
        float: right;
    }
</style>
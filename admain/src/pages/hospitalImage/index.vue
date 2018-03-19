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
                    <el-breadcrumb-item>医院图片</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span> 医院管理列表 (共0条)</span>
                    <!-- <router-link to="/edittum">
                        <span class="newOfficial" style="float:right"><i class="el-icon-circle-plus"></i> 新建百科</span>
                    </router-link> -->
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="hospitalName" label="医院名">
                    </el-table-column>
                    <el-table-column prop="name" label="地区" >
                    </el-table-column>
                    <el-table-column prop="levelName" label="等级" >
                    </el-table-column>
                    <el-table-column label="操作"  fixed="right" width="200">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <el-button size="mini" @click="edit(tableData[scope.$index].hospitalId)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination 
                    :page-count="page.pageTotal"
                    @current-change="handleCurrentChange"
                >
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
                intoClick: '2',
                intocontent: '医院图片',
                tableData: [],
                page:{
                    pageTotal: 0
                }
            }
        },
        mounted() {
            var that = this
            this.axios({
                method: "POST",
                url: 'http://47.100.15.135/TPBitz/hospital/hospitallist',
                params: {
                    pageNumber: 1,
                    pageSize: 10
                }
            }).then(function(res) {
                console.log(res)
                that.page.pageTotal = parseInt(res.data.pageTotal) 
                that.tableData = res.data.list
            })
        },
        methods: {
            edit(id){
                this.$router.push('/editHospital/' + id)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/hospital/hospitallist',
                    params: {
                        pageNumber: val,
                        pageSize: 10
                    }
                }).then(function(res) {
                    that.page.pageTotal = parseInt(res.data.pageTotal) 
                    that.tableData = res.data.list
                })
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
    .el-pagination {
        margin-top: 50px;
        float: right;
    }
</style>
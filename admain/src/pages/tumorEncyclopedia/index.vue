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
                    <el-breadcrumb-item>肿瘤百科</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span> 肿瘤百科列表 (共0条)</span>
                    <router-link to="/edittum/-1">
                        <span class="newOfficial" style="float:right"><i class="el-icon-circle-plus"></i> 新建百科</span>
                    </router-link>
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="selectName" label="标题">
                    </el-table-column>
                     <el-table-column prop="selectId" label="所选Id" >
                    </el-table-column>
                    <el-table-column prop="name" label="病种" >
                    </el-table-column>
                    <el-table-column label="操作"  fixed="right" width="200">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="deleteTumor(tableData[scope.$index].selectId)">删除</el-button>
                            <el-button size="mini" @click="edit(tableData[scope.$index].selectId)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination :total="1000">
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
                intoClick: '1',
                intocontent: '肿瘤百科搜索',
                tableData: []
            }
        },
        mounted() {
            var that = this
            this.axios({
                method: "POST",
                url: 'http://47.100.15.135/TPBitz/encyclopedia/admin/top',
                // params: {
                //     pageNumber: 10,
                //     // pageSize: 1
                // }
            }).then(function(res) {
               
                that.tableData = res.data.list
                console.log(that.tableData)
            }).catch(function(err) {
                console.log(err)
            })
        },
        methods: {
            edit(id){
                console.log(id)
                this.$router.push('/edittum/'+ id)
            },
            deleteTumor() {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
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
    .el-pagination {
        margin-top: 50px;
        float: right;
    }
</style>
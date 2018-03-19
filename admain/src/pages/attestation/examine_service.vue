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
                    <el-breadcrumb-item :to="{ path: '/authentication' }">认证</el-breadcrumb-item>
                    <el-breadcrumb-item>医院挂号及服务认证</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>医院挂号及服务认证</span>
                </div>
                <el-table :data="doctorData.list" style="width: 100%">
                    <el-table-column prop="doctorName" label="医生名称">
                    </el-table-column>
                    <el-table-column prop="hospitalName" label="申请列表" >
                    </el-table-column>
                    <el-table-column prop="hospitalOauthResult" label="医院认证状态" >
                    </el-table-column>
                    <el-table-column prop="serverOauthResult" label="挂号服务认证状态" >
                    </el-table-column>
                    <el-table-column label="操作"  fixed="right" width="200">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="intoDoctor(doctorData.list[scope.$index].doctorId,scope.row)">审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination :page-count="doctorData.pageTotal | toNumber" @current-change="doctorChange"></el-pagination>

                <div class="btn">
                    <el-button class="btnA" type="text" @click="cancel">返回</el-button>
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
                intoClick: '4',
                intocontent: '认证搜索',
                routerId: 0,
                doctorData: []
            }
        },
        mounted() {
            this.routerId = this.$route.params.id
            this.routerId = 116
            this.doctorChange(1)
        },
        filters:{
            changDate(dates){
                var date = new Date(parseInt(dates));
				return date.toLocaleDateString();
            },
            toNumber(num){
                return parseInt(num)
            }
        },
        methods: {
            intoDoctor(id,row){
                console.log(row)
                var data = JSON.stringify(row);
                localStorage.setItem("doc", data); 

                this.$router.push('/authentication/service/' + this.routerId +'/doctor/' + id)
            },
            //换页
            doctorChange(val) {
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/authenticat/admin/doctorServerInfo',
                    params: {
                        hospitalId: that.routerId,
                        pageNumber: val,
                        pageSize: 10
                    }
                }).then(function(res) {
                    console.log(res)
                    that.doctorData = res.data
                })
            },
            cancel() {
                this.$confirm('是否返回', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/authentication')
                }).catch(() => {});
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
    .content {
        padding: 20px;
        font-size: 16px;
    }
    .content div {
        display: block;
        margin: 5px 0;
        color: #999;
        font-size: 20px;
    }
    .btn {
        position: absolute;
        right: 20px;
        bottom: 50px;
    }
    .btnA {
        background: #09A5D9;
        color: #FFF;
        padding: 10px 20px;
        width: 200px;
    }
    .el-pagination {
        float: right;
    }
</style>
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
                    <el-breadcrumb-item>认证</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span> 认证列表</span>
                </div>

                <!-- 标签 -->
                <el-tabs v-model="activeName" type="border-card">
                    <!-- 个人认证 -->
                    <el-tab-pane label="个人认证" name="first">
                        <el-table :data="userData.list" style="width: 100%">
                            <el-table-column prop="oauthName" label="用户名">
                            </el-table-column>
                            <el-table-column prop="oauthNumber" label="身份证号" >
                            </el-table-column>
                            <el-table-column prop="requestDate" :formatter="changDates" label="申请时间" >
                            </el-table-column>
                            <el-table-column prop="oauthResult" label="状态" >
                            </el-table-column>
                            <el-table-column label="操作"  fixed="right" width="200">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="editUser(userData.list[scope.$index].uoauthId)">审核</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination :page-count="userData.pageTotal | toNumber"  @current-change="userChange"></el-pagination>
                    </el-tab-pane>
                    <!-- 医生认证 -->
                    <el-tab-pane label="医生认证" name="second">
                        <el-table :data="doctorData.list" style="width: 100%">
                            <el-table-column prop="oauthName" label="用户名">
                            </el-table-column>
                            <el-table-column prop="oauthNumber" label="证件号" >
                            </el-table-column>
                            <el-table-column prop="name" label="身份证" >
                            </el-table-column>
                            <el-table-column prop="endDate" :formatter="changDates" label="有效时间" >
                            </el-table-column>
                            <el-table-column prop="oauthResult" label="医院认证" >
                            </el-table-column>
                            <el-table-column prop="name" label="是否过期" >
                            </el-table-column>
                            <el-table-column label="操作"  fixed="right" width="200">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="editDoctor(doctorData.list[scope.$index].userId)">审核</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination :page-count="doctorData.pageTotal | toNumber" @current-change="doctorChange"></el-pagination>
                    </el-tab-pane>

                    <!-- 爱心筹认证 -->
                    <el-tab-pane label="爱心筹认证" name="third">
                        <!-- 爱心筹认证 -->
                        <el-table :data="loveData.list" style="width: 100%">
                            <el-table-column prop="nickName" label="用户名">
                            </el-table-column>
                            <el-table-column prop="createDate" :formatter="changDates" label="创建时间" >
                            </el-table-column>
                            <el-table-column prop="title" label="标题" >
                            </el-table-column>
                            <el-table-column prop="oauthResult" label="结果" >
                            </el-table-column>
                            <el-table-column label="操作"  fixed="right" width="200">
                                <template slot-scope="scope">
                                     <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">关闭</el-button>
                                    <el-button size="mini" @click="editLove(loveData.list[scope.$index].crowdId)">审核</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination :page-count="loveData.pageTotal | toNumber" @current-change="loveChange"></el-pagination>
                    </el-tab-pane>

                    <!-- 医生服务认证 -->
                    <el-tab-pane label="医生服务认证" name="fourth">
                        <el-table :data="serviceData.list" style="width: 100%">
                            <el-table-column prop="param" label="医生服务认证">
                            </el-table-column>
                            <el-table-column label="操作"  fixed="right" width="200">
                                <template slot-scope="scope">
                                    <el-button size="mini"  @click="editService(serviceData.list[scope.$index].id)">审核</el-button>  
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination :page-count="serviceData.pageTotal | toNumber" @current-change="serviceChange"></el-pagination>
                    </el-tab-pane>
                </el-tabs>
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

                //标签选择
                activeName: 'first',

                userData: [],

                doctorData: [],

                loveData: [],

                serviceData: [],
            }
        },
        mounted() {
            var that = this
            this.userChange(1)
            this.doctorChange(1)
            this.loveChange(1)
            this.serviceChange(1)
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
            changDates(row, column, cellValue){
                var date = new Date(parseInt(cellValue  ));
				return date.toLocaleDateString();
            },
            //换页
            userChange(val) {
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/authenticat/admin/userOauthList',
                    params: {
                        pageNumber: val,
                        pageSize: 10
                    }
                }).then(function(res) {
                    that.userData = res.data
                })
            },
            doctorChange(val) {
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/authenticat/admin/doctorOauthList',
                    params: {
                        pageNumber: val,
                        pageSize: 10
                    }
                }).then(function(res) {
                    that.doctorData = res.data
                })
            },
            loveChange(val) {
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/authenticat/admin/crowdlist',
                    params: {
                        pageNumber: val,
                        pageSize: 10
                    }
                }).then(function(res) {
                    that.loveData = res.data
                })
            },
            serviceChange(val) {
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/authenticat/admin/hospitalOauthList',
                    params: {
                        pageNumber: val,
                        pageSize: 10
                    }
                }).then(function(res) {
                    that.serviceData = res.data
                })
            },

            //进入审核
            editUser(id){
                this.$router.push('/authentication/user/' + id)
            },
            editDoctor(id){
                this.$router.push('/authentication/doctor/' + id)
            },
            editLove(id){
                this.$router.push('/authentication/love/' + id)
            },
            editService(id){
                this.$router.push('/authentication/service/' + id)
            },

            
        },
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
        border-bottom: 1px solid #D3D3D3;
        position: relative;
    }
    .content {
        margin-left: 20px
    }
    .contentHead{
        margin-left: 75px;
        line-height: 16px;
    }
    .contentHead .space{
        padding: 0px 10px
    }
    .contentTitle{
        margin-left: 75px;
    }
    .contentTitle .space{
        padding: 0px 10px
    }
    .contentC{
        margin-left: 80px;
        line-height: 25px;
        color: #999999;
    }
    .contentFooter{
        margin-left: 75px;
    }
    .contentFooter .space{
        padding: 0px 10px
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
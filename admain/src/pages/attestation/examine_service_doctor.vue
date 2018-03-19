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
                    <el-breadcrumb-item>用户认证</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span> 医院及挂号服务认证详情</span>
                </div>
                <div class="content">
                    <div class="content_title">申请人信息 <a @click="intoDoctor">查参详情</a></div>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">姓名：</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light">{{doctorData.doctorName}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">医生认证状态：</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light">{{doctorData.hospitalOauthResult}}</div></el-col>
                    </el-row>
                </div>
                <div class="content">
                    <div class="content_title">医院及挂号服务认证详情</div>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple-light">{{doctorData.hospitalName}}</div></el-col>
                    </el-row>
                    <el-switch class="switch" v-model="hospitalOauth" active-color="#13ce66" inactive-color="#ff4949" active-text="通过" inactive-text="未通过"></el-switch>
                </div>
                <div class="content">
                    <div class="content_title">挂号服务开通认证信息</div>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">预约挂号</div></el-col>
                    </el-row>
                     <el-switch class="switch" :disabled='!hospitalOauth' v-model="serverOauth" active-color="#13ce66" inactive-color="#ff4949" active-text="通过" inactive-text="未通过"></el-switch>
                </div>
                <div class="btn">
                    <el-button class="btnA" type="text" @click="cancel" >返回</el-button>
                    <el-button class="btnB" type="text" @click="pass">通过审核</el-button>
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
                doctorData: {},
                hospitalOauth: false,
                serverOauth: false
            }
        },
        created(){
            
        },
        mounted() {
            var that = this
            this.routerId = this.$route.params.id
            this.doctorData = JSON.parse(localStorage.getItem("doc"))
            if (this.doctorData.hospitalOauthResult=='认证成功') {
                this.hospitalOauth = true
            }
            if (this.doctorData.serverOauthResult=='认证成功') {
                this.serverOauth = true
            }
            console.log(this.doctorData)
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
            intoDoctor(){
                this.$router.push('/authentication/doctor/' + this.doctorData.doctorId)
            },
            pass(){
                var that = this
                this.$confirm('是否确认选择', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.axios({
                        method: "POST",
                        url: 'http://47.100.15.135/TPBitz/authenticat/admin/hospitalServer',
                        params: {
                            doctorHospitalId: that.doctorData.doctorhospitalId,
                            hospitalOauthId:    that.hospitalOauth?1:2,
                            serverOauthId: that.hospitalOauth?(that.serverOauth?1:2):null
                        }
                    }).then(function(res) {
                        that.$notify({
                            title: '通过',
                            message: '该用户已通过',
                            type: 'success'
                        });
                    })              
                }).catch(() => {});
            },
            cancel() {
                console.log(this.doctorData)
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
        position: relative;
    }
    .content div {
        display: block;
        margin: 5px 0;
        color: #999;
        font-size: 16px;
    }
    .content .content_title{
        color: #000;
        font-size: 20px;
    }
    .content .content_title a{
        font-size: 14px;
        color: #09A5D9
    }
    .content .switch{
        position: absolute;
        top: 60px;
        right: 70px;
    }
    .btn {
        position: absolute;
        right: 20px;
        bottom: 50px;
    }
    .btnA {
        background: red;
    }
    .btnB {
        background: gray;
    }
    .el-button {
        /* background: #09A5D9; */
        color: #FFF;
        padding: 10px 20px;
        width: 200px;
    }
</style>
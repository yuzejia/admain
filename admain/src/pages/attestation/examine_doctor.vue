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
                    <el-breadcrumb-item>医生认证</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span> 认证详情</span>
                </div>
                <div class="content" v-show="ifShow">
                    <div >个人信息</div>
                    <el-switch class="switch" v-model="doctorPass" active-color="#13ce66" inactive-color="#ff4949" active-text="通过" inactive-text="未通过"></el-switch>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">姓名：</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light">{{doctorDetailData.oauthName}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">身份证：</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light">{{doctorDetailData.oauthNumber}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">有效时间</div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple-light">{{doctorDetailData.startDate | changDate}}-{{doctorDetailData.endDate | changDate}}</div></el-col>
                    </el-row>
                    <img class="img" :src="doctorDetailData.cardpositive" alt="">
                    <img class="img" :src="doctorDetailData.cardnegative" alt="">
                    <img class="img" :src="doctorDetailData.otherimages" alt="">
                </div>
                <div class="content" v-show="ifShow">
                    <div >资格认证信息</div>
                    <el-switch class="switch" v-model="qualificationPass" active-color="#13ce66" inactive-color="#ff4949" active-text="通过" inactive-text="未通过"></el-switch>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">姓名：</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light">{{doctorData.oauthName}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">身份证：</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light">{{doctorData.oauthNumber}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">有效时间</div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light">{{doctorData.endDate | changDate}}</div></el-col>
                    </el-row>
                    <img class="img" :src="doctorData.qualificationUrlCP" alt="">
                    <img class="img" :src="doctorData.qualificationUrlCN" alt="">
                    <img class="img" :src="doctorData.qualificationUrlCH" alt="">
                </div>
                <div class="content" v-show="!ifShow">
                    该用户没有数据
                </div>
                <div class="btn">
                    <el-button class="btnA" type="text" @click="pass">保存通过</el-button>
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
                doctorData: {},
                doctorDetailData: {},
                routerId: 0,
                doctorPass: false,
                qualificationPass: false,
                ifShow: true
            }
        },
        filters:{
            changDate(dates){
                var date = new Date(parseInt(dates));
				return date.toLocaleDateString();
            }
        },
        mounted() {
            this.routerId = this.$route.params.id
            // this.routerId = 3485
            var that = this
            this.axios({
                method: "POST",
                url: 'http://47.100.15.135/TPBitz/authenticat/admin/doctorOauthInfo',
                params: {
                    userId: that.routerId,
                }
            }).then(function(res) {
                if (res.data.list != null) {
                    console.log(res)
                    that.doctorData = res.data.list
                    if (that.doctorData.oauthResult == '认证成功') {
                        that.qualificationPass = true
                    }
                    that.doctorDetailData = res.data.list.userOauthDetail
                    if (that.doctorDetailData.oauthResult == '认证成功') {
                        that.doctorPass = true
                    }
                }
            }).catch((error) => {
                console.log(error)
                that.ifShow = false
            });
        },
        methods: {
            changeDoctorPass(){
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/authenticat/admin/doctor',
                    params: {
                        doctorId: that.routerId,
                        doctorOauthId: that.doctorPass?1:2,
                        qualificationOauthId: that.qualificationPass?1:2,
                    }
                }).then(function(res) {
                    console.log(res)
                    that.massage()
                })
            },
            massage() {
                    this.$notify({
                        title: '通过',
                        message: '数据已提交',
                        type: 'success'
                    });
                
            },
            pass(){
                var that = this
                this.$confirm('是否保存', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   that.changeDoctorPass()
                }).catch(() => {});
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
        position: relative;
    }
    .content div {
        display: block;
        margin: 5px 0;
        color: #999;
        font-size: 20px;
    }
    .content img{
        height: 150px;
        width: 200px;
    }
    .content .switch{
        position: absolute;
        top: 20px;
        right: 70px;
    }
    .btn {
        float: right;
        margin-top: 20px;
    }
    .el-button {
        background: #09A5D9;
        color: #FFF;
        padding: 10px 20px;
        width: 200px;
    }
</style>
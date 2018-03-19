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
                    <el-breadcrumb-item>爱心筹认证</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span> 爱心筹详情</span>
                </div>
                <div class="content">
                    <div class="logo">
                        <img :src="loveData.headUrl" alt="">
                        <div class="name">{{loveData.nickName}}</div>
                    </div>
                    <div class="titleTab">
                        <div class="tieleName">{{loveData.title}}</div>
                        <div class="state">筹款中</div>
                        <div class="progress">
                            <el-progress :percentage="70"></el-progress>
                        </div>
                        <div class="money">目标金额 <span>{{loveData.crowdMoney}}</span> 元</div>
                    </div>
                    <div class="data">
                        <div class="data_con">
                            <div class="color">元</div>
                            <div>已筹金额</div>
                        </div>
                        <div class="data_con">
                            <div class="color">次</div>
                            <div>爱心帮助</div>
                        </div>
                        <div class="data_con">
                            <div class="color">{{loveData.crowdDeadline | changDate}}</div>
                            <div>剩余天数</div>
                        </div>
                    </div>
                    <div class="project">
                        <div class="pro_title">项目详情</div>
                        <el-switch class="switch" v-model="crowdOauth" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        <div class="pro_content">{{loveData.description}}</div>
                        <div class="pro_img">
                            <img class="img" v-for="item in loveData.crowdUrls" :key="item" :src="item" alt="">
                        </div>
                    </div>
                    <div class="project">
                        <div class="pro_title">证明资料</div>
                        <el-switch class="switch" v-model="patientOauth" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        <div class="pro_details">
                            <el-row class="title_con">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">受助人(患者):</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple-light">{{loveData.patientName}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">真实姓名</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple-light">{{loveData.patientName}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">身份证号码:</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple-light">{{loveData.patientNo}}</div>
                                </el-col>
                            </el-row>
                            <img class="details_img" :src="loveData.patientUrlCP" alt="">
                            <img class="details_img" :src="loveData.patientUrlCN" alt="">
                            <img class="details_img" :src="loveData.patientUrlCH" alt="">
                        </div>
                        <div class="pro_details">
                            <el-row class="title_con">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">所患疾病:</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple-light">{{loveData.patientDisease}}</div>
                                </el-col>
                            </el-row>
                            <el-row class="title_con">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">就诊医院</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple-light">{{loveData.hospitalName}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">医院诊断证明:</div>
                                </el-col>
                            </el-row>
                            <img class="details_img" v-for="item in loveData.medicalCertificateUrl" :key="item" :src="item" alt="">
                          
                        </div>
                        <div class="pro_details">
                            <el-row class="title_con">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">收款人:</div>
                                </el-col>
                                <el-col :span="5">
                                    <div class="grid-content bg-purple-light">{{loveData.payeeName}}({{loveData.relationName}})</div>
                                </el-col>
                            </el-row>
                            <el-switch class="switch1" v-model="payeeOauth" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                            <el-row>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">真实姓名</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple-light">{{loveData.payeeName}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">身份证号码:</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple-light">{{loveData.payeeNo}}</div>
                                </el-col>
                            </el-row>
                            <img class="details_img" :src="loveData.payeeUrlCP" alt="">
                            <img class="details_img" :src="loveData.payeeUrlCN" alt="">
                            <img class="details_img" :src="loveData.payeeUrlCH" alt="">

                             <el-row>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">关系证明</div>
                                </el-col>
                            </el-row>
                            <img class="details_img" v-for="item in loveData.relatUrl" :key="item" :src="item" alt="">
                            <el-row class="title_con">
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">收款人微信/支付宝账号</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple-light"></div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
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
                loveData: {},
                crowdOauth:false,
                patientOauth: false,
                payeeOauth: false
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
            var that = this
            this.axios({
                method: "POST",
                url: 'http://47.100.15.135/TPBitz/authenticat/admin/crowdinfo',
                params: {
                    crowdId: that.routerId,
                }
            }).then(function(res) {
                console.log(res)
                that.loveData = res.data.list
                if (that.loveData.crowdOauthName == '认证成功') {
                    that.crowdOauth = true
                }
                if (that.loveData.patientOauthName == '认证成功') {
                    that.patientOauth = true
                }
                if (that.loveData.payeeOauthName == '认证成功') {
                    that.payeeOauth = true
                }
            })
        },
        methods: {
            cancel() {
                this.$confirm('是否返回', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/authentication')
                }).catch(() => {});
            },
            pass() {
                var that = this
                this.$confirm('是否确认选择', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.axios({
                        method: "POST",
                        url: 'http://47.100.15.135/TPBitz/authenticat/admin/crowdfunding',
                        params: {
                            crowdId: that.routerId,
                            crowdOauthId: that.crowdOauth?1:2,
                            patientOauthId: that.patientOauth?1:2,
                            payeeOauthId: that.payeeOauth?1:2
                        }
                    }).then(function(res) {
                        that.$notify({
                            title: '通过',
                            message: '该用户已通过',
                            type: 'success'
                        });
                    })              
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
    .content .logo {
        width: 100px;
        text-align: center;
        float: left;
    }
    .content .logo img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .content .logo .name {
        font-size: 12px;
    }
    .content .titleTab {
        font-size: 16px;
        width: 800px;
        margin-left: 100px;
    }
    .content .titleTab .state {
        font-size: 8px;
        line-height: 20px;
        margin-top: 5px;
        color: #B3C0D1
    }
    .content .titleTab .progress {
        width: 700px;
    }
    .content .titleTab .money {
        font-size: 8px;
        line-height: 20px;
        margin-top: 5px;
        color: #B3C0D1;
    }
    .content .titleTab .money span {
        color: #21CBBD;
    }
    .content .data {
        height: 100px;
        border-bottom: 1px solid #B3C0D1;
    }
    .content .data .data_con {
        float: left;
        margin-left: 100px;
        margin-top: 20px;
    }
    .content .data .data_con .color {
        color: orange
    }
    .content .project {
        border-bottom: 1px solid #B3C0D1;
        position: relative;
    }
    .content .project .switch{
        position: absolute;
        top: 0;
        left: 100px;
    }
    .content .project .pro_title {
        line-height: 20px;
        margin-top: 10px;
        padding-left: 10px;
        border-left: 5px solid #21CBBD;
    }
    .content .project .pro_content {
        margin: 15px;
    }
    .content .project .pro_img {
        display: flex;
        flex-wrap: wrap;
        margin-left: 20px;
    }
    .content .project .pro_img .img {
        height: 120px;
        width: 120px;
        margin-right: 20px;
        margin-bottom: 20px;
    }
    .content .project .pro_details {
        border-bottom: 1px solid #B3C0D1;
        line-height: 30px;
        position: relative;
    }
    .content .project .pro_details .switch1{
        position: absolute;
        top: 5px;
        left: 500px;
    }
    .content .project .pro_details:last-child {
        border-bottom: none
    }
    .content .project .pro_details .title_con {
        color: #21CBBD;
    } 
    .content .project .pro_details .details_img{
        width: 200px;
        height: 150px;
    }
    .btn {
        float: right;
        margin-top: 20px;
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
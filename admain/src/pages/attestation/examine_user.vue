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
                    <span> 认证详情</span>
                </div>
                <div class="content">
                    <div>个人信息</div>
                    <el-switch class="switch" v-model="pass" @change="changePass()" active-color="#13ce66" inactive-color="#ff4949" active-text="通过" inactive-text="未通过"></el-switch>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">姓名：</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light">{{userData.oauthName}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">身份证：</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light">{{userData.oauthNumber}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">申请时间</div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light">{{userData.requestDate | changDate}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple">状态：</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light">{{pass?'认证成功':'认证失败'}}</div></el-col>
                    </el-row>
                    <img class="img" :src="userData.otherimages" alt="">
                </div>
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
                // routerId
                routerId: '',
                userData: [],
                pass: false,
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
                url: 'http://47.100.15.135/TPBitz/authenticat/admin/userOauthInfo',
                params: {
                    uoauthId: that.routerId,
                }
            }).then(function(res) {
                that.userData = res.data.list
                if (that.userData.oauthResult == '认证成功') {
                    that.pass = true
                }
            })
        },
        methods: {
            changePass(){
                console.log(1)
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/authenticat/admin/user',
                    params: {
                        uoauthId: that.routerId,
                        oauthId: that.pass?1:2
                    }
                }).then(function(res) {
                    console.log(res)
                    that.massage()
                })
            },
            massage() {
                if (this.pass) {
                    this.$notify({
                        title: '通过',
                        message: '该用户已通过',
                        type: 'success'
                    });
                } else {
                    this.$notify({
                        title: '未通过',
                        message: '该用户未通过',
                        type: 'warning'
                    });
                }
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
    .content .switch{
        position: absolute;
        top: 20px;
        right: 70px;
    }
    .content img{
        height: 150px;
        width: 200px;
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
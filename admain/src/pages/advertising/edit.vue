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
                    <el-breadcrumb-item :to="{ path: '/advertising' }">广告推送</el-breadcrumb-item>
                    <el-breadcrumb-item>广告编辑</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>广告编辑</span>
                </div>
                <div class="subtitle">
                    <span>
                        广告
                    </span>
                </div>
                <div class="content">
                    <p class="sub">上传封面 (最佳尺寸720*400)</p>
                    <el-upload action=""
                        ref="addload"
                        list-type="picture-card" 
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :auto-upload="false"
                        :before-upload="beforeUpdate" 
                        :limit='number'
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>

                    <p class="sub">文章正文 : <span>在这里填写详细的文章内容分享给大家</span></p>
                    <el-input v-model="input" placeholder="在这输入或粘贴网址"></el-input>
                    <div class="btn">
                        <span class="submit" @click="release">
                                发布
                        </span>
                        
                        <span class="submit subdel" @click="goback">
                                    取消发布
                        </span>
                       
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
                dialogImageUrl: '',
                dialogVisible: false,
                textarea1: "",
                input: "",
                number: 1
            }
        },
        mounted() {},
        methods: {

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            beforeUpdate(file){
                var pic = new FormData();
                pic.append('file', file)
                pic.append('pageUrl', this.input)
                var that = this;
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/topadvertisement/admin/add',
                    headers:{'Content-Type': 'multipart/form-data'},
                    data: pic
                }).then(function(res) {
                    that.$message({
                        type: 'success',
                        message: '上传成功'
                    });
                    that.$router.push({ path: '/advertising'})
                }).catch(function(err) {
                    
                    that.$message({
                        type: 'warning',
                        message: '上传失败'
                    });

                })
                return false;
            },
            release(){
                var file = this.$refs.addload.submit();
            },
            goback(){
                this.$confirm('是否返回', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/advertising')
                }).catch(() => {});
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
    }
    .subtitle{
        color: #0B9BD8;
        font-size: 18px;
        border-bottom:1px solid #B3C0D1;
    }
     .subtitle span{
         border-bottom: 1px solid #0B9BD8;
         padding: 12px 8px;
         margin-left: 40px;
         display: inline-block
     }
     .content{
         padding: 20px 20px 20px 40px;

     }
     .content .sub{
         color: #999;
         margin: 20px 0;
     }
    .content .sub span{
            color: #999;
            font-size: 15px;
    }
     .btn{
        float: right;
        font-size: 18px;
        margin-top: 80px;
    }
     .btn .submit{
         width: 232px;
         height: 38px;
         line-height:38px; 
         display: inline-block;
         text-align: center;
         background: #0B9BD8;
         color: white;
         margin-left: 60px;
         cursor: pointer;
     }
     .btn .subdel{
         background: #999;
         color: #666;
     }
</style>

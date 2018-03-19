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
                    <el-breadcrumb-item :to="{ path: '/drug' }">药品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>药品编辑</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <span>药品编辑</span>
                </div>
                
                <div class="content">
                    <span>封面图片</span>
                    <el-upload action="http://47.100.15.135/TPBitz/medicine/add"  
                        ref="uploadDrug"   
                        list-type="picture-card" 
                        :on-preview="handlePictureCardPreview" 
                        :on-remove="handleRemove"
                        :data="drugData"
                        :on-progress='success'
                        :auto-upload="false"
                        :file-list="uploadImg">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>

                    <span>标题</span>
                    <el-input placeholder="请输入内容" v-model="drugData.medicineName"></el-input>
                    <span>发布人</span>
                    <el-input placeholder="请输入内容" v-model="drugData.result"></el-input>
                
                    <span>药品概述</span>
                    <div type="text/plain" id="editorElem"></div>
                </div>
                <div class="btn">
                    <el-button type="text" @click="release">发布</el-button>
                    <el-button type="text" @click="cancel">取消发布</el-button>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import choiceBox from '@/components/choiceBox.vue'
    import search from '@/components/search.vue'
    import wangeditor from 'wangeditor'
    export default {
        name: 'index',
        components: {
            choiceBox,
            search
        },
        data() {
            return {
                intoClick: '3',
                intocontent: '药品搜索',
                //图片
                dialogImageUrl: '',
                dialogVisible: false,
                getImg: {
                    url:''
                },
                uploadImg:[],

                //routerId
                routerId: '',
                editor: '',
                //药品
                drugData: {
                    medicineName: '',
                    result: '',
                    medicineDes: '',
                },
                updata:{

                }
            }
        },
        mounted() {
            var that = this
            this.editor = new wangeditor('#editorElem')
            // console.log(editor.initEditorConfig)
            this.editor.customConfig.onchange = (html) => {
                that.drugData.medicineDes = html
            }
            this.editor.create()

            this.showContent()
        },
        methods: {
            //编辑页面时获取
            showContent(){
                this.routerId = this.$route.params.id
                var that = this
                if (this.routerId != '-1') {
                    this.axios({
                        method: "POST",
                        url: 'http://47.100.15.135/TPBitz/medicine/info',
                        params: {
                            medicineId: this.routerId,
                        }
                    }).then(function(res) {
                        console.log(res)
                        that.drugData.medicineId = res.data.list.medicineId
                        that.drugData.medicineName = res.data.list.medicineName
                        that.drugData.result = res.data.list.price
                        that.getImg.url = res.data.list.smallUrl
                        that.uploadImg.push(that.getImg)

                        that.drugData.medicineDes = res.data.list.medicineDes
                        that.editor.txt.html(res.data.list.medicineDes)
            
                        
                    }).catch(function(err) {
                        console.log(err)
                    })
                }
            },
            success(event, file, fileList){
                console.log(file)
                this.$router.push('/drug')
            },
            beforeAvatarUpload(file){
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            release() {
                var that = this
                this.$confirm('是否发布到官方圈', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$refs.uploadDrug.submit()
                    
                    this.$message({
                        type: 'success',
                        message: '发布成功!'
                    });
                }).catch(() => {});
            },
            cancel() {
                this.$confirm('是否返回', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/official')
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
    .content span {
        display: block;
        margin: 20px 0;
        color: #999
    }
    .btn {
        float: right;
    }
    .el-button {
        background: #09A5D9;
        color: #FFF;
        padding: 10px 20px;
        width: 200px;
    }
    #account--editor {
        width: 100%;
        min-height: 330px;
        height: auto;
    }
    .el-message-box{
        z-index: 20000;
    }
    .getImg{
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        line-height: 146px;
        vertical-align: top;
        margin-right: 5px;
    }
</style>

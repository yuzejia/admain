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
                    <el-breadcrumb-item :to="{ path: '/hospital' }">医院图片</el-breadcrumb-item>
                    <el-breadcrumb-item>添加图片</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span> 添加图片</span>
                </div>
                <div class="content">
                    <span>封面图片</span>
                    <el-upload 
                        ref="addload" 
                        action="http://47.100.15.135/TPBitz/hospital/upload/image" 
                        list-type="picture-card" 
                        :on-preview="handlePictureCardPreview" 
                        :on-remove="handleRemove"
                        :before-upload="beforeUpdate" 
                        :auto-upload="false"
                        :file-list="uploadImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <span>环境图片</span>
                    <el-upload 
                        ref="addload" 
                        action="http://47.100.15.135/TPBitz/hospital/upload/image" 
                        list-type="picture-card" 
                        :on-preview="handlePictureCardPreview" 
                        :on-remove="handleRemove"
                        :before-upload="beforeUpdate"
                        :auto-upload="false"
                        :file-list="uploadImg2">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div class="btn">
                    <el-button class="btnA" type="text" @click="addImage">添加图片</el-button>
                    <el-button class="btnA" type="text" @click="cancel">取消</el-button>
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
                intoClick: '2',
                intocontent: '医院图片',
                // 图片
                dialogImageUrl: '',
                dialogVisible: false,
                //routerId
                routerId: '',
                uploadImg: [],
                uploadImg2: []
            }
        },
        mounted() {
            this.routerId = this.$route.params.id
            this.showImage(this.routerId)
        },
        methods: {
            showImage(id) { 
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/hospital/images',
                    params: {
                        hospitalId: id
                    }
                }).then(function(res) {
                    var datas = res.data.list
                    for(let k in datas) {
                        if (k==0) {
                            var getAddimg = {}
                            getAddimg.url = datas[k].param
                            getAddimg.uid = datas[k].id
                            that.uploadImg.push(getAddimg)
                        } else {
                            var getAddimg = {}
                            getAddimg.url = datas[k].param
                            getAddimg.uid = datas[k].id
                            that.uploadImg2.push(getAddimg)
                        }
                    }
                })
            },

            //图片的获取
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                console.log(this.dialogImageUrl)
                this.dialogVisible = true;
            },
            handleRemove(file){
                console.log(file)
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/hospital/delete/image',
                    params: {
                        imageId: file.uid
                    }
                }).then(function(res) {
                    that.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }).catch(function(err) {
                    console.log(err)
                })
            },
            beforeUpdate(file) {
                var that = this
                var formdata1 = new FormData();
                formdata1.append('files', file);
                formdata1.append('hospitalId', this.routerId);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/hospital/upload/image',
                    headers:{'Content-Type': 'multipart/form-data'},
                    data: formdata1
                }).then(function(res) {
                    that.$message({
                        type: 'success',
                        message: '上传成功'
                    });
                }).catch(function(err) {
                    that.$message({
                        type: 'warning',
                        message: '上传失败'
                    });
                })
                showImage(routerId)
                return false
            },
            //添加图片
            addImage() {
                this.$confirm('是否发布到官方圈', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs.addload.submit();
                    this.$message({
                        type: 'success',
                        message: '发布成功!'
                    });
                }).catch(() => {});
                
        },
        cancel() {}
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
    .el-message-box {
        z-index: 20000;
    }
</style>
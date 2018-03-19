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
                    <el-breadcrumb-item :to="{ path: '/official' }">官方圈发布</el-breadcrumb-item>
                    <el-breadcrumb-item>新建官方圈</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <span>新建官方圈</span>
                </div>
                <div class="content">
                    <span style="float:left">标题</span>
                    <span style="float:right">3-30个字</span>
                    <el-input placeholder="请输入内容" v-model="editOffical.title"></el-input>
                    <span>发布人</span>
                    <el-input placeholder="请输入内容" v-model="editOffical.author"></el-input>
                    <!-- <span>所选病种</span>
                                <div>
                                    <el-select v-model="value1" placeholder="请选择" :focus="getDisease(value1)">
                                        <el-option v-for="(item,index) in disease" :label="item.partName" :key="item.partId" :value="index">
                                        </el-option>
                                    </el-select>
                                    <el-select v-model="diseaseID" placeholder="请选择">
                                        <el-option v-for="item in disease2" :label="item.selectName" :key="item.selectId" :value="item.selectId">
                                        </el-option>
                                    </el-select>
                                </div> -->
                    <!-- <span>添加照片</span>
                            <el-upload action="http://47.100.15.135/TPBitz/officialcircle/admin/add" ref="upload" :data="updateOffical" list-type="picture-card" :before-upload="beforeUpdate" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="false">
                                <i class="el-icon-plus"></i>
                            </el-upload> -->
                    <!--<script id="editor" type="text/plain">

</script>-->
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <span>文章正文</span>
                    <!-- <div type="text/plain" id="editorElem"></div> -->
                    <div id="ueditor" type="text/plain"></div>
                </div>
                </div>
                <div class="btn">
                    <el-button type="text" @click="release">发布到官方圈</el-button>
                    <el-button type="text" @click="cancel">取消发布</el-button>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import choiceBox from '@/components/choiceBox.vue'
    import search from '@/components/search.vue'
    import '../../../static/utf8-jsp/ueditor.config';
    import '../../../static/utf8-jsp/ueditor.all';
    import '../../../static/utf8-jsp/lang/zh-cn/zh-cn';
    export default {
        name: 'index',
        components: {
            choiceBox,
            search
        },
        data() {
            return {
                intoClick: '0',
                intocontent: '官方圈搜索',
                //图片
                dialogImageUrl: '',
                dialogVisible: false,
                getImg: {
                    url: ''
                },
                uploadImg: [],
                //routerId
                routerId: '',
                editor: '',
                //病种ID
                diseaseID: '',
                //病种
                disease: [],
                disease2: [],
                value1: [],
                value2: [],
                updateOffical: {
                    title: '',
                    author: '',
                    content: '',
                },
                editOffical: {
                    title: '',
                    author: '',
                    content: '',
                },
                //上传
                ifUpdate: false,
                getarray: [],
                ue: ''
            }
        },
        mounted() {
            var that = this
            // this.editor = new wangeditor('#editorElem')
            // this.editor.customConfig.uploadImgShowBase64 = true
            // this.editor.customConfig.uploadFileName = 'file'
            // this.editor.customConfig.customUploadImg = function (files, insert) {
            //     var formdata = new FormData();
            //     formdata.append('file', files[0]);
            //     that.axios({
            //         method: "POST",
            //         url: 'http://47.100.15.135/TPBitz/upload/mediafile',
            //         headers:{'Content-Type': 'multipart/form-data'},
            //         data: formdata
            //     }).then(function(res) {
            //         console.log(res.data.list.param)
            //         that.editor.txt.append('<p>'+res.data.list.param+'</p>')
            //     })
            // }
            // this.editor.customConfig.onchange = (html) => {
            //     that.editOffical.content = html
            // }
            // this.editor.create()
            this.ue = UE.getEditor('ueditor', {
                BaseUrl: '',
                UEDITOR_HOME_URL: 'static/utf8-jsp/',
                toolbars: [
                    ['bold', 'italic', 'underline','simpleupload']
                ],
                 autoHeightEnabled: true,
                autoFloatEnabled: true,
                initialFrameWidth: 1000,
                initialFrameHeight: 300
            })
            this.showContent()
        },
        methods: {
            beforeUpdate(file) {
                console.log(this.editOffical)
                var that = this
                var formdata1 = new FormData();
                if (this.routerId != '-1' ? this.routerId : null) {
                    formdata1.append('officialCircleId', this.routerId);
                }
                formdata1.append('files', file);
                formdata1.append('title', this.editOffical.title);
                formdata1.append('content', this.editOffical.content);
                formdata1.append('author', this.editOffical.author);
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/officialcircle/admin/add',
                    // headers:{'Content-Type': 'multipart/form-data'},
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
                return false
            },
            //编辑页面时获取
            showContent() {
                this.routerId = this.$route.params.id
                var that = this
                if (this.routerId != '-1') {
                    this.axios({
                        method: "POST",
                        url: 'http://47.100.15.135/TPBitz/officialcircle/info',
                        params: {
                            officialCircleId: this.routerId,
                        }
                    }).then(function(res) {
                        console.log(res)
                        //已有的编辑
                        that.editOffical.title = res.data.list.title
                        that.editOffical.author = res.data.list.author
                        that.editOffical.content = res.data.list.content
                        that.editor.txt.html(res.data.list.content)
                        that.editOffical.images = res.data.list.images
                        that.uploadImg = res.data.list.images
                        that.editOffical.officialCircleId = res.data.list.officialCircleId
                        console.log(that.editOffical)
                    }).catch(function(err) {
                        console.log(err)
                    })
                }
            },
            //获取病种
            // getDisease(id) {
            //     if (id != '' || id == '0') {
            //         this.disease2 = this.disease[id].details
            //     }
            // },
            delImg(id) {
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/officialcircle/delete/image',
                    params: {
                        imageId: id
                    }
                }).then(function(res) {})
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                console.log(file)
                this.dialogImageUrl = file.url;
                console.log(this.dialogImageUrl)
                this.dialogVisible = true;
            },
            release() {
                var that = this
                this.$confirm('是否发布到官方圈', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.routerId != -1) {
                        that.updateOffical.title = that.editOffical.title
                        that.updateOffical.author = that.editOffical.author
                        that.updateOffical.content = UE.getEditor('ueditor').getContent()
                        that.updateOffical.officialCircleId = that.editOffical.officialCircleId
                        that.$refs.upload.submit();
                    } else if (this.routerId == -1) {
                        that.$refs.upload.submit();
                    }
                    // this.$router.push('/official')
                }).catch(() => {});
            },
            cancel() {
                console.log()
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
    .el-message-box {
        z-index: 20000;
    }
    .getImg {
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

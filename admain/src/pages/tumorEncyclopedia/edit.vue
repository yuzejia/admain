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
                    <el-breadcrumb-item :to="{ path: '/tumorIndex' }">肿瘤百科</el-breadcrumb-item>
                    <el-breadcrumb-item>新建肿瘤百科</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    <span>新建肿瘤百科</span>
                </div>
                <!--  -->
                <div class="content" v-show="!introductionShow && !recoveryShow">
                    <span>病种</span>
                    <div v-if="routerId==-1">
                        <el-select v-model="value1" placeholder="请选择" :focus="getDisease(value1)">
                            <el-option v-for="(item,index) in disease" :label="item.partName" :key="item.partId" :value="index">
                            </el-option>
                        </el-select>
                        <el-select v-model="diseaseID" placeholder="请选择">
                            <el-option v-for="item in disease2" :label="item.selectName" :key="item.selectId" :value="item.selectId">
                            </el-option>
                        </el-select>
                    </div>
                    <div v-if="routerId!=-1">
                        <el-select v-model="diseaseName"></el-select>
                    </div>
                    <span class="name">疾病介绍</span>
                    <el-button class="add" size="mini" type="blue" @click="addIntroduction()">添加</el-button>
                    <el-table :data="introduction" style="width: 100%">
                        <el-table-column prop="title" label="标题">
                        </el-table-column>
                        <el-table-column prop="author" label="发布人">
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" width="200">
                            <template slot-scope="scope">
                                <el-button size="mini" @click.native.prevent="deleteIntroduction(scope.$index, scope.row)" type="danger">删除</el-button>
                                <el-button size="mini" @click.native.prevent="editIntroduction(scope.$index, scope.row)">编辑</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <span>诊断依据(添加照片)</span>
                    <!-- <img v-show="routerId!=-1" class="getImg" :src="dialogImageUrl" alt=""> -->
                    <!-- <el-input placeholder="发布人或作者" style="margin-bottom: 20px"></el-input> -->
                    <el-upload action="http://47.100.15.135/TPBitz/encyclopedia/admin/diseaseurl" 
                        :data="{diseaseId:diseaseID}" 
                        list-type="picture-card" 
                        :file-list="uploadImg"
                        :on-preview="handlePictureCardPreview" 
                        :on-remove="handleRemove"> 
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    
                    <span class="name">疾病康复</span>
                    <el-button class="add" size="mini" type="blue" @click="addRecovery()">添加</el-button>
                    <el-table :data="recovery" style="width: 100%">
                        <el-table-column prop="title" label="标题">
                        </el-table-column>
                        <el-table-column prop="author" label="发布人">
                        </el-table-column>
                        <el-table-column prop='operation' label="操作" fixed="right" width="200">
                        <template slot-scope="scope">
                            <el-button size="mini" @click.native.prevent="deleteRecovery(scope.$index, scope.row)" type="danger">
                                删除</el-button>
                            <el-button size="mini" @click.native.prevent="editRecovery(scope.$index, scope.row)">编辑</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <div class="btn">
                        <el-button class="btnA" type="text" @click="release">发布</el-button>
                        <el-button class="btnA" type="text" @click="cancel">取消发布</el-button>
                    </div>
                </div>

                <!-- 添加病种 -->
                <div class="content" v-show="introductionShow">
                    <span style="float:left">标题</span>
                    <el-input placeholder="请输入内容" v-model="newIntroduction.title"></el-input>
                    <span style="float:left">发布人</span>
                    <el-input placeholder="请输入内容" v-model="newIntroduction.author"></el-input>
                    <span>文章正文</span>
                    <div id="editorElem1" style="text-align:left"></div>
                    <div class="btn">
                        <el-button class="btnA" type="text" @click="preserveIntroduction">保存</el-button>
                        <el-button class="btnA" type="text" @click="introductionShow=false">取消</el-button>
                    </div>
                </div>

                <!-- 添加疾病康复 -->
                <div class="content" v-show="recoveryShow">
                    <span style="float:left">标题</span>
                    <el-input placeholder="请输入内容" v-model="newRecovery.title"></el-input>
                    <span style="float:left">发布人(作者)</span>
                    <el-input placeholder="请输入内容" v-model="newRecovery.author"></el-input>
                    <span>文章正文</span>
                    <div id="editorElem2" style="text-align:left"></div>
                    <div class="btn">
                        <el-button class="btnA" type="text" @click="preserveRecovery">保存</el-button>
                        <el-button class="btnA" type="text" @click="recoveryShow=false">取消</el-button>
                    </div>
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
                intoClick: '1',
                intocontent: '官方圈搜索',
                // 图片
                dialogImageUrl: '',
                dialogVisible: false,
                //routerId
                routerId: '',
                diseaseName: '',
                getImg: {
                    url: ''
                },
                uploadImg: [],
                //
                title: '',
                author: '',
                //病种ID
                diseaseID: '',
                // 病种
                disease: [],
                disease2: [],
                value1: [],
                value2: [],
                // 疾病介绍
                introduction: [],
                newIntroduction: {
                    diseaseId: '',
                    title: '',
                    author: '',
                    content: '',
                    typeId: ''
                },
                editor1: '',
                introductionShow: false,
                introductionContent: '',
                introductionIndex: '',
                // 疾病康复
                recovery: [],
                newRecovery: {
                    diseaseId: '',
                    title: '',
                    author: '',
                    content: '',
                    typeId: ''
                },
                editor2: '',
                recoveryShow: false,
                recoveryShowContent: '',
                recoveryShowIndex: '',
            }
        },
        mounted() {
            //编辑页面
            this.editor1 = new wangeditor('#editorElem1')
            this.editor1.customConfig.onchange = (html) => {
                this.newIntroduction.content = html
            }
            this.editor1.create()
            this.editor2 = new wangeditor('#editorElem2')
            this.editor2.customConfig.onchange = (html) => {
                this.newRecovery.content = html
            }
            this.editor2.create()
            var that = this
            //病种
            this.axios({
                method: "POST",
                url: 'http://47.100.15.135/TPBitz/encyclopedia/disease',
            }).then(function(res) {
                // console.log(res)
                that.disease = res.data.list
            }).catch(function(err) {
                console.log(err)
            })
            this.showContent()
        },
        methods: {
            //编辑页面时获取
            showContent() {
                console.log(123)
                this.routerId = this.$route.params.id
                var that = this
                this.introduction = []
                this.recovery = []
                if (this.routerId != '-1') {
                    this.axios({
                        method: "POST",
                        url: 'http://47.100.15.135/TPBitz/encyclopedia/info',
                        params: {
                            diseaseId: this.routerId,
                        }
                    }).then(function(res) {
                        console.log(res)
                        that.diseaseName = res.data.list.diseaseName
                        that.diseaseID = res.data.list.diseaseId
                        //获取图片
                        // that.dialogImageUrl = res.data.list.diseaseUrl
                        that.getImg.url = res.data.list.diseaseUrl
                        that.uploadImg = []
                        that.uploadImg.push(that.getImg)
                        console.log(that.getImg)
                        for (var content of res.data.list.diseaseDescription) {
                            var introduction = {}
                            introduction.author = content.author
                            introduction.content = content.content
                            introduction.title = content.title
                            introduction.diseaseId = content.diseaseId
                            introduction.discriptId = content.discriptId
                            introduction.typeId = 1
                            that.introduction.push(introduction)
                        }
                        for (var content of res.data.list.diseaseRecoveryDescription) {
                            var newRecovery = {}
                            newRecovery.author = content.author
                            newRecovery.content = content.content
                            newRecovery.title = content.title
                            newRecovery.diseaseId = content.diseaseId
                            newRecovery.discriptId = content.discriptId
                            newRecovery.typeId = 2
                            that.recovery.push(newRecovery)
                        }
                    }).catch(function(err) {
                        console.log(err)
                    })
                }
            },
            //获取病种
            getDisease(id) {
                if (id != '' || id == '0') {
                    this.disease2 = this.disease[id].details
                }
            },
            //疾病添加
            addIntroduction() {
                if (this.diseaseID) {
                    this.introductionShow = true;
                    this.introductionContent = '添加';
                    this.newIntroduction = {}
                    this.newIntroduction.diseaseId = this.diseaseID
                    this.editor1.txt.html('')
                } else {
                    this.$message({
                        message: '未选择病种，请先选择病种',
                        type: 'warning'
                    });
                }
            },
            //疾病编辑
            editIntroduction(id, row) {
                console.log(row)
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/encyclopedia/descript/info',
                    params: {
                        id: row.discriptId
                    }
                }).then(function(res) {
                    console.log(res)
                    that.introductionShow = true;
                    that.introductionContent = '编辑';
                    that.introductionIndex = id
                    that.newIntroduction = res.data.list
                    that.editor1.txt.html(res.data.list.content)
                })
            },
            //疾病删除
            deleteIntroduction(index, row) {
                console.log()
                var that = this
                this.$confirm('是否删除', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        method: "POST",
                        url: 'http://47.100.15.135/TPBitz/encyclopedia/admin/delete',
                        params: {
                            descriptId: row.discriptId
                        }
                    }).then(function(res) {
                        that.introduction.splice(index, 1)
                        that.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                    })
                }).catch(() => {});
            },
            //疾病保存
            preserveIntroduction() {
                console.log(this.newIntroduction)
                if (this.introductionContent == '添加') {
                    if (this.newIntroduction.title != null && this.newIntroduction.author != null && this.newIntroduction.content != null) {
                        this.introduction.push(this.newIntroduction)
                        this.newIntroduction.typeId = 1
                        console.log(this.newIntroduction)
                        this.axios({
                            method: "POST",
                            url: 'http://47.100.15.135/TPBitz/encyclopedia/admin/add/descript',
                            params: this.newIntroduction
                        }).then(function(res) {
                            console.log(res)
                        }).catch(function(err) {
                            console.log(err)
                        })
                    } else {
                        this.$message({
                            message: '请填写完整',
                            type: 'warning'
                        });
                        return
                    }
                    //初始化
                    this.newIntroduction = {}
                    this.editor1.txt.html('')
                    this.introductionShow = false
                } else {
                    console.log(this.newIntroduction)
                    this.axios({
                        method: "POST",
                        url: 'http://47.100.15.135/TPBitz/encyclopedia/admin/edit/descript',
                        params: this.newIntroduction
                    }).then(function(res) {
                        console.log(res)
                    })
                    this.newIntroduction = {}
                    this.editor1.txt.html('')
                    this.showContent()
                    this.introductionShow = false
                }
            },
            //图片的获取
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //康复添加
            addRecovery() {
                if (this.diseaseID) {
                    this.recoveryShow = true;
                    this.recoveryContent = '添加';
                    this.newRecovery = {}
                    this.newRecovery.diseaseId = this.diseaseID
                    this.editor2.txt.html('')
                } else {
                    this.$message({
                        message: '未选择病种，请先选择病种',
                        type: 'warning'
                    });
                }
            },
            //康复编辑
            editRecovery(id, row) {
                console.log(row)
                var that = this
                this.axios({
                    method: "POST",
                    url: 'http://47.100.15.135/TPBitz/encyclopedia/descript/info',
                    params: {
                        id: row.discriptId
                    }
                }).then(function(res) {
                    console.log(res)
                    that.recoveryShow = true;
                    that.recoveryContent = '编辑';
                    that.recoveryIndex = id
                    that.newRecovery = res.data.list
                    that.editor2.txt.html(res.data.list.content)
                })
            },
            //康复删除
            deleteRecovery(index, row) {
                var that = this
                this.$confirm('是否删除', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        method: "POST",
                        url: 'http://47.100.15.135/TPBitz/encyclopedia/admin/delete',
                        params: {
                            descriptId: row.discriptId
                        }
                    }).then(function(res) {
                        that.recovery.splice(index, 1)
                        that.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                    })
                }).catch(() => {});
            },
            //康复保存
            preserveRecovery() {
                if (this.recoveryContent == '添加') {
                    if (this.newRecovery.title != null && this.newRecovery.author != null && this.newRecovery.content != null) {
                        this.recovery.push(this.newRecovery)
                        this.newRecovery.typeId = 2
                        this.axios({
                            method: "POST",
                            url: 'http://47.100.15.135/TPBitz/encyclopedia/admin/add/descript',
                            params: this.newRecovery
                        }).then(function(res) {
                            console.log(res)
                        }).catch(function(err) {
                            console.log(err)
                        })
                    } else {
                        this.$message({
                            message: '请填写完整',
                            type: 'warning'
                        });
                        return
                    }
                    //初始化
                    this.newRecovery = {}
                    this.editor2.txt.html('')
                    this.recoveryShow = false
                } else {
                    console.log(this.newRecovery)
                    this.axios({
                        method: "POST",
                        url: 'http://47.100.15.135/TPBitz/encyclopedia/admin/edit/descript',
                        params: this.newRecovery
                    }).then(function(res) {
                        console.log(res)
                    })
                    this.newRecovery = {}
                    this.editor2.txt.html('')
                    this.showContent()
                    this.recoveryShow = false
                }
            },
            //发布到官方圈
            release() {
                console.log(this.introduction)
                this.$confirm('是否发布到官方圈', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '发布成功!'
                    });
                }).catch(() => {});
            },
            cancel() {}
            //上传图片
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
    .name {
        float: left;
    }
    .add {
        float: right;
        margin: 20px 65px 20px 0;
    }
    .content span {
        display: block;
        margin: 20px 0;
        color: #999
    }
    .btn {
        float: right;
        margin-top: 100px;
    }
    .btnA {
        background: #09A5D9;
        color: #FFF;
        padding: 10px 20px;
        width: 200px;
    }
    .getImg {
        float: left;
        margin-right: 20px;
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        line-height: 146px;
        vertical-align: top;
    }
</style>

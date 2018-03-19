<template>
    <div>
        <i class="el-icon-search" style="color:#1D96D7;font-size:25px;align-items:center"></i>
        <el-input v-model="input" :placeholder="content" style="position: absolute; width: 500px; margin-left: 10px;"></el-input>
    </div>
</template>

<script>
    export default {
        name: 'choice',
        props: ['content'],
        data() {
            return {
                input: ''
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

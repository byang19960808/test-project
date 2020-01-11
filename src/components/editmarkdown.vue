<template>
    <div class="mark_item">
        <p>{{i+1}} . {{item.title}}</p>
        <Markdown v-model="item.questions_stem" :height="200" style="width:98%; margin:auto; border:none;" :isPreview="true" theme="gitHub" bordered="false"/>
        <Markdown v-model="item.questions_answer" :height="300" style="width:98%; margin:auto; border:none;" :isPreview="true"/>
    </div>
</template>

<script>
import Markdown from 'vue-meditor'
export default {
    components:{
        Markdown
    },
    props:['item', 'i'],
    methods:{
    
    }
}
</script>

<style lang="scss" scoped>
.mark_item{
    width: 95%;
    margin: 50px auto;
    border:1px solid #ccc;
    border-radius: 10px;
    margin-top: 30px;
    p{
        width: 98%;
        text-indent: 1em;
        word-wrap: break-word; 
        word-break: normal; 
        margin: 15px 15px;
    }
    h3{
        width: 100%; 
        text-indent: 1em;
    }
}
</style>

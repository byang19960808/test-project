<template>
    <div class="box_">
         <p class="management">查看试题</p>
              <div class="box_top">
                    <div class="box-con">
                      <span>课程类型 ： </span>
                    <el-tabs  @tab-click="handleClick">
                      <el-tab-pane :label="item"  v-for="(item,index) in date" :key="index"></el-tab-pane>
                    </el-tabs>
                    </div>
                       <div class="box_con">
                        <div class="left_box"> 
                            <span>考试类型 : </span>
                            <el-select v-model="value" placeholder="请选择" class="select" style="width: 300px;">
                                <el-option
                                  v-for="(item, index) in addexamType"
                                  :key="index"
                                  :label="item.exam_name"
                                  :value="item.exam_name">
                                </el-option>
                              </el-select>
                         </div>
                          <div class="right_box"> 
                                 <span>题目类型 : </span>
                                <el-select v-model="Value" placeholder="请选择" class="select" style="width: 300px;">
                                  <el-option
                                    v-for="item in Questions"
                                    :key="item.value"
                                    :label="item.questions_type_text"
                                    :value="item.questions_type_text">
                                  </el-option>
                                </el-select>
                          </div>
                           <el-button type="primary" icon="el-icon-search" class="btn" @click="Search">搜索</el-button>
                            <el-button type="primary" class="btn" @click="Reset">重置</el-button>
                      </div>
              </div>
           
          <div class="box_bottom">
           <ul class="list" v-if="List.length">
             <li v-for="(item,index) in List" :key="index" >
               <div @click="fn(item)"><p>{{item.title}}</p><p><span>{{item.questions_type_text}}</span><span>{{item.subject_text}}</span><span>{{item.exam_name}}</span></p>
               <p><span>{{item.user_name}}</span><span>发布 </span></p>
               </div>
               <div @click="questionClick(item)">编辑</div>
             </li>
           </ul>
           <ul class="list" v-else>
             <li class="newLi">没有数据</li>
           </ul>
         </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import http from '../../../util/axiosAgain';
export default {
    data(){
        return {
            activeName: 'second',
            addexamType:[],
            management:[],
            Questions:[],
            date:["All", "javaScript上", 'javaScript下', '模块化开发移动端开发', 'node基础组件化开发', '(vue)渐进式开发', '(react)项目实战', 'javaScript高级', 'node高级'],
            options: [],
            value: '',
            Value:'',
            List:this.data,
            tab:'All'
        }
    },
    methods: {
        ...mapActions("Check", ["gitCheck", "getQuestions"]),
        handleClick(tab) {
            console.log(tab.label);
            this.tab = tab.label
        },
        fn(item){
            this.$router.push({name:"look_questionsDetail", params:{name:item}})     
        },
        questionClick(item){
            this.$router.push({name:"look_questionsEdit", params:{id:item}})   
        },
        getoption(){//获取配置项
            http.get('/exam/subject').then(res=>{//所有的课程
                if(res.data.code === 1){
                    this.management = res.data.data;
                    
                }
            });
            http.get('/exam/examType').then(res=>{//考试类型
                if(res.data.code === 1){
                    this.addexamType = res.data.data;
                }
            });
            http.get('/exam/getQuestionsType').then(res=>{// 题目类型
                if(res.data.code === 1){
                    this.Questions = res.data.data
                }
            })
        },   
        Search(){
            let arr = this.data.filter(item=>item.exam_name.includes(this.value) && item.questions_type_text.includes(this.Value))
            this.List = arr
            if(this.tab !== "All"){
                let newArr = this.data.filter(item=>item.subject_text.includes(this.tab) && item.exam_name.includes(this.value) && item.questions_type_text.includes(this.Value))
                console.log(newArr, this.data)
                this.List = newArr
            }

        },
        Reset(){
            this.value = ""
            this.Value = ""
            if(this.tab === "All"){
                this.List = this.data
            }
        }   
    },
    created() {
        this.gitCheck()
        this.getoption()
        
        
    },
    mounted() {
        http.get("/exam/questions/new").then(res=>{
            this.List = res.data.data
        })
        
    },
    computed: {
        ...mapState("Check", ["data"])
    },
}
</script>

<style lang="scss" scoped>
.box_top {
  width: 100%;
  height: 210px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  font-size: 14px;
  
  .box-con{
     width: 100%;
     height: 30px;
     margin: 40px 10px;
     display: flex;
      span{
          width: 100px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
  }
  .box_con{
     width: 90%;
     height: 40px;
     margin: 20px 10px;
     display: flex;
     margin-top: 40px;
     .left_box{
      
       span{
         padding: 10px;
       }
     }
     .right_box{
       margin-left: 10px;
       span{
         padding: 10px;
      
       }
     }
     .select{
       margin-left: 20px;
       
     }
  }
  .btn{
    margin-left: 30px;
  }
}
.box_bottom{
  width: 97%;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  margin-top: 30px;
  font-size: 14px;
  .list{
    width: 100%;
    height: 100%;
    .newLi{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 25px;
      /* color: #f2e7e5; */
      font-family: "华文新魏";
      border: 0;
    }
    .newLi:hover{
     background: #fff;
    }
    li:hover{
      background: #F7F8FF;
      cursor: pointer;
    }
    li{
      width: 97%;
      margin: 0 auto;
      height: 150px;
      display: flex;
      border-bottom: 1px solid #ccc;
      div{
        &:nth-child(1){
          flex: 9;
          display: flex;
          flex-direction: column;
          p{
            flex: 1;
            display: flex;
            align-items: center;
            &:nth-child(2){
               span{
                 margin-right: 20px;
                 border: 1px solid ;
                 padding: 4px 10px;
                 border-radius: 5px;
                 &:nth-child(1){
                    border-color:#91D5FF; 
                    background: #E6F7FF;
                    color: #1890FF;
                 }
                 &:nth-child(2){
                    border-color:#ADC6FF; 
                    background: #F0F5FF;
                    color: #2F54EB;
                 }
                 &:nth-child(3){
                   border-color:#FFD591; 
                    background: #FFF7E6;
                    color: #FA944C;

                 }
               }
            }
            &:nth-child(3){
              color: #0139FD;
              span{
                &:nth-child(2){
                  margin-left: 10px;

                 }
              }
            }
          }
        }
        &:nth-child(2){
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #0139FD;
        }
      }
    }
  }

}
</style>
<style>
.el-tabs__active-bar{
  background: #fff;
}
.el-tabs__nav-scroll{
  border: none;
}
.el-tabs__nav-wrap::after{
  background-color: #fff;
}
.el-tabs__item{
  padding: 0 9px;
}

</style>


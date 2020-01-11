import Vue from 'vue'
import VueRouter from 'vue-router';
//import Vuex from '../store/index'

Vue.use(VueRouter)

const routes = [
    {path: '/login', name: 'login', component: () => import('../views/Login.vue') },
    {
        path: '/main', name: 'main', component: () => import('../views/Main.vue'), meta:{ auther:['管理员', '出题者', '浏览者'] },
        children: [
            { path: 'addquestions', component: () => import('../views/main/exam/AddQuestions.vue') },
            { path: 'questiontype', component: () => import('../views/main/exam/QuestionType.vue') },
            { path: 'watchquestions', component: () => import('../views/main/exam/WatchQuestions.vue') },
            { path: 'adduser', component: () => import('../views/main/user/AddUser.vue') },
            { path: 'showuser', component: () => import('../views/main/user/ShowUser.vue') },
            { path: 'addexam', component: () => import('../views/main/exam/AddExam.vue') },
            { path: 'examlist', component: () => import('../views/main/exam/ExamList.vue') },
            { path: 'classlist', component: () => import('../views/main/grade/ExamPaperClassList.vue') },
            { path: 'grade', component: () => import('../views/main/grade/Grade.vue') },
            { path: 'student', component: () => import('../views/main/grade/Student.vue') },
            { path: 'room', component: () => import('../views/main/grade/Room.vue') },
            {path:"classmate", name:"classmate", component: () => import('../views/main/grade/classmate.vue')},  
            {path:"detail", name:"detail", component: () => import('../views/main/grade/detail.vue')}, 
            {path:'examlistdetial', component:()=>import('../views/main/exam/examlistdetial.vue')}, 
            {path:"look_questionsDetail", name:"look_questionsDetail", component: () => import('../views/main/exam/look_questionsDetail.vue')}, 
            {path:"look_questionsEdit", name:"look_questionsEdit", component: () => import('../views/main/exam/look_questionsEdit.vue')}, 
            { path: 'exam', component: () => import('../views/main/exam/Exam.vue'),
                children: [ 
                    { path: 'edit', component: ()=> import('../views/main/exam/Edit.vue'), meta:{ auther:['管理员', '出题者'] } }
                ]
            }
        ]
    },
    { path: '/', redirect: '/login' }
]

const router = new VueRouter({ mode: 'history', base: process.env.BASE_URL, routes })
export default router

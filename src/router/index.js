import Vue from 'vue'
import VueRouter from 'vue-router';
//import Vuex from '../store/index'

Vue.use(VueRouter)

const routes = [
    {path: '/login', name: 'login', component: () => import('../views/Login.vue') },
    {
        path: '/main', name: 'main', component: () => import('../views/Main.vue'), meta:{ auther:['管理员', '出题者', '浏览者'] },
        children: [
            { path: 'addquestions', component: () => import('../views/main/exam/AddQuestions.vue'), meta:{ auther:['管理员', '出题者'] } },
            { path: 'questiontype', component: () => import('../views/main/exam/QuestionType.vue'), meta:{ auther:['管理员', '出题者', '浏览者'] } },
            { path: 'watchquestions', component: () => import('../views/main/exam/WatchQuestions.vue'), meta:{ auther:['管理员', '出题者', '浏览者'] } },
            { path: 'adduser', component: () => import('../views/main/user/AddUser.vue'), meta:{ auther:['管理员'] } },
            { path: 'showuser', component: () => import('../views/main/user/ShowUser.vue'), meta:{ auther:['管理员'] } },
            { path: 'addexam', component: () => import('../views/main/exam/AddExam.vue'), meta:{ auther:['管理员', '出题者'] } },
            { path: 'examlist', component: () => import('../views/main/exam/ExamList.vue'), meta:{ auther:['管理员', '出题者', '浏览者'] } },
            { path: 'classlist', component: () => import('../views/main/grade/ExamPaperClassList.vue'), meta:{ auther:['管理员', '出题者', '浏览者'] } },
            { path: 'grade', component: () => import('../views/main/grade/Grade.vue'), meta:{ auther:['管理员'] } },
            { path: 'student', component: () => import('../views/main/grade/Student.vue'), meta:{ auther:['管理员', '出题者', '浏览者'] } },
            { path: 'room', component: () => import('../views/main/grade/Room.vue'), meta:{ auther:['管理员'] } },  
            { path: 'exam', component: () => import('../views/main/exam/Exam.vue'), meta:{ auther:['管理员', '出题者', '浏览者'] }, 
                children: [ 
                    { path: 'edit', component: ()=> import('../views/main/exam/Edit.vue'), meta:{ auther:['管理员', '出题者'] } }
                ]
            }
        ]
    },
    { path: '/', redirect: '/login' }
]

const router = new VueRouter({ mode: 'history', base: process.env.BASE_URL, routes })

// router.beforeEach((to, _, next)=>{
//     if(Vuex.state.FilterMethod.defaultRouter){
//         next()
//     }
//     console.log(Vuex.state.FilterMethod.defaultRouter, next)
//     next('/login')
// })

export default router

import request from '../util/axiosAgain'

// 添加班级
export const addClassRoom = (data) => request.post('/manger/room', data) 

// 获取教室接口
export const getAllClassRoom = () => request.get('/manger/room')

// 删除教室
export const deleteClassRoom = (id) => request.delete('/manger/room/delete', {data:{Roomid:id}})

// 获取已经分配教室的班级的接口
export const getIfClassRoom = () => request.get('/manger/grade') 

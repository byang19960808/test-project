import request from '../util/axiosAgain'

// 添加教室
export const addClassRoom = (data) => request.post('/manger/room', {...data}) 

// 获取教室接口
export const getAllClassRoom = () => request.get('/manger/room')

// 删除教室
export const deleteClassRoom = (id) => request.delete('/manger/room/delete', {room_id:id})

// 获取已经分配教室的班级的接口
export const getIfClassRoom = () => request.get('/manger/grade') 

// 删除班级接口
export const deleteClass = (id)=>request.delete('/manger/grade/delete', {grade_id:id})

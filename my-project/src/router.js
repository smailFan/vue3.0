import Vue from 'vue'
import Router from 'vue-router'

const routerList = []
function importAll(r) {
  r.keys().forEach(
    (key) => routerList.push(r(key).default)
  )
}
// api 第一个参数：目标文件夹
// 第二个参数：是否查找子集
// 第三个参数是正则匹配
importAll(require.context('./router', true, /\.routes\.js/))
Vue.use(Router)
export default new Router({
  routes: [
    ...routerList
  ]
})

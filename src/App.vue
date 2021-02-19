<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <todo-header @addItem="addItem"></todo-header>
        <todo-list :todolist="todoList"></todo-list>
        <todo-footer 
          :todolist="todoList" 
          @footerChecked="footerChecked"
          @deleteCheckedAll="deleteCheckedAll"
        >
        </todo-footer>
      </div>
    </div>
  </div>
</template>

<script>
import todoHeader from './components/todo-header'
import todoList from './components/todo-list'
import todoFooter from './components/todo-footer' 
import storage from './utile/storage'
export default {
  name: 'App',
  data(){
    return {
      todoList:[]
    }
  },
  methods:{
    //该方法用于当选中todolist中事项的复选框时，修改App组件中的数据
    checked(value,id){
      this.todoList.forEach((item)=>{
        if(item.id === id) item.checked = value
      })
    },
    //该方法用于添加每一个代办事项
    addItem(item){
      this.todoList.unshift(item)
    },
    //该方法用于删除每一个代办事项
    deleteItem(id){
      this.todoList = this.todoList.filter((item)=>{
        return item.id !== id
      })
    },
    //实现todo-footer组件中,复选框选中后 todo-list组件中每一项都选中，反之footer勾除，list也要都勾除
    footerChecked(flag){
      this.todoList.forEach((item)=>{
        item.checked = flag
      })
    },
    //用于清除所有已完成任务
    deleteCheckedAll(){
      this.todoList = this.todoList.filter((item)=>{
        return item.checked === false
      })
    }
  },
  mounted(){
    this.bus.$on('checked',this.checked)
    this.bus.$on('deleteItem',this.deleteItem)
    //组件一挂载后就向浏览器的localStorage上拿取数据存入data中 拿不到则返回[]
    this.todoList = storage.get('todoList',[])
  },
  watch:{
    todoList:{
      handler(value){  // 只有data数据中发生了变化 就调用 handler 函数 把变化后的数据存入 localStorage中
        storage.set('todoList',value)
      },
      deep:true //深度监听数据data的变化
    }
  },
  components:{
    "todo-header":todoHeader,
    "todo-list":todoList,
    "todo-footer":todoFooter
  }
}
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>

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
export default {
  name: 'App',
  data(){
    return {
      todoList:[
        {key:0,text:'吃饭',checked:false},
        {key:1,text:'睡觉',checked:false},
        {key:2,text:'打王者',checked:false},
      ]
    }
  },
  methods:{
    //该方法用于当选中todolist中事项的复选框时，修改App组件中的数据
    checked(value,key){
      this.todoList.forEach((item)=>{
        if(item.key === key) item.checked = value
      })
    },
    //该方法用于添加每一个代办事项
    addItem(item){
      this.todoList.unshift(item)
    },
    //该方法用于删除每一个代办事项
    deleteItem(key){
      this.todoList = this.todoList.filter((item)=>{
        return item.key !== key
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

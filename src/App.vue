<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <todo-header @addItem="addItem"></todo-header>
        <todo-list :todolist="todoList"></todo-list>
        <todo-footer></todo-footer>
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
    addItem(item){
      this.todoList.unshift(item)
    }
  },
  mounted(){
    this.bus.$on('checked',this.checked)
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

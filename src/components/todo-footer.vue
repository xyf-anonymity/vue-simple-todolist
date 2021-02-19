<template>
  <div class="todo-footer">
        <label>
          <input type="checkbox" v-model="checkedAll" />
        </label>
        <span>
          <span>已完成 <i style="color:green">{{achievedItemNum}}</i></span> / 全部 <i style="color:red">{{todolist.length}}</i>
        </span>
        <button class="btn btn-danger" @click="deleteCheckedAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name:'v-footer',
  props:{
    todolist:Array,
  },
  computed:{
    achievedItemNum(){
      return this.todolist.reduce((accumulator,item)=>{
        return accumulator + (item.checked ? 1 : 0)
      },0)
    },
    checkedAll:{
      get(){
        let flag = this.achievedItemNum === 0 && this.todolist.length === 0
        return (this.achievedItemNum === this.todolist.length) && !flag
      },
      set(value){
        this.$emit('footerChecked',value)
      }
    }
  },
  methods:{
    deleteCheckedAll(){
      this.$emit('deleteCheckedAll')
    }
  }
}
</script>

<style  scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
<template>
    <div class="todo-header">
    <input 
        type="text" 
        placeholder="请输入你的任务名称，按回车键确认" 
        @keydown.13="collectItem" 
        v-model="text" />
    </div>
</template>

<script>
import storage from '../utile/storage'
export default {
    name:'v-header',
    data(){
        return {
            text:''
        }
    },
    methods:{
        collectItem(){
            let id = storage.get('id',0)
            let item = {id,text:this.text,checked:false}
            this.$emit('addItem',item),
            this.text = '',
            storage.set('id',id + 1)  //保证每新增一项待办任务的id都是唯一
        }
    }
}
</script>

<style  scoped>
    .todo-header input {
        width: 560px;
        height: 28px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 7px;
    }

    .todo-header input:focus {
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }
</style>
<template>
    <ul class="todo-main">
        <list-item  
            v-for="item 
            in todolist" 
            :key="item.key" 
            :item="item"
        >
        </list-item>
    </ul>
</template>

<script>
import listItem from './list-item'
export default {
    name:'v-list',
    props:{
        todolist:Array
    },
    data(){
        return {
            hightlight:true
        }
    },
    components:{
        "list-item":listItem
    },
}
</script>

<style  scoped>
    .todo-main {
        margin-left: 0px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: 0px;
    }

    .todo-empty {
        height: 40px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding-left: 5px;
        margin-top: 10px;
    }
</style>
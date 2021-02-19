<template>
    <li  
        :class={highlight:highlight,line:ischecked}
        @mouseenter="highlight=true"
        @mouseleave="highlight=false"
    >
        <label>
        <input type="checkbox" v-model="ischecked" />
        <span> {{item.text}}</span>
        </label>
        <button 
            class="btn btn-danger" 
            :class={display:highlight}
            @click="deleteItem"
        >
         <!-- :style="{display:highlight?'block':'none'}" -->
            删除
        </button>
    </li>
</template>

<script>
export default {
    name:'v-item',
    props:{
        item:Object
    },
    data(){
        return {
            highlight:false
        }
    },
    computed:{
        ischecked:{
            get(){
                return this.item.checked
            },
            set(value){
                this.bus.$emit('checked',value,this.item.id) 
            }
        }
    },
    methods:{
        deleteItem(){
            this.bus.$emit('deleteItem',this.item.id)
        }
    }
}
</script>

<style  scoped>

    .display {
        display: block !important;
    }

    .highlight {
        background-color: skyblue !important;
    }

    .line {
        position: relative;
    }

    .line::after {
        position: absolute;
        top: 50%;
        bottom: 0;
        left: 4%;
        right: 0;
        display: block;
        content: '';
        background-color: red;
        width: 85%;
        height: 1px;
    }

    li {
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }

    li label {
        float: left;
        cursor: pointer;
    }

    li label li input {
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }

    li button {
        float: right;
        display: none;
        margin-top: 3px;
    }

    li:before {
        content: initial;
    }

    li:last-child {
        border-bottom: none;
    }
</style>
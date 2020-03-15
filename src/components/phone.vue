<template>
    <div class = "box" @click = "fullScreen" :class = "{hide: hidden}">
      <doors></doors>
      <rent></rent>
    </div>
</template>

<script>
  import doors from './dash/doors'
  import rent from './dash/rent'

  export default {
    name: 'phone',
    components: {
      rent,
      doors,
    },
    props: {
      hide: {
        type: Boolean,
        default: false,
      }
    },
    data(){
      return{
        hidden: true,
      }
    },
    watch: {
      hide: function(a){
        console.log('some');
        this.hidden = a;
      }
    },
    methods:{
      fullScreen(){
        window.scrollTo(0,1);
      },
    },
    mounted(){
      setTimeout(() => {
        this.hidden = false;

      }, 1000)
    },
    created(){
      console.log('this2');
    }
  }
</script>
<style>
  .phone{
    transition: var(--my-cube);
    height: 100%;
    width: 100%;
    max-width: 450px;
    float: right;
    position: relative;
  }
  .box{
    padding: var(--padding);
    position: absolute;
    transition: var(--my-cube);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
    scroll-behavior: smooth;
    max-width: 450px;
  }
  .box::-webkit-scrollbar {
    display: none;
  }


</style>

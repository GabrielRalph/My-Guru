<template>
  <div class = "phone" @scroll = "scroll">
    <div class = "box" :class = "{hide: hidden}">
      <doors></doors>
      <rent></rent>
    </div>
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
    data(){
      return{
        hidden: true,
      }
    },
    methods:{
      scroll(){
        alert('scroll')
      }
    },
    mounted(){
      setTimeout(() => {
        this.hidden = false;

      }, 2000)
    },
    created(){
      console.log('this2');
    }
  }
</script>
<style>
  .phone{
    margin-right: 90px;
    transition: var(--my-cube);
    position: relative;
  }
  .box{
    position: absolute;
    transition: var(--my-cube);

  }
  .box:not(.hide){
    top: 0;
  }
  .hide{
    top: -500px;
  }
</style>

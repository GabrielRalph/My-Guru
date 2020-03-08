<template>
  <div class = "phone" @scroll = "scroll">

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
    methods:{
      scroll(){
        alert('scroll')
      }
    },
    created(){
      console.log('this2');
    }
  }
</script>
<style>
  .phone{
    padding-right: 90px;

  }
</style>

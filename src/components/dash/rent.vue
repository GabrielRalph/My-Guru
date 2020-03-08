<template>
  <div ref = "rent" v-if = "rentBalance" class = "dash-container">
    <table>
      <tr>
        <td>
          <h1>Due on</h1>
        </td>
        <td style = "border-left: 1px solid white; padding-left:15px">
          <h2>Balance</h2>
        </td>
      </tr>
      <tr style  = "height: 10px">
        <td></td>
        <td style = "border-left: 1px solid white; padding-left:15px"></td>
      </tr>
      <tr>
        <td>
          <h3>7 Jun</h3>
        </td>
        <td style = "border-left: 1px solid white; padding-left:15px">
          <h4>{{rent}}</h4>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'rent',
    data(){
      return {
        rentBalance: false,
        color: false,
      }
    },
    computed:{
      rent(){
        return ((this.rentBalance < 0) ?'-':'') + '$' + Math.abs(this.rentBalance)
      }
    },
    updated(){
      this.$refs.rent.style.setProperty('--text-color', this.color)
    },
    created(){
      firebase.database().ref('users/rent-balance/'+firebase.auth().currentUser.uid).on('value', (sc) => {
        this.rentBalance = sc.val();
        this.color = '#f94242';
        if(sc.val()){
          if(sc.val() > -400&sc.val()<1){
            this.color = '#f9c142';
          }else if(sc.val() > 0&sc.val()<200){
            this.color = '#a7ef1b';
          }else if(sc.val() > 200){
            this.color = '#1bef3f';
          }
        }
      })
    }
  }
</script>
<style scoped>
.dash-container{
  --text-color: #f94242;
  background: var(--panel-color);
  border-radius: var(--my-radius);
  padding: 20px;
  margin-top: 15px;
}

.dash-container td{
  width: 100%;
  color: white;
  font-family: 'Guru';
}
h1{
  font-size: 16px;
}
h2{
  font-size: 16px;
  font-style: italic;
}
h3{
  font-size: 16px;
}
h4{
  font-size: 16px;
  color: var(--text-color)
}
</style>

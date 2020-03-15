<template>
  <div ref = "rent" v-if = "rentBalance" class = "dash-container" :class = "{glow: ergencyFlag}">
    <table>
      <tr>
        <td>
          <h1>Due on</h1>
        </td>
        <td style = "border-left: 2px solid white; padding-left:15px">
          <h2>Balance</h2>
        </td>
      </tr>
      <tr style  = "height: 10px">
        <td></td>
        <td style = "border-left: 2px solid white; padding-left:15px"></td>
      </tr>
      <tr>
        <td>
          <h3>{{date}}</h3>
        </td>
        <td style = "border-left: 2px solid white; padding-left:15px">
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
        date: '',
        color: false,
        ergencyFlag: false,
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
      firebase.database().ref('dates/Rent Day').on('value', (sc) => {
        var rentDay = new Date(sc.val());
        var today = new Date();
        var difDays = (rentDay - today)/(1000*60*60*24);
        if(difDays < -3){
          rentDay.setDate(rentDay.getDate() + 14);
          firebase.database().ref('dates/Rent Day').set(String(rentDay));
        }else if(difDays == 1){
          this.ergencyFlag = true;
          return "Tomorrow"
        }else if(difDays == 0){
          this.ergencyFlag = true;
          return "Today"
        }else if(difDays == -1){
          this.ergencyFlag = false;
          return "Yesterday"
        }else if(difDays < -1){
          this.ergencyFlag = false;
          return Math.abs(difDays) + ' days ago'
        }else{
          this.ergencyFlag = false;
          var dateString = String(rentDay);
          this.date = dateString.split(' ')[0] + ' ' + dateString.split(' ')[1] + ' ' + dateString.split(' ')[2]
        }

      })
      firebase.database().ref('usersRev1/rentAccounts/'+firebase.auth().currentUser.uid).on('value', (sc) => {
        this.rentBalance = sc.val().balance;
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
  margin-top: var(--padding);
}

.glow{
  border: 3px solid white;
  box-shadow: 0px 0px 5px white;
}
table{
  border-collapse: collapse;
  width: 100%;
}
tr{
  border: none;
}
.dash-container td{
  width: 50%;
  color: white;
  font-family: 'Guru';
}
h1{
  font-size: 16px;
}
h2{
  font-size: 16px;
  font-style: italic;
  float: right;
}
h3{
  font-size: 16px;
}
h4{
  font-size: 16px;
  color: var(--text-color);
  float: right;
}
</style>

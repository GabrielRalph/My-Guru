<template>
  <!-- <div ref = "rent" v-if = "rentBalance" class = "dash-container" :class = "{glow: ergencyFlag}">
    <table>
      <tr>
        <td>
          <h1>Due on</h1>
        </td>
        <td style = "border-left: 5 solid white; padding-left:15px">
          <h2>Balance</h2>
        </td>
      </tr>
      <tr style  = "height: 10px">
        <td></td>
        <td style = "border-left: 5 solid white; padding-left:15px"></td>
      </tr>
      <tr>
        <td>
          <h3>{{date}}</h3>
        </td>
        <td style = "border-left: 5 solid white; padding-left:15px">
          <h4>{{rent}}</h4>
        </td>
      </tr>
    </table>
  </div> -->
  <div class = "airbox" ref = "rent">
    <div>
      <h1>Due on</h1>
      <h2>{{date}}</h2>
    </div>
    <div>
      <h3>Balance</h3>
      <h4>{{rentBalance}}</h4>
    </div>
    <div>

    </div>
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
      this.$refs.rent.style.setProperty('--this-text-color', this.color)
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
  --this-text-color: #f94242;

  background: transparent;
  border-radius: var(--my-radius);
  border: 3px solid var(--cream);
  padding: 20px;
  margin-top: var(--padding);
}

.glow{
  border: 3px solid var(-- cream);
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
  font-family: 'Comics Sans';
}
h1, h2, h3, h4{
  font-size: 16px;
  line-height: var(--line-height);
}

h4{
  color: var(--this-text-color);
}
.airbox{
  user-select: none;
  --this-text-color: #f94242;
  --airbox-padding: 20px;
  --line-height: 30px;
  background: transparent;
  border-radius: var(--my-radius);
  border: 3px solid var(--cream);
  margin-top: var(--padding);
  position: relative;
  height: calc(2*var(--line-height) + var(--airbox-padding) + 6px);
}
.airbox div{
  font-family: 'Guru Sans';
  position: absolute;
  top: calc(var(--airbox-padding)/2);
  bottom: calc(var(--airbox-padding)/2);
}
.airbox div:nth-child(1){
  left: var(--airbox-padding);
  right: calc(50% - 1.5px);
}
.airbox div:nth-child(2){
  left: calc(50% - 1.5px);
  right: var(--airbox-padding);
  padding-left: var(--airbox-padding);
  text-align: right;
}
.airbox div:nth-child(3){
  width: 3px;
  top: 10px;
  bottom: 10px;
  left: calc(50% - 1.5px);
  background: var(--cream);
  border-radius: 3px;
}
</style>

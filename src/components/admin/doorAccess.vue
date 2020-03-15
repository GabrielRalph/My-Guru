<template>
  <div class= "scroll-box">
    <div v-if = "pop" class = "popup">
      <div v-for = "(value, door) in doors" :key = "door +'door2'">
        <v-icon :color = "onOff(door)"  @click = "changeDoor(door)" :class = "{invisible: true}" class = "select">check_circle</v-icon>
        <span style = "padding-left: 15px">{{door}}</span>
      </div>
      <div class = "done-button" @click = "pop = false">
        Done
      </div>
    </div>
    <table v-if = "users">
      <tr>
        <td>
          <v-icon color = '#FFFFFF'>search</v-icon>
          <input v-model = "search"/>
          <v-icon color = '#FFFFFF' @click = "search = ''">clear</v-icon>

        </td>
      </tr>
      <tr v-for = "(user, key) in users_filtered" :key = 'key'>
        <td>
          <img :src = "user.photoURL" />
          {{user.displayName}}
        </td>
        <!-- <td>
          {{residents[user.uid]?residents[user.uid].committee:''}}
        </td>
        <td>
          {{residents[user.uid]?residents[user.uid].unit:''}}
        </td>
        <td>
          {{rentAccounts[user.uid]?rentAccounts[user.uid].balance:''}}
        </td> -->
        <td class = "click" @click = "pop = user.uid">
          <v-icon color = "#FFFFFF">edit</v-icon>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'door-rights',
    props:{
      hide: {
        type: Boolean,
        default: false,
      }
    },
    data(){
      return {
        users:false,
        pop: false,
        doorRights: {},
        doors: {},
        search: '',
        residents: {},
      }
    },
    computed: {
      users_filtered(){
        if(this.search.length > 0){
          var users = [];
          for(var i in this.users){
            if(this.users[i]['displayName'].toUpperCase().indexOf(this.search.toUpperCase()) != -1){
              users.push(this.users[i])
            }
          }
          return users
        }else{
          return this.users
        }
      }
    },
    methods: {
      onOff(door){
        if(this.doorAccess[this.pop]){
          if(this.doorAccess[this.pop][door]){
            return '#FFFFFF'
          }else{
            return "#FFFFFF00"
          }
        }else{
          return "#FFFFFF00"
        }
      },
      changeDoor(door){
        if(this.onOff(door) == '#FFFFFF00'){
          this.addDoor(door);
        }else{
          this.removeDoor(door);
        }
      },
      addDoor(door){
        firebase.database().ref('usersRev1/doorAccess/'+this.pop+'/'+door).set(true);
      },
      removeDoor(door){
        firebase.database().ref('usersRev1/doorAccess/'+this.pop+'/'+door).remove();
      }
    },
    created(){
      firebase.database().ref('stucco/locks').once('value').then((sc) => {
        this.doors = sc.val();
      });
      firebase.database().ref('usersRev1/profiles').on('value', (sc) => {
        this.users = [];
        for(var uid in sc.val()){
          var user = sc.val()[uid];
          user['uid'] = uid
          this.users.push(user)
        }
        this.users.sort((a, b) => {
          return a.displayName.toUpperCase() > b.displayName.toUpperCase()?1:-1
        })
      });
      firebase.database().ref('usersRev1/doorAccess').on('value', (sc) => {
        this.$forceUpdate();
        this.doorAccess = sc.val();
      });
      firebase.database().ref('usersRev1/residents').on('value', (sc) => {
        this.$forceUpdate();
        this.residents = sc.val();
      });
      firebase.database().ref('usersRev1/rentAccounts').on('value', (sc) => {
        this.$forceUpdate();
        this.rentAccounts = sc.val();
      });
    }
  }
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap');
.scroll-box{
  /* height: calc(100vh - 2*var(--padding) - 62px); */
  transition: var(--my-cube);
  overflow-y: scroll;
}
table img{
  width: 50px;
  border-radius: 35px;
  float: left;
  margin-left: -15px;
  margin-right: 15px;
}
table{
  width: 100vw;
}
table td{
  border-radius: 35px;
  background: var(--panel-color);
  line-height: 50px;
  color: white;
  padding: 0 15px;
  font-family: 'Roboto';
}
.click{
  width: 50px;
  cursor: pointer;
}
.popup{
  padding: 100px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
  overflow-y: scroll;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(35px);
}
.popup div{
  border-radius: 35px;
  background: var(--panel-color);
  line-height: 70px;
  color: white;
  padding: 0 15px;
  margin-bottom: 5px;
  font-family: 'Roboto';
}
.done-button{
  position: fixed;
  top: var(--padding);
  right: var(--padding);
  cursor: pointer;
}
input{
  margin-left: 10px;
}
input:focus{
  outline:none;
}
td:focus-within{
  border: 1px solid white;
  box-shadow: 0px 0px 5px white;
}
.v-icon{
  cursor: pointer;
}
.select{
  border: 2px solid white;
  border-radius: 50%;
  transition: var(--my-cube);
}
</style>

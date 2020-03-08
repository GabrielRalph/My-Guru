<template>
  <div>
    <div v-if = "pop" class = "popup">
      <div v-for = "(value, door) in doors" :key = "door +'door2'" @click = "addDoor(door)">
        <v-icon color = "#ffffff">done</v-icon>
        <span style = "padding-left: 15px">{{door}}</span>
      </div>
    </div>
    <table v-if = "users">
      <tr v-for = "(user, key) in users" :key = 'key'>
        <td>
          <img :src = "user.photoURL" />
          {{user.displayName}}
        </td>

        <td>
          {{user.email}}
        </td>
        <td class = "click" v-for = "(value, door) in doorRights[key]" :key = "door+'door'" @click = "remove(key, door)">
          {{door}}
          <v-icon color = "#FFFFFF">no_encryption</v-icon>
        </td>
        <td class = "click" @click = "pop = key">
          <v-icon color = "#FFFFFF">add</v-icon>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'door-rights',
    data(){
      return {
        users:false,
        pop: false,
        doorRights: {},
        doors: {},
      }
    },
    methods: {
      addDoor(door){
        firebase.database().ref('users/door-rights/'+this.pop+'/'+door).set(true);
        this.pop = false
      },
      remove(key, door){
        firebase.database().ref('users/door-rights/'+key+'/'+door).remove();
      }
    },
    created(){
      firebase.database().ref('doors').once('value').then((sc) => {
        this.doors = sc.val();
      });
      firebase.database().ref('users/profiles').on('value', (sc) => {
        this.users = sc.val();
      });
      firebase.database().ref('users/door-rights').on('value', (sc) => {
        this.doorRights = sc.val();
      });
    }
  }
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap');

table img{
  width: 70px;
  border-radius: 35px;
  float: left;
  margin-left: -15px;
  margin-right: 15px;
}
table td{
  border-radius: 35px;
  background: var(--panel-color);
  line-height: 70px;
  color: white;
  padding: 0 15px;
  font-family: 'Roboto';
}
.click{ cursor: pointer;}
.popup{
  padding: 100px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
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

</style>

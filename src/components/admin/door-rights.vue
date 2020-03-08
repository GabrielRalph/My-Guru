<template>
  <div>
    <div>

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
        <td class = "click" @click = "addRight(key)">
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
        doorRights: {},
        doors: {},
      }
    },
    methods: {
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

</style>

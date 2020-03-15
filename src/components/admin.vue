<template>
  <div id = "admin-list" ref = "adminList" class = "admin" v-if = "users">
    <div :class = "{popup: true, shown: edit_user}" @click = "edit_user = false">
      <table>
        <tr>
          <td>
            <img :src = "edit_user.photoURL" />
            <div class = "search">
              <v-icon color = "var(--cream)">done</v-icon>
              <input type = "text" v-model = "edit_user.displayName" />
            </div>
          </td>
          <td v-if = "doorAccess[edit_user.uid]">
            {{doorAccess[edit_user.uid]}}
            <div class = "search" v-for = "(on, door) in doors" :key = "door+'doorname'">
              <div class = "circle">
                <v-icon color = "var(--cream)" :class = "{slected: doorAccess[edit_user.uid][door]}">done</v-icon>
              </div>
              <span>{{door}}</span>
            </div>
          </td>

        </tr>
      </table>
    </div>
    <table>
      <tr>
        <td>
          <div class = "search">
            <v-icon color = "var(--cream)" placeholder = "search">search</v-icon>
            <input type = "text" v-model = "search" />
          </div>
        </td>
      </tr>
      <tr v-for = "user in users_filtered" :key = "user.uid">
        <td>
          <div class = "first">
            <img :src = "user.photoURL"/>
            <span>
              {{user.displayName.length>maxLetters?(user.displayName.slice(0, maxLetters)):(user.displayName)}}
            </span>
          </div>
        </td>
        <td v-if = "maxLetters > 36">
          <div class = "center">
            <span>
              {{user.email}}
            </span>
          </div>
        </td>
        <template v-if = "residents">
          <td v-if = "maxLetters > 44">
            <div class = "center">
              <span>
                {{residents[user.uid]?residents[user.uid].committee:''}}
              </span>
            </div>
          </td>
          <td v-if = "maxLetters > 50">
            <div class = "center">
              <span>
                {{residents[user.uid]?residents[user.uid].unit:''}}
              </span>
            </div>
          </td>
        </template>
        <template v-if = "attendance">
          <td v-if = "maxLetters > 52">
            <div class = "center">
              <span v-if = "attendance[user.uid]">
                {{gm(user.uid, 'cm')}}
              </span>
            </div>
          </td>
          <td v-if = "maxLetters > 54">
            <div class = "center">
              <span v-if = "attendance[user.uid]">
                {{gm(user.uid, 'gm')}}
              </span>
            </div>
          </td>
        </template>
        <td width = "50px">
          <div class = "last" @click = "edit_user = user">
            <v-icon size = "30px" color = "var(--cream)">visibility</v-icon>
          </div>
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
        edit_user: false,
        doorAccess: false,
        doors: {},
        search: '',
        residents: false,
        maxLetters: 0,
        attendance: false,
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
    mounted(){

    },
    methods: {
      gm(uid, type){
        if(this.attendance[uid][type + 'Hosted']){
          var per = this.attendance[uid][type + 'Attended']/this.attendance[uid][type + 'Hosted'];
          return '%' + Math.round(per*1000)/10;
        }else{
          return 0
        }
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
        setTimeout(()=>{
          var width = this.$refs.adminList.offsetWidth;
          this.maxLetters = (width - 140)/11;
          window.addEventListener('resize', ()=> {
            if(this.$refs.adminList){
              var width = this.$refs.adminList.offsetWidth;
              this.maxLetters = Math.round((width - 140)/14);
              console.log(this.maxLetters);
            }
          });
        },100)
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
      firebase.database().ref('usersRev1/attendance').on('value', (sc) => {
        this.$forceUpdate();
        this.attendance = sc.val();
        console.log(this.attendance);
      })
    }
  }
</script>
<style scoped>
.popup{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: var(--padding);
  transition: var(--my-cube);
}
.popup img{
  width: 100px;
}
.shown{
  opacity: 1;
  z-index: 500;
}
.popup:not(.shown){
  opacity: 0;
  z-index: -1;
}
.admin{
  font-family: 'Guru Sans';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--padding);
  overflow-y: scroll;
  overflow-x: hidden;
}
table{
  border-collapse: collapse;
  width: 100%;
}
table img{
  height: 50px;
  border-radius: 50px;
  float: left;
}
table span{
  line-height: 50px;
  float: left;
  padding-left: var(--padding);
}
td{
}
.admin::-webkit-scrollbar {
  display: none;
}
.first{
  overflow: hidden;
  border: 3px solid var(--cream);
  border-right: 0;
  border-radius: 30px 0 0 30px;
  width: 100%;
  height: 60px;
  padding: 2px;
  margin-bottom: 5px;
}
.center{
  overflow: hidden;
  border-top: 3px solid var(--cream);
  border-bottom: 3px solid var(--cream);
  width: 100%;
  height: 60px;
  padding: 2px;
  margin-bottom: 5px;
}
.last{
  border: 3px solid var(--cream);
  border-left: 0;
  border-radius: 0 30px 30px 0;
  width: 100%;
  height: 60px;
  padding: 2px;
  margin-bottom: 5px;
}
.v-icon{
  padding: 10px;
  cursor: pointer;
}
.line{
  height: 60px;
  border: 3px solid var(--cream);
  width: 3px;
  border-left: 0;
  border-right: 0;

  margin-bottom: 5px;
  border-radius: 2px;
}
.line div{
  background: var(--cream);
  height: 30px;
  border-radius: 3px;
  margin: calc((54px - 30px)/2) 0;
}
.search{
  height: 60px;
  margin-bottom: 5px;
  border-radius: 30px;
  padding: 2px;
  border: 3px solid var(--cream);
}
.search input{
  line-height: 50px;
  font-size: 20px;
}
.search input:focus{
  outline: none;
}
.circle{
  border-radius: 30px;
  border: 3px solid var(--cream);
  width: 50px;
  height: 50px;
  float: left;
}
.selected{
  opacity: 1;
}

.circle .v-icon:not(.selected){
  opacity: 0;
}
</style>

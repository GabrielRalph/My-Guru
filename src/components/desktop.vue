<template>
  <div>
    <v-window v-model = "page">
      <v-window-item>
        <!-- <table width = "100%">
          <tr>
            <td width = "70%">
              <div @click = "adminMode(mode)" class = "editor-option" v-for = "(on, mode) in adminRights" :key = "mode + 'opt'">
                {{mode}}
              </div>
            </td>
            <td width = "300px">
              <div>
              </div>
            </td>
          </tr>
        </table> -->
        <div class = "side">
          <phone></phone>
        </div>
      </v-window-item>
      <v-window-item>
        <DoorAccess></DoorAccess>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import firebase from 'firebase'
  import DoorAccess from './admin/doorAccess.vue'
  import phone from './phone'
  export default {
    name: 'desktop',
    components: {
      phone,
      DoorAccess
    },
    data(){
      return{
        adminRights: {},
        page: 0,
      }
    },
    watch: {
      switchValue: function(a){
        console.log(a);
      }
    },
    methods: {
      adminMode(){
        this.page = 1;
      }
    },
    created(){
      firebase.database().ref('usersRev1/adminRights/'+firebase.auth().currentUser.uid).on('value', (sc) => {
        this.adminRights = sc.val();
      })
    }
  }
</script>
<style scoped>
table td{
  vertical-align: top;
}
.editor-option{
  padding: 10px;
  background: var(--panel-color);
  border-radius: 30px;
  margin-bottom: 15px;
  font-family: 'Guru';
  color: white;
  width: 160px;
}
.side{
  float: right;
  width: 400px;
  height: 100vh;
}
</style>

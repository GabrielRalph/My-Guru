<template>
  <div>
    <v-window v-model = "page">
      <v-window-item>
        <table>
          <tr>
            <td width = "60%">
              <div @click = "adminMode(mode)" class = "editor-option" v-for = "(on, mode) in adminRights" :key = "mode + 'opt'">
                {{mode}}
              </div>
            </td>
            <td width = "500px">
              <div>
                <phone></phone>
              </div>
            </td>
          </tr>
        </table>
      </v-window-item>
      <v-window-item>
        <door-rights></door-rights>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import firebase from 'firebase'
  import DoorRights from './admin/door-rights'
  import phone from './phone'
  export default {
    name: 'desktop',
    components: {
      phone,
      DoorRights
    },
    data(){
      return{
        adminRights: {},
        page: 0,
      }
    },
    methods: {
      adminMode(){
        this.page = 1;
      }
    },
    created(){
      firebase.database().ref('users/admin-rights/'+firebase.auth().currentUser.uid).on('value', (sc) => {
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
</style>

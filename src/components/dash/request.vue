<template>
  <div v-if = "show">
    <v-icon @click = "sendRequest" class = "icon" size = "20px" color = "var(--cream)">send</v-icon>
    Request Resident
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'new',
    data(){
      return {
        show: true,
      }
    },
    methods: {
      sendRequest(){
        firebase.database().ref('requests/'+firebase.auth().currentUser.uid).set({
          0: {
            set: 'doorAccess',
            value: {
              lock0: true,
              lock1: true,
            }
          },
          1: {
            set: 'rentAccounts',
            value: {
              balance: 200,
            }
          },
          2: {
            set: 'residents',
            value: {
              committee: 'dummy',
              unit: 10,
            }
          },
          message: 'requested resident status'
        })
      }
    },
    created(){
      firebase.database().ref('usersRev1/residents/'+firebase.auth().currentUser.uid).on('value', (sc) => {
        this.show = this.show&(!sc.val());
      })
      firebase.database().ref('requests/'+firebase.auth().currentUser.uid).on('value', (sc) => {
        this.show = this.show&(!sc.val());
      })
    }
  }
</script>
<style scoped>
div{
  font-family: 'Guru Sans';
  line-height: 50px;
  border: 3px solid var(--cream);
  border-radius: 30px;
}
.icon{
  padding: 5px 15px;
}
</style>

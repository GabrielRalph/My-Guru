<template>
  <div id = "app">
    <template v-if = "user">
      <div class = "user-logout" >
        <div @click = "logout" :class = "{'show-logout': showlogout}">
          <span>
            L<br />O<br />G<br />O<br />U<br />T<br />
          </span>
          <img :src = "userProfile.photoURL"/>
        </div>
      </div>
      <phone v-if = "isMobile"></phone>
      <desktop v-else></desktop>
    </template>
    <div @click = "showlogout = !showlogout">
      <logo  v-if = "user|loading" key = "logo" :size = "logosize" :pos = "logopos" :mode = "logomode" :xWave = "loading" :yWave = "loading" margin = '30px'></logo>
    </div>
    <div v-if = "auth" id = "firebaseui-auth-container"></div>
  </div>
</template>

<script>
import logo from './components/logo.vue'
import phone from './components/phone.vue'
import desktop from './components/desktop.vue'
import firebase from 'firebase'
var firebaseui = require('firebaseui');
import 'firebase/database'

var config = {
  apiKey: "AIzaSyDe5Z5STt003BGd5k3EuGSTu7hWKqZltI4",
  authDomain: "guru-admin.firebaseapp.com",
  databaseURL: "https://guru-admin.firebaseio.com",
  projectId: "guru-admin",
  storageBucket: "guru-admin.appspot.com",
  messagingSenderId: "618229197693",
  appId: "1:618229197693:web:08bdb2afd1457f6f22ba14"
};

firebase.initializeApp(config);

// const database = firebase.database();
// const auth = firebase.auth();
const authConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function() {
      console.log('sucess');
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return false;
    },
    uiShown: function() {
      console.log('shown');
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  // signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    // {
    //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   requireDisplayName: false
    // },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account'
      }
    }
  ]
};
//
//

var ui = new firebaseui.auth.AuthUI(firebase.auth());
export default {
  name: 'App',
  components: {
    logo,
    desktop,
    phone,
  },
  methods:{
    logout(){
      console.log('logout');
      this.auth = true;
      this.user = false;
      firebase.auth().signOut();
    },
  },
  data: () => ({
    auth: true,
    loading: true,
    user: false,
    userProfile: {},
    logosize: '250px',
    logomode: 'logo',
    logopos: '50 50',
    showlogout: false,
    isMobile: true,

  }),
  created(){
    this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    firebase.auth().onAuthStateChanged(user => {
      if (ui.isPendingRedirect()) {
        ui.start('#firebaseui-auth-container', authConfig);
        // this.loading = true;
        console.log(user);
        console.log('this');
      }else{
        console.log('that');
        if(user){
          var ref = firebase.database().ref('users/profiles/' + user.uid)
          ref.on('value', (sc) => {
            this.auth = false;
            if(sc.val()){
              this.userProfile = sc.val();
              setTimeout(() => {
                this.user = true;
                this.logopos = '100 0';
                this.logosize = '100px';
                this.loading = false;
              }, 200)
              setTimeout(() => {
                this.logomode = "weather"
              }, 500)
              setTimeout(() => {
                this.showlogout = true;
              }, 2000)
            }else{
              ref.set({
                photoURL: user.photoURL,
                displayName: user.displayName,
                email: user.email,
              })
            }
          })
        }else{
          this.loading = false;
          ui.start('#firebaseui-auth-container', authConfig);
        }
        console.log(user);
      }
    })
  }
};
</script>

<style>

.user-logout{
  width: 70px;
  position: absolute;
  right: var(--padding);
  top: 55px;
  bottom: 0px;
  border-radius: var(--my-radius) var(--my-radius) 0 0;
  overflow: hidden;
}
body::-webkit-scrollbar {
  display: none;
}
.user-logout div{
  width: 70px;
  background: var(--panel-color);
  position: absolute;
  border-radius: 0 0 var(--my-radius) var(--my-radius);
  transition: var(--my-cube);
}
.user-logout div:not(.show-logout){
  top: -100%;
}
.show-logout{
  top: 0;
}
.user-logout div img{
  height: 70px;
  border-radius: 35px;
  margin-right: 20px;
  float: left;
}
.user-logout div span{
  font-family: 'Guru';
  color: white;
  font-size: 18px;
  line-height: 25px;
  padding: 90px 29px 20px 29px;
  float: left;
}
:root{
  --guru-color: #ff9b34;
  --text-color: #070706;
  --background-color:#fffdf5;
  --panel-color: rgba(0, 0, 0, 0.6);
  --my-radius: 35px;
  --padding: 30px;
  --my-cube: 1s cubic-bezier(0.64, 0, 0.61, 1);
}
body{
  background-image: url('https://firebasestorage.googleapis.com/v0/b/guru-admin.appspot.com/o/assets%2Fbackdrop.jpg?alt=media&token=251b23cd-8a28-46d7-aa28-1bf91d4af3fd');
  background-size: cover;
  height: 100vh;
  padding: var(--padding);
  overflow: hidden;
}
#firebaseui-auth-container{
  margin: auto;
  max-width: 500px;
}
.firebaseui-card-content{
  width: 100%;
  height: 30vh;
}
.firebaseui-idp-list{
  list-style: none;
  margin: 0;
  padding: 0;
}
.firebaseui-list-item{
  height: 8vh;
  margin:0;
}
.firebaseui-idp-password{
  box-shadow: 1px 1px 3px darkred;
  background: #e03021;
}
.firebaseui-idp-icon-wrapper{
  display: block;
}
.firebaseui-idp-icon{
  width: 100px;
  padding: 0 auto;
}
.firebaseui-idp-text{
}
.firebaseui-idp-text-short{
  display:none;
}
.firebaseui-idp-text-long{
  line-height: 8vh;
  color: #424d5a;
}
.firebaseui-idp-google{
  padding: 30px;
  color: white;
}
.firebaseui-idp-button{
  padding: 0;
  font: bold 6vh Arial;
  height: 40vh;
  text-align: center;
  border-width: 0px;
  border-radius: 5vh;
  width: 100%;
  opacity: 0.90;
  cursor: pointer;
}
.firebaseui-idp-button:hover{
  opacity: 1;
}
.firebaseui-auth-container{
  width: 100%;
  float: left;
}
</style>

<template>
  <div id = "app">
    <template v-if = "user">
      <div class = "user-logout" >
        <div @click = "option_function" :class = "{'show-logout': showlogout}">
          <span>
            <template v-for = "(opt, key) in option" >{{opt}}<br :key = "key"/></template>
          </span>
          <img :src = "userProfile.photoURL"/>
        </div>
      </div>
      <div :class = "{phone: true, hide: window_page != 0}">
        <phone></phone>
      </div>
      <div :class = "{desktop: true, hide: window_page != 1}">
        <admin v-if = "loadAdmin"></admin>
      </div>
    </template>
    <div @click = "change_option">
      <logo  v-if = "user|loading" key = "logo" :size = "logosize" :pos = "logopos" :mode = "logomode" :xWave = "loading" :yWave = "loading" margin = '20px'></logo>
    </div>
    <div v-if = "auth" id = "firebaseui-auth-container"></div>
  </div>
</template>

<script>
import logo from './components/logo.vue'
import phone from './components/phone.vue'
import admin from './components/admin.vue'
import firebase from 'firebase'
var firebaseui = require('firebaseui');
import 'firebase/database'

var config = {
   apiKey: "AIzaSyBI13TKjc4WD4Riq9uTRVzileI-0cPsw-w",
   authDomain: "myiot-41369.firebaseapp.com",
   databaseURL: "https://myiot-41369.firebaseio.com",
   projectId: "myiot-41369",
   storageBucket: "myiot-41369.appspot.com",
   messagingSenderId: "201145539454"
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
    admin,
    phone,
  },
  methods:{
    option_function(){
      this[this.option.toLowerCase()]();
    },
    change_option(){
      if(this.showlogout){
        this.showlogout = false;
      }else{
        if(this.option == 'LOGOUT'){
          if(this.window_page == 1){
            this.option = 'DASHBOARD'
          }else{
            this.option = 'ADMIN';
            this.loadAdmin = true;
          }
        }else{
          this.option = 'LOGOUT';
        }
        this.showlogout = true;
      }
    },
    admin(){
      this.option = 'DASHBOARD';
      this.window_page = 1;
    },
    dashboard(){
      this.window_page = 0;
      this.option = 'ADMIN';
    },
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
    option: 'LOGOUT',
    window_page: 2,
    loadAdmin: false,

  }),
  created(){
    window.addEventListener('resize', () => {
      this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    })
    firebase.auth().onAuthStateChanged(user => {
      if (ui.isPendingRedirect()) {
        ui.start('#firebaseui-auth-container', authConfig);
        // this.loading = true;
        console.log(user);
        console.log('this');
      }else{
        console.log('that');
        if(user){
          var ref = firebase.database().ref('usersRev1/profiles/' + user.uid)
          ref.on('value', (sc) => {
            this.auth = false;
            if(sc.val()){
              this.userProfile = sc.val();
              setTimeout(() => {
                this.user = true;
                this.logopos = '100 0';
                this.logosize = '88px';
                this.loading = false;
              }, 200)
              setTimeout(() => {
                this.logomode = "weather"
              }, 500)
              setTimeout(() => {
                this.showlogout = true;
                this.window_page = 0;
              }, 1500)
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
.phone{
  transition: var(--my-cube);
  height: 100%;
  width: 100%;
  max-width: 450px;
  float: right;
  position: relative;
}
.desktop{
  transition: var(--my-cube);
  position: relative;
  width: 100%;
  height: 100%;
}
.phone:not(.hide){
  transform: translateY(0px);
}
.phone.hide{
  transform: translateY(-100%);
}
.desktop.hide{
  transform: translateY(100%);
}

.full-window{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.red{
  width: 100%;
  height: 500px;
  background: red;
}
.user-logout{
  width: 60px;
  position: absolute;
  right: calc(var(--padding));
  bottom: calc(var(--padding));
  top: calc(var(--padding) + 38px);
  border-radius: 5px 5px var(--my-radius) var(--my-radius);
  transition: var(--my-cube);
  overflow: hidden;
  z-index: 100;
}
body::-webkit-scrollbar {
  display: none;
}
.user-logout div{
  padding-top: 35px;
  width: 60px;
  position: absolute;
  border: 3px solid var(--cream);
  border-radius: 2px 2px var(--my-radius) var(--my-radius);
  transition: var(--my-cube);
}
.user-logout div:not(.show-logout){
  top: -100%;
}
.show-logout{
  top: 0;
}
.user-logout div img{
  height: 54px;
  border-radius: 35px;
  float: right;
}
.user-logout div span{

  font-family: 'Guru Sans';
  color: var(--cream);
  font-size: 19px;
  line-height: 18px;
  padding:  15px 21px;
  text-align: center;
  float: left;
}
:root{
  --guru-color: #ff9b34;
  --text-color: #070706;
  --background-color:#fffdf5;
  --cream:#fffdf5;
  --orange:#ff9b34;
  --black: #070706;
  --panel-color: rgba(0, 0, 0, 0.6);
  --my-radius: 35px;
  --padding: 20px;
  --my-cube: 1s cubic-bezier(0.64, 0, 0.61, 1);
}
body{
  color: #fffdf5;
  user-select: none;
  height: 100vh;
}
#app{
  background-image: url('https://firebasestorage.googleapis.com/v0/b/guru-admin.appspot.com/o/assets%2Fbackdrop.jpg?alt=media&token=251b23cd-8a28-46d7-aa28-1bf91d4af3fd');
  background-size: cover;
  position: fixed;
  padding-right: calc(var(--padding) + 60px);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #293c1c;
  overflow: hidden;
  background-attachment: fixed;
}
#firebaseui-auth-container{
  margin: auto;
  max-width: 500px;
  padding: var(--padding);
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

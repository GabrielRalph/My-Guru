<template>
  <div>

    <table class = "door-container">
      <tr>
        <td v-if = "access.lock0" style = "width: 50%" @click = "open('lock0')">

          <div class = "door-frame" :class = "{doors:true,open:states.lock0}">
            <div class = "door-panels-top">
              <div>
              </div>
              <div>
              </div>
            </div>
            <div class = "handle">
              <div>

              </div>
            </div>
            <div class = "door-panels-bottom">
              <div>
              </div>
              <div>
              </div>
            </div>
          </div>
          <!-- <svg :class = "{doors:true,open:states.lock0}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 85.1 128.6" style="enable-background:new 0 0 85.1 128.6;" xml:space="preserve">
            <path class="lines" d="M74.4,67.9c0-0.4-6.9,0.1-6.9,0.1c-0.2-1.1-1.9-2.9-3.3-2.6c-3.6,0.9-1.7,6.7,1.8,5.9c1-0.2,1.5-1.5,1.6-2.7
            C67.6,68.6,74.4,68.2,74.4,67.9z"/>
            <text transform="matrix(1 0 0 1 25 40)">
              <tspan x="0" y="0" class="text">B</tspan>
              <tspan x="0" y="19.5" class="text">A</tspan>
              <tspan x="0" y="39" class="text">C</tspan>
              <tspan x="0" y="58.5" class="text">K</tspan>
            </text>
            <path class="lines" d="M21.3,6.5c-3.1,0.1-6.1,0.1-9.2,0.3C9.8,6.9,7.6,6.6,6.9,9.1c-0.8,2.8-0.4,6.4-0.5,9.3
            c-0.1,3.4-0.2,6.7-0.2,10.1c-0.1,6.3,0.1,12.4,0.2,18.7c0.2,12.3,0.1,24.6,0,36.9c-0.1,6.6,0.1,13.2-0.1,19.8
            c-0.1,3.2-0.2,6.5-0.2,9.7c0,2.1-0.7,6.1,0.7,7.8c1.5,1.8,5.6,1.1,7.7,1.1c3.2,0,6.3-0.2,9.5-0.3c6.2,0,12.4,0.1,18.6,0
            c6.2-0.1,12.3-0.5,18.4-0.5c2.5,0,4.9,0.1,7.4,0.1c2.3,0,5.4,0.5,7.6-0.2c2.7-0.8,2.3-4.1,2.4-6.4c0.1-3.6,0.2-7.2,0.4-10.8
            c0.2-6.3,0.3-12.5,0.3-18.8c0-6.3-0.4-12.5-0.2-18.8c0.2-5.8,0.3-11.7-0.1-17.5c-0.5-7.1-0.3-14.1,0-21.2c0.1-3.2,0.2-6.4,0.2-9.6
            c0-3.1,0.6-6.8-0.6-9.8c-1.2-3-4.9-2.4-7.6-2.5c-3.2-0.1-6.4,0-9.7,0.1C54.4,6.5,47.7,5.9,40.9,6C40.9,6,27.8,6.3,21.3,6.5z"/>
            <path class="lines" d="M71.8,16.6c-0.2-3.4-17.7-2.4-20.1-2.3c-6.5,0.4-12.9,0.2-19.4,0.3c-3.2,0.1-6.4,0.1-9.6-0.1
            c-2.3-0.1-5.9-1.2-7.6,0.8c-1.3,1.5-0.7,3.4-0.7,5.2c0,3-0.3,6-0.4,9c-0.1,6.8,0.4,13.5,0.5,20.3c0.1,14-0.3,28-0.5,42
            c-0.1,6.8-1.3,12-0.7,18.8c0.6,6.3,6.9,3.8,11.5,3.4c12.6-0.9,25.3-0.1,37.9-0.5c5.9-0.2,6-2.9,6-8.2c0-7.3-0.4-12.5,0-19.8
            c0.1-1.7,0.6-4-0.5-5.5c-1.4-1.8-4.3-1.5-6.2-2.2c-4.3-1.5-6.7-5.1-6.8-9.7c-0.1-5,2.6-8.6,7.5-9.6c5.1-1,7.9-1.2,8.5-7.2
            c0.8-7.7-0.1-15.5,0.3-23.3C71.9,23.5,72.2,21.5,71.8,16.6z"/>
            <path class="lines" d="M68.5,91.2c-10.5,0.1-25,5.5-38.9,15.1c-4,2.8-7.7,5.7-10.9,8.7"/>
            <path class="lines" d="M47.3,14.4c3.9,4.4,8.6,8.7,13.9,12.7c3.4,2.6,6.8,4.9,10.3,6.9"/>
          </svg> -->
        </td>
        <td v-if = "access.lock1" style = "opacity: 0; padding: 0"><div style = "width: var(--padding)"></div></td>
        <td v-if = "access.lock1" style = "width: 50%" @click = "open('lock1')">
          <div class = "door-frame" :class = "{doors:true,open:states.lock1}">
            <div class = "door-frame-inner">
              <div class = "door-panels-top">
              </div>
              <div class = "handle">
                <div>
                </div>
                <div>
                </div>
              </div>
              <div class = "door-panels-bottom">
              </div>
            </div>
          </div>
          <!-- <svg :class = "{doors:true,open:states.lock1}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 85.1 128.6" style="enable-background:new 0 0 85.1 128.6;" xml:space="preserve">
            <path class="lines" d="M40.9,6c-6.5,0.1-13.1,0.3-19.6,0.4c-3.1,0.1-6.1,0.1-9.2,0.3C9.8,6.9,7.6,6.6,6.9,9.1
            c-0.8,2.8-0.4,6.4-0.5,9.3c-0.1,3.4-0.2,6.7-0.2,10.1c-0.1,6.3,0.1,12.4,0.2,18.7c0.2,12.3,0.1,24.6,0,36.9
            c-0.1,6.6,0.1,13.2-0.1,19.8c-0.1,3.2-0.2,6.5-0.2,9.7c0,2.1-0.7,6.1,0.7,7.8c1.5,1.8,5.6,1.1,7.7,1.1c3.2,0,6.3-0.2,9.5-0.3
            c6.2,0,12.4,0.1,18.6,0c6.2-0.1,12.3-0.5,18.4-0.5c2.5,0,4.9,0.1,7.4,0.1c2.3,0,5.4,0.5,7.6-0.2c2.7-0.8,2.3-4.1,2.4-6.4
            c0.1-3.6,0.2-7.2,0.4-10.8c0.2-6.3,0.3-12.5,0.3-18.8c0-6.3-0.4-12.5-0.2-18.8c0.2-5.8,0.3-11.7-0.1-17.5c-0.5-7.1-0.3-14.1,0-21.2
            c0.1-3.2,0.2-6.4,0.2-9.6c0-3.1,0.6-6.8-0.6-9.8c-1.2-3-4.9-2.4-7.6-2.5c-3.2-0.1-6.4,0-9.7,0.1C54.4,6.5,47.7,5.9,40.9,6"/>
            <path class="lines" d="M48.1,80.1c-0.4,2.9-0.3,3.3-0.3,4.8c-0.1,1.8,0,3.7,0,5.5c-0.1,3.8-0.3,7.5-0.2,11.3c0.1,3.1-0.2,6.5,0.2,9.6
            c0.5,3.2,5.8,2.2,8.5,2.1c2.1,0,4.1-0.2,6.2-0.2c1.5,0,3.7,0.3,5-0.3c1.5-0.7,1.1-2,1-3.2c-0.1-1.7-0.1-3.5-0.2-5.2
            c-0.1-3.8-0.1-7.6,0.1-11.3c0.1-4.1,1-8.4,0.7-12.5c-0.1-2.3-1.3-2.7-3.8-2.8c-2.3-0.1-1.8-0.1-6.9-0.1
            C53.4,77.7,48.5,77.2,48.1,80.1z"/>
            <path class="lines" d="M15.9,80.1c-0.4,2.9-0.3,3.3-0.3,4.8c-0.1,1.8,0,3.7,0,5.5c-0.1,3.8-0.3,7.5-0.2,11.3c0.1,3.1-0.2,6.5,0.2,9.6
            c0.5,3.2,5.8,2.2,8.5,2.1c2.1,0,4.1-0.2,6.2-0.2c1.5,0,3.7,0.3,5-0.3c1.5-0.7,1.1-2,1-3.2c-0.1-1.7-0.1-3.5-0.2-5.2
            c-0.1-3.8-0.1-7.6,0.1-11.3c0.1-4.1,1-8.4,0.7-12.5c-0.1-2.3-1.3-2.7-3.8-2.8c-2.3-0.1-1.8-0.1-6.9-0.1
            C21.3,77.7,16.3,77.2,15.9,80.1z"/>
            <path class="lines" d="M54.4,15.2c-4.4,0.4-7.7,0.3-7,5.8c0-0.1,0,0.4,0,0.3c0.5,4.2,0.3,8.5,0.2,12.7c-0.1,2.6-1.3,8.9,0.9,10.8
            c2.2,2,8.6,0.3,11.3,0.3c2.8,0,7.3,1.3,8.2-2.2c0.7-2.9-0.2-7.5-0.2-10.5c0-4.3-0.3-8.7-0.2-13c0.1-3.5-0.8-4.3-4.5-4.4
            C60.3,15,57.3,15,54.4,15.2z"/>
            <path class="lines" d="M22.8,15.2c-4.4,0.4-7.7,0.3-7,5.8c0-0.1,0,0.4,0,0.3c0.5,4.2,0.3,8.5,0.2,12.7c-0.1,2.6-1.3,8.9,0.9,10.8
            c2.2,2,8.6,0.3,11.3,0.3c2.8,0,7.3,1.3,8.2-2.2c0.7-2.9-0.2-7.5-0.2-10.5c0-4.3-0.3-8.7-0.2-13c0.1-3.5-0.8-4.3-4.5-4.4
            C28.6,15,25.7,15,22.8,15.2z"/>
            <path class="lines" d="M67.1,59c-3.8,1-1.8,7,1.9,6.2C73.4,64.2,71.3,57.9,67.1,59z"/>
            <text transform="matrix(1 0 0 1 15 67)" class="text">S55</text>
          </svg> -->
        </td>
        <!-- <td v-if = "access.lock1" style = "opacity: 0; padding: 0"><div style = "width: 20px"></div></td>
        <td v-if = "access.lock1" style = "width: 33%" @click = "open('lock1')">
          <svg :class = "{doors:true,open:states.lock1}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 85.1 128.6" style="enable-background:new 0 0 85.1 128.6;" xml:space="preserve">
          <path class="lines" d="M74.4,67.9c0-0.4-6.9,0.1-6.9,0.1c-0.2-1.1-1.9-2.9-3.3-2.6c-3.6,0.9-1.7,6.7,1.8,5.9c1-0.2,1.5-1.5,1.6-2.7
          C67.6,68.6,74.4,68.2,74.4,67.9z"/>
          <text transform="matrix(1 0 0 1 22.7261 43.2583)">
            <tspan x="0" y="0" class="text">B</tspan>
            <tspan x="0" y="19.5" class="text">A</tspan>
            <tspan x="0" y="39" class="text">C</tspan>
            <tspan x="0" y="58.5" class="text">K</tspan>
          </text>
          <path class="lines" d="M21.3,6.5c-3.1,0.1-6.1,0.1-9.2,0.3C9.8,6.9,7.6,6.6,6.9,9.1c-0.8,2.8-0.4,6.4-0.5,9.3
          c-0.1,3.4-0.2,6.7-0.2,10.1c-0.1,6.3,0.1,12.4,0.2,18.7c0.2,12.3,0.1,24.6,0,36.9c-0.1,6.6,0.1,13.2-0.1,19.8
          c-0.1,3.2-0.2,6.5-0.2,9.7c0,2.1-0.7,6.1,0.7,7.8c1.5,1.8,5.6,1.1,7.7,1.1c3.2,0,6.3-0.2,9.5-0.3c6.2,0,12.4,0.1,18.6,0
          c6.2-0.1,12.3-0.5,18.4-0.5c2.5,0,4.9,0.1,7.4,0.1c2.3,0,5.4,0.5,7.6-0.2c2.7-0.8,2.3-4.1,2.4-6.4c0.1-3.6,0.2-7.2,0.4-10.8
          c0.2-6.3,0.3-12.5,0.3-18.8c0-6.3-0.4-12.5-0.2-18.8c0.2-5.8,0.3-11.7-0.1-17.5c-0.5-7.1-0.3-14.1,0-21.2c0.1-3.2,0.2-6.4,0.2-9.6
          c0-3.1,0.6-6.8-0.6-9.8c-1.2-3-4.9-2.4-7.6-2.5c-3.2-0.1-6.4,0-9.7,0.1C54.4,6.5,47.7,5.9,40.9,6C40.9,6,27.8,6.3,21.3,6.5z"/>
          <path class="lines" d="M71.8,16.6c-0.2-3.4-17.7-2.4-20.1-2.3c-6.5,0.4-12.9,0.2-19.4,0.3c-3.2,0.1-6.4,0.1-9.6-0.1
          c-2.3-0.1-5.9-1.2-7.6,0.8c-1.3,1.5-0.7,3.4-0.7,5.2c0,3-0.3,6-0.4,9c-0.1,6.8,0.4,13.5,0.5,20.3c0.1,14-0.3,28-0.5,42
          c-0.1,6.8-1.3,12-0.7,18.8c0.6,6.3,6.9,3.8,11.5,3.4c12.6-0.9,25.3-0.1,37.9-0.5c5.9-0.2,6-2.9,6-8.2c0-7.3-0.4-12.5,0-19.8
          c0.1-1.7,0.6-4-0.5-5.5c-1.4-1.8-4.3-1.5-6.2-2.2c-4.3-1.5-6.7-5.1-6.8-9.7c-0.1-5,2.6-8.6,7.5-9.6c5.1-1,7.9-1.2,8.5-7.2
          c0.8-7.7-0.1-15.5,0.3-23.3C71.9,23.5,72.2,21.5,71.8,16.6z"/>
          <path class="lines" d="M68.5,91.2c-10.5,0.1-25,5.5-38.9,15.1c-4,2.8-7.7,5.7-10.9,8.7"/>
          <path class="lines" d="M47.3,14.4c3.9,4.4,8.6,8.7,13.9,12.7c3.4,2.6,6.8,4.9,10.3,6.9"/>
          </svg>
        </td> -->
      </tr>
    </table>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'doors',
    data(){
      return {
        access: {

        },
        states: {

        }
      }
    },
    methods: {

      open(door){
        firebase.database().ref('stucco/locks/' + door).set(true);
      }
    },
    created(){
      firebase.database().ref('usersRev1/doorAccess/'+firebase.auth().currentUser.uid).on('value', (sc) => {
        for(var door in sc.val()){
          this.access[door] = true;
        }
        this.$forceUpdate();
      })
      firebase.database().ref('stucco/locks').on('value', (sc2) => {
        this.states = sc2.val();
        console.log(sc2.val());
      })
    }
  }
</script>
<style>
.doors{
  width: 100%;
  transform-origin: left;
  user-select: none;
  transition: var(--my-cube)
}
.open{
  transform: rotateY(45deg);
}

.door-container td{
  padding: 0;
  /* border-radius: 15px; */
  user-select: none;
  /* background: var(--panel-color); */
  /* border: 3px solid var(--cream); */
  perspective: 500px
}
.lines{
  fill:none;
  stroke: var(--cream);
  stroke-width: 2px;
  stroke-miterlimit:10;
}
.text{
  fill:var(--cream);
  font-family:'Guru Sans';
  font-size:15px;
}
.door-frame{
  border: 3px solid var(--cream);
  border-radius: 15px;
  padding: 7.5px;
  height: calc(1.5*(100vw - 60px - 3*var(--padding))/2);
}
.door-frame-inner{
  border: 3px solid var(--cream);
  border-radius: 7.5px;
  padding: 10px;
  width: 100%;
  height: 100%;
}
.door-panels-top{
  width: 100%;
  height: 45%;
}
.door-panels-bottom{
  width: 100%;
  height: 40%;
}
.handle{
  width: 100%;
  height: 15%;
  transform-origin: right;
  transition: var(--my-cube);
}
.handle div:first-child{
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  border: 3px solid var(--cream);
  margin: 7.5px 0;
  float: right;
}
.handle div:nth-child(2){
  height: 3px;
  width: 10px;
  background: var(--cream);
  border-radius: 2px;
  margin: 12.5px 0;
  margin-right: -2px;
  float: right;
}
.open .handle{
  transform: rotateZ(-45deg);
}
.door-panels-top div:first-child, .door-panels-bottom div:first-child{
  margin-right: 20px;
}
.door-panels-top div, .door-panels-bottom div{
  width: calc(50% - 20px/2);
  border-radius: 7.5px;
  height: 100%;
  border: 3px solid var(--cream);
  float: left;
}
</style>

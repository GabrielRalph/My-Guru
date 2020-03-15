const fs = require('fs');
var data = require('./users.json');
var newData = {}
newData.profiles = {};
newData.residents = {};
newData.applicants = {};
newData.bondAccounts = {};
newData.rentAccounts = {};
newData.attendance = {};
newData.doorAccess = {};
newData.adminRights = {};

for(uid in data){
  var user = data[uid];
  newData.profiles[uid] = {
    email: user.email,
    displayName: user.name,
    photoURL: user.dpURL
  }
  if(user.doorAccess){
    newData.doorAccess[uid] = {
      lock0: true,
      lock1: true,
    }
  }
  if((user.status == 'applicant')||(user.status == 'resident')){
    newData.attendance[uid] = user.attendance;
  }
  if(user.status = 'resident'){
    var rights = {};
    if(user.duties['Attendance Officer']){
       rights['attendance'] =  true;
    }
    if(user.duties['Bond Officer']){
      rights['bondAccount']=true;
    }
    if(user.duties['Key Master']){
      rights['doorAccess']=true;
    }
    if(user.duties['Rent Officer']){
      rights['rentAccounts']=true;
    }
    if((user.committee == 'PandA')||(user.committee == 'Membership')){
      rights['residents']=true;
    }
    if((user.name == 'Gabriel Ralph')){
      rights['adminRights'] = true;
    }
    newData.adminRights[uid] = rights;
    newData.residents[uid] = {
      unit: user.unit,
      committee: user.committee,
    }
    newData.bondAccounts[uid] = {
      amount: user.bondAmount,
      code: user.bondCode
    }
    newData.rentAccounts[uid] = {
      balance: user.rentBalance
    }
  }
  if(user.status == 'applicant'){
    newData.applicants[uid] = {
      form: 'some form'
    }
  }
}
fs.writeFile('newData.json', JSON.stringify(newData), (err) => {
  console.log(err);
})

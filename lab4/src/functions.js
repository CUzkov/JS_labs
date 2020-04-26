function submitForm(e){

  //variables
  var storageRef = firebase.storage().ref();
  var status = false;
  var email = getElementByIdValue('email');
  var password = getElementByIdValue('password');
  var name = getElementByIdValue('name');
  var phone = getElementByIdValue('phone');
  var photo = document.getElementById('photo').files[0];

  //preparations
  e.preventDefault();
  document.getElementById('registerButton').disabled = true;

  //create new account
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      if(error.message){
        document.getElementById('registerButton').disabled = false;
        alert(error.message);
      }
  })
  .then(() => {
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {        
              var imgRef = storageRef.child(`/users/${user.uid}/photo.png`);
          
              if(photo){
                  imgRef.put(photo).then(function(snapshot) {
                      console.log('Uploaded a blob or file!');
                      user.updateProfile({
                          photoURL: snapshot.downloadURL
                      })
                  });  
              }
  
              user.updateProfile({
                  displayName: name
              })
              .then(function() {}, function(error) {
                  alert('Плоха');
              });
              addRegFrom(false);
              addSingIn(true);
                  
          } else {
              console.log('Some error!!!');
          }
      });
  });

}

function singIn(e){

  //variables
  var email = getElementByIdValue('email');
  var password = getElementByIdValue('password');
  var status = true;

  //preparations
  e.preventDefault();
  document.getElementById('singInButton').disabled = true;
  document.getElementById('orRegisterButton').disabled = true;

  //auth
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      if(error.message){
          status = false;
          document.getElementById('singInButton').disabled = false;
          document.getElementById('orRegisterButton').disabled = false;
          alert(error.message);
      }
  }).then(() => {
      if(status){
          addSingIn(false);
          addProf();
      }
  });

}

function getElementByIdValue(id){
    return document.getElementById(id).value;
}

function addProf(){

    var user = firebase.auth().currentUser;

    document.getElementById('Body').innerHTML +=
        `<div class="profile">
          <div class="photo">
          <img src=${user.photoURL} class="profileImg"><br><hr>
          </div>
          <div class="information">
            Имя: ${user.displayName}<br><hr>
            Email: ${user.email}
          </div>
        </div>`
}

export function addRegFrom(addDel){
  
  if(addDel){
      document.getElementById('Body').innerHTML += `
      <div id="fromWindow">
        <div class="form id="form">
          <div class="formTitle">
            Присоединиться бесплатно:
          </div>
          <br>
          <form class="formStyle" id="form" enctype="multipart/form-data">
            <input type="text" id="name" required placeholder="Никнейм" class="input"><br><hr>
            <input type="email" id="email" required placeholder="Email" class="input"><br><hr>
            <input type="text" id="password" required placeholder="Пароль" class="input"><br><hr>
            <input type="phone" id="phone" required placeholder="Телефон" class="input"><br><hr>
            <p class="formText">Фотография профиля:</p>
            <input type="file" id="photo" name="photo" multiple accept="image/*,image/jpeg" class="input"><br><hr>
            <button type="submit" class="button" id="registerButton">Зарегистрироваться</button><br><hr>
            <button type="button" class="button" id="singIn">Или войти</button>
           </form>
        </div>
      </div>`
      document.getElementById('form').addEventListener('submit', submitForm);
      document.getElementById('singIn').onclick = function(){
        addRegFrom(false);
        addSingIn(true);
      }
  }
  else{
      document.getElementById('fromWindow').remove();
  }
}

function addSingIn(addDel){
    
  if(addDel){
    document.getElementById('Body').innerHTML += `
    <div id="fromWindow">
      <div class="SingInForm id="form">
        <div class="formTitle">
        Вход:
        </div>
        <br>
        <form class="formStyle" id="form" enctype="multipart/form-data">
          <input type="text" id="email" required placeholder="Email" class="input"><br><hr>
          <input type="text" id="password" required placeholder="Пароль" class="input"><br><hr>
          <button type="submit" class="button" id="singInButton">Войти</button><br><hr>
          <button type="button" class="button" id="orRegisterButton">Или зарегистрироваться</button>
        </form>
      </div>
    </div>`
    document.getElementById('form').addEventListener('submit', singIn);
    document.getElementById('orRegisterButton').onclick = function(){
      addSingIn(false);
      addRegFrom(true);
    }
  }
  else{
      document.getElementById('fromWindow').remove();
  }
}
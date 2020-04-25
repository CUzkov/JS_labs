function submitForm(e){

    var storageRef = firebase.storage().ref();
    var status = false;
    
    var email = getElementByIdValue('email');
    var password = getElementByIdValue('password');
    var name = getElementByIdValue('name');
    var phone = getElementByIdValue('phone');
    var photo = document.getElementById('photo').files[0];

    e.preventDefault();

    document.getElementById('formSubmitButton').disabled = true;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        if(error.message){
            alert(errorMessage);
        }
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var databaseRef = firebase.database().ref(`/users/${user.uid}`);
        
            var imgRef = storageRef.child(`/users/${user.uid}/photo.png`);
        
            if(photo){
                imgRef.put(photo).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                });   
            }

            var newFormRef = databaseRef.push();

            
            user.updateProfile({
                displayName: name,
                phoneNumber: phone,
                photoURL: `gs://jslab4form.appspot.com/users/${user.uid}`
            });

        } else {
            alert('Some error!');
        }
    });
    addRegFrom(false);
    addProf();
}

function singIn(e){
    e.preventDefault();

    var email = getElementByIdValue('email');
    var password = getElementByIdValue('password');
    var status = true;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        if(error.message){
            status = false;
            alert(error.message);
        }
    }).then(function (){
        if(status){
            addSingIn(false);
            addProf();
        }
    });

}

function getElementByIdValue(id){
    return document.getElementById(id).value;
}

export function addProf(){
    var user = firebase.auth().currentUser;
    document.getElementById('Body').innerHTML +=
        `<div class="profile">
          <div class="photo">
          <img src=${user.photoURL}>
          </div>
          <div class="information">
            <p>Имя: ${user.displayName}</p>
            <p>Фамилия: </p>
            <p>Телефон: ${user.phoneNumber}</p>
            <P>Email: ${user.email}</P>
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
            <input type="text" id="name" required placeholder="Name" class="input"><br><hr>
            <input type="text" id="secondName" required placeholder="Second name" class="input"><br><hr>
            <input type="text" id="email" required placeholder="Email" class="input"><br><hr>
            <input type="text" id="password" required placeholder="password" class="input"><br><hr>
            <input type="phone" id="phone" required placeholder="Mobile phone" class="input"><br><hr>
            <p class="formText">Фотография профиля:</p>
            <input type="file" id="photo" name="photo" multiple accept="image/*,image/jpeg" class="input"><br><hr>
            <button type="submit" class="formSubmitButton" id="formSubmitButton">Register</button><br><hr>
            <button type="button" class="formSubmitButton" id="singIn">Or sing in</button>
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
      <div class="SingIn id="form">
        <div class="formTitle">
        Вход:
        </div>
        <br>
        <form class="formStyle" id="form" enctype="multipart/form-data">
          <input type="text" id="email" required placeholder="Email" class="input"><br><hr>
          <input type="text" id="password" required placeholder="password" class="input"><br><hr>
          <button type="submit" class="formSubmitButton" id="formSubmitButton">Sing in</button><br><hr>
          <button type="button" class="formSubmitButton" id="orRegister">Or register</button>
        </form>
      </div>
    </div>`
    document.getElementById('form').addEventListener('submit', singIn);
    document.getElementById('orRegister').onclick = function(){
      addSingIn(false);
      addRegFrom(true);
    }
  }
  else{
      document.getElementById('fromWindow').remove();
  }
}
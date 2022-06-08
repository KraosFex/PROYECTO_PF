import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";


function Login() {

const [user, setUser] = useState({});

const handleSingOut = (event) => {
  console.log("click")
  setUser({});
   document.getElementById("signInDiv").hidden = false;
}

const handleCallBackResponse = (response) => {
 console.log("Encode JWT ID token " + response.credential)
 var userObject = jwt_decode(response.credential);
 console.log(userObject);
 setUser(userObject);
 document.getElementById("signInDiv").hidden = true;
}

useEffect(() =>{
  /*global google */
  google.accounts.id.initialize({
    client_id: "759322645352-ch2qqv99md1ts29e7spp1cjs6o4ri5df.apps.googleusercontent.com",
    callback: handleCallBackResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    { theme: "outline", size: "large" }
  )

  google.accounts.id.prompt();
}, []);

  return (
    <div>
      <div id="signInDiv"></div> 

      { Object.keys(user).length != 0 &&

          <button onClick={(e) => handleSingOut(e)}>Sing Out</button>

      }
      {user &&
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
        </div>
      }
    </div>

  )
}

export default Login;

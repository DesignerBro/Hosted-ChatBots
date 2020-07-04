setTimeout(function(){ 
    let textconsole = document.getElementById("textConsole")
    html =  `
                <div class = "bot_msg">
                    <textarea  class="bot_msg_area" cols="40">Hi! I'm TensorChatBot aka TChatBot.</textarea>
                </div>
            `
    textconsole.innerHTML += html
}, 1000);



// Get the input field
let inputKey = document.querySelector(".text_data");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      send()
    }
  });





let send = ()=>{
    let url = '"https://tchatbot-flask.herokuapp.com/api'
    let textInputField = document.querySelector(".text_data")
    let textInput = textInputField.value
    let textconsole = document.getElementById("textConsole")
    html =  `
                <div class = "user_msg">
                    <textarea  class="user_msg_area" cols="40">${textInput}</textarea>
                </div>
            `
    textconsole.innerHTML += html
    textInputField.value = ""
    console.log("Returning response......"); 

    postData(url, data = textInput)
    
}

let botResponse = (userResponse)=>{
    let url = ""

    let textconsole = document.getElementById("textConsole")
    html =  `
                <div class = "bot_msg">
                    <textarea  class="bot_msg_area" cols="40">${userResponse}</textarea>
                </div>
            `
    textconsole.innerHTML += html
}

async function postData(url = '', data="") {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(
            { input: data.toLowerCase()}
        ),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(res => {
        try {
          if (res.ok) {
              let output;
              Promise.all([res.json()]).then(val=>
              {
                output = val[0]["reply"]
                console.log(output)
                botResponse(output)
              })
            
          } else {
            throw new Error(res)
          }
        }
        catch (err) {
          console.log(err.message)
          return "Something went wrong"
        }
      })
      .catch(err => console.log(err))
}




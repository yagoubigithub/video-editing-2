let baseUrl =  'http://localhost:3000'

let texts = []
let templates = []
if(localStorage.getItem("templates")){

    templates = JSON.parse(localStorage.getItem("templates"))
}

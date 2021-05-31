const express = require("express");

const PORT = process.env.PORT || 8080;
const app = express();




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + 'index.html');
// }); 

app.listen(PORT, ()=>{
  console.log(`Server listening on: http://localhost: ${PORT}`)
})
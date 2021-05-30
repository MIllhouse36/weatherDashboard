const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname +"public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(PORT, ()=>{
  console.log(`Server listening on: http://localhost: ${PORT}`)
})
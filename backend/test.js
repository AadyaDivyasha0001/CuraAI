const mongoose = require("mongoose");

mongoose.connect(
"mongodb+srv://divyashaaadya_db_user:Aadya9122@cluster0.bdaofp3.mongodb.net/CuraAI?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("CONNECTED");
})
.catch((err) => {
  console.log(err);
});
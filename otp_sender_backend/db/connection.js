const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://abhishekanil2007:DBpasswordabhishek2003@cluster0.tweb8.mongodb.net/OtpDB?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('connected to database');
}).catch(()=>{
    console.log('not connected to database');
})
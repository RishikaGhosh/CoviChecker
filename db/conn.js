const mongoose= require('mongoose');
const DB = 'mongodb+srv://sghosh:rick@1234@cluster0.4syv0.mongodb.net/mernstack?retryWrites=true&w=majority';


mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log(`Connection successful`);
}).catch((err)=>{
    console.log(`Connection not successful`);
});
const app= require('./index');

const connect= require('./configs/db');

app.listen(3750, async()=>{
    try {
        await connect()
        console.log('listening on port 3750');

    }catch(error){

        console.log(error.message);

   }

});
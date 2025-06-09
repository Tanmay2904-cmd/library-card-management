   import mongoose from 'mongoose';

   const Connection = async () => {
       const URL = 'mongodb://127.0.0.1:27017/crud-app';

       try {
           await mongoose.connect(URL, { 
               useUnifiedTopology: true, 
               useNewUrlParser: true,
               serverSelectionTimeoutMS: 5000,
               socketTimeoutMS: 45000,
           });
           console.log('Database Connected Successfully');
       } catch(error) {
           console.log('Error connecting to database:', error.message);
           process.exit(1);
       }
   }

   export default Connection;
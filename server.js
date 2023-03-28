const mongoose = require( "mongoose");
const app =  require( "./app.js" );


const port = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://pru:123456789d@cluster0.te02x.mongodb.net/Medics')
  .then(result => {


    // User.findOne().then(user => {
    //   if (!user) {
    //     const user = new User({
    //       name: "Ahmed",
    //       email: 'ahmed@ahmed.com',
    //       cart: {
    //         items: []
    //       }
    //     })
    //     user.save()
    //   }
    // })
    const server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  }).catch(err => {
    console.log(err)
  })

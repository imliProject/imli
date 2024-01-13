const express = require('express')
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
// const Razorpay = require('razorpay');
const mysql = require('mysql2');
// const Razorpay = require("razorpay");
// require('dotenv').config();

// // const Razorpay = require("react-native-razorpay");

// const instance = new Razorpay({
//   key_id: 'rzp_test_btIK5ZpnsdxWuu',
//   Key_Secret: 'lmuUQGgAPtC73tJQLjhHwoVS'

//   // key_id:: process.env.Key_Id,
//   // raiserpaykeysecret: process.env.Key_Secret,
// });

//   const raiserpaykeyid = process.env.Key_Id;
//   const raiserpaykeysecret = process.env.Key_Secret;

  // console.log ('In Server :', raiserpaykeyid , raiserpaykeysecret);

// var instance = new Razorpay({ key_id: raiserpaykeyid , key_secret:  raiserpaykeysecret })

// instance.orders.create({
// amount: Price,
// currency: "INR",
// receipt: "",
// notes: {
// key1: "value3",
// key2: "value2"
// }     
// })
// const dbs = require('./models')

// const ThreadImg = dbs.threadimgs


const app = express()

// app.post('/createOrder', (req, res)=>{  
  
//   // STEP 1: 
//   const {amount,currency,receipt, notes}  = req.body;       
        
//   // STEP 2:     
//   instance.orders.create({amount, currency, receipt, notes},  
//       (err, order)=>{ 
        
//         //STEP 3 & 4:  
//         if(!err) 
//           res.json(order) 
//         else
//           res.send(err); 
//       } 
//   ) 
// }); 

// app.use(cors());
app.use(bodyParser.json());

var corOptions = {
    origin: 'https://localhost:8081'
}

const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './images');
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

  // app.post('/api/upload', upload('photo', 3), (req, res) => {
    // console.log('file', req.files);
    // console.log('body', req.body);
    // res.status(200).json({
    //   message: 'success!',
    // });
    // let info = {
    //   userID: req.body.userID,
    //   UsrSrcPath: req.body.uri
    // }
    // console.log("info Body:", info)
      
    // if (!req.file) {
    //   console.log("No file received");
    //   return res.send({
    //     success: false
    //   });
  
    // } else {
    //   console.log('file received');
      // const host = req.host;
      // const filePath = req.protocol + "://" + host + '/' + req.file.path;
      // console.log('filePath :', filePath);
      // const threadimg = ThreadImg.create(info)
      // res.status(200).send(threadimg)
  //     return res.send({
  //       // filePath
  //       success: true
  //     })
  //   }
  // });
//middleware

app.use(cors(corOptions))
app.use(express.json())
 

//Upload EndPoint

 
app.use(express.urlencoded({ extended: true}))

// routers

const payrouter = require('./routes/paymentRouter.js')
app.use('/api/payment', payrouter);


const userrouter = require('./routes/userRouter.js')
app.use('/api/users', userrouter)
// app.use('/api/category', categoryrouter)
// app.use('/api/supports', supportrouter)
// app.use('/api/documents', documentrouter)
const categoryrouter = require('./routes/categoryRouter.js')

app.use('/api/category', categoryrouter)

const occasionrouter = require('./routes/occasionRouter.js')

app.use('/api/occasion', occasionrouter)

const friendsrouter = require('./routes/friendsRouter.js')
app.use('/api/friends', friendsrouter)

const adminrouter = require('./routes/adminRouter.js')
app.use('/api/vendors', adminrouter)


//testing api

app.get('/', (req,res) => {
    res.json ({ message: 'hello from api'})
})

//port
var port = 3000;
app.listen(port,function(){
    console.log('Server running on port:', port);
});

// const PORT = process.env.PORT || 8080

// app.listen(PORT, () => {
//     console.log('server is running on port ${PORT}')
// }
// )


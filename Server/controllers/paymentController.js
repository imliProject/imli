require('dotenv').config();
const db = require('../models')
const { sign } = require('jsonwebtoken')
const sequelize = require('sequelize');
const Razorpay = require("razorpay");


// const Razorpay = require("react-native-razorpay");

const createOrder = async (req, res) => {
  console.log ('In create order :' , req.body);
  const Price = 1;

  try {
   const instance   = new Razorpay({
  key_id: 'rzp_test_btIK5ZpnsdxWuu',
  key_secret: 'lmuUQGgAPtC73tJQLjhHwoVS'
  // key_id:: process.env.Key_Id,
  // raiserpaykeysecret: process.env.Key_Secret,
});

const options = {
  amount: req.body.amount * 100, // amount in smallest currency unit
  currency: "INR",
  receipt: "receipt_order_74394",
};
const order = await instance.orders.create(options);
if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
  }
//  
  // const data = razorpay.orders.create({
  //   amount: req.body.amount,
  //   currency: req.body.currency,
  //   receipt: "rcpt_imli_001",
  //   payment_capture: 1
  // })
  // .then( response => {
  //      return response.send(data)
  //   return {
  //   amount: data.amount,
  //   currency: data.currency,
  //   receipt: data.receipt,
  //   payment_capture: data.payment_capture,
  //   orderId: data.id,
  // };
  // })
  // return {
  //   amount: response.amount,
  //   currency: response.currency,
  //   receipt: response.receipt,
  //   payment_capture: response.payment_capture,
  //   orderId: response.id,
  // };
// }catch (e) {
//   console.log(e);
//   throw new TRPCError({
//     code: "INTERNAL_SERVER_ERROR",
//   });
// }   
// res.status(200).send(data)
// } 
//   const verifyPayment = async (req, res) => {
//     const { orderID, transaction } = req.body;

//   const generatedSignature = crypto
//     .createHmac("sha256", process.env.SECRETKEY)
//     .update(`${orderID}|${transaction.razorpay_payment_id}`)
//     .digest("hex");

//   res.send({ validSignature: generatedSignature === transaction.razorpay_signature });
// };


  module.exports = {
    createOrder 
  }
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//middlewares
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  }
  app.use(cors(corsOptions))
  app.use(express.json())

  const verifyJWT = (req,res,next) =>{
    const authorization = req.headers.authorization;
    if(!authorization){
     return res.status(401).send({error: true, message: 'Unauthorized Access'})
    }
    //bearer token
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
      if(err){
        return res.status(401).send({error: true, message: 'Unauthorized Access'})
      }
      req.decoded = decoded;
      next();
    })
  }

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6kleiyi.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    //!collections
    const usersCollection = client.db('summer_camp').collection('users');
    const classCollection = client.db('summer_camp').collection('classes');
    const cartCollection = client.db('summer_camp').collection('cart');
    const paymentCollection = client.db('summer_camp').collection('payments');
    const reviewCollection = client.db('summer_camp').collection('reviews');

    //!jwt token
    app.post('/jwt', async(req, res)=>{
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'24h'})
        res.send({token})
    })


    //!users Api

    app.get('/users', verifyJWT, async(req, res)=> {
      const result = await usersCollection.find().toArray();
      res.send(result)
    })

    app.put('/users/:email', async (req, res) => {
        const email = req.params.email
        const user = req.body
        console.log(user)
        const query = { email: email }
        const options = { upsert: true }
        const updateDoc = {
          $set: user,
        }
        const result = await usersCollection.updateOne(query, updateDoc, options) 
        res.send(result)
      })
    
    app.put('/userid/:id', verifyJWT, async(req, res)=> {
      const id = req.params.id;
      const role = req.body;
      const filter = {_id: new ObjectId(id)};
      const updateDoc = {
        $set:role,
      }
      const result = await usersCollection.updateOne(filter,updateDoc);
      res.send(result)
    })

    //!check instructor
    app.get('/users/instructor/:email', verifyJWT, async(req, res)=>{
        const email = req.params.email;
        
        if(req.decoded.email !== email){
            res.send({instructor: false})
            return
        }
        const query = {email: email};
        const user = await usersCollection.findOne(query);
        const result = {instructor: user?.role == "instructor" || user?.role == 'Instructor'};
        res.send(result);
    })

    app.get('/instructors', async(req,res)=>{
        const query = {role: "instructor"};
        const result = await usersCollection.find(query).toArray();
        res.send(result)
    })

    app.get('/instructors/:email', async(req,res)=>{
        const email = req.params.email;
        const query = {email: email};
        const result = await usersCollection.findOne(query);
        res.send(result)
    })

    //check admin
    app.get('/users/admin/:email', verifyJWT, async(req, res)=>{
        const email = req.params.email;

        if(req.decoded.email !== email){
            res.send({admin: false})
            return
        }
        const query = {email: email};
        const user = await usersCollection.findOne(query);
        const result = {admin: user?.role == "admin" || user.role == 'Admin'};
        res.send(result);
    })
  

    //! Reviews Api
    app.get('/reviews', async(req, res)=>{
        const result = await reviewCollection.find().toArray();
        res.send(result)
    })

    //!classes api
    app.get('/topclasses', async(req,res)=>{
        const query= {status:"approved"}
        const result = await classCollection.find(query).sort({ enrolled: -1 }).limit(6).toArray();
        res.send(result);
    })
    
    app.get('/classbyemail/:email',verifyJWT, async(req,res)=>{
        const email = req.params.email;
        const query = {instructorEmail: email};
        const result = await classCollection.find(query).toArray();
        res.send(result)
    })
    
    app.get('/classes', async(req, res)=>{
        const result = await classCollection.find().toArray();
        res.send(result)
    })

    app.get('/classes/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await classCollection.findOne(query);
        res.send(result)
    })

    app.get('/approvedclasses', async(req, res)=>{
      const query= {status:"approved"}
        const result = await classCollection.find(query).toArray();
        res.send(result)
    })

    app.post('/classes',verifyJWT, async(req, res)=>{
        const newClass = req.body;
        const result = await classCollection.insertOne(newClass);
        res.send(result)
    })

    app.post('/classes/:id',verifyJWT, async(req,res)=>{
      const id = req.params.id;
      const updateStatus = req.body;
      const filter = {_id: new ObjectId(id)};
      const updateDoc ={
        $set:updateStatus
      } 
      const result = await classCollection.updateOne(filter,updateDoc);
      res.send(result)
    })

    app.post('/feedback/:id', verifyJWT, async(req, res)=>{
      const id = req.params.id;
      const updateItem = req.body;
      const filter = {_id: new ObjectId(id)};
      const updateDoc = {
        $set: updateItem
      }
      const result = await classCollection.updateOne(filter, updateDoc)
      res.send(result)
    })

    //!cart Api
    
    app.get("/enrolledbyemail/:email",verifyJWT, async(req,res)=>{
        const email = req.params.email;
        const query = {studentMail: email};
        const result = await cartCollection.find(query).toArray();
        res.send(result)
    })
    
    app.post("/enroll", verifyJWT, async(req, res)=> {
        const course = req.body;
        const result = await cartCollection.insertOne(course);
        res.send(result)
    })

    app.delete('/enrolled/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    })

    //!create payment intent
    app.post('/create-payment-intent',verifyJWT, async(req, res)=>{
        const {price}= req.body;
        const amount = parseInt(price*100);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types:['card']
        });
        res.send({
            clientSecret: paymentIntent.client_secret
        })
    })

    //payment Api
    app.get('/payments/:email', verifyJWT, async(req,res)=>{
        const email = req.params.email;
        const query = {studentMail: email};
        const options = {
            sort:{"date":-1},
            projection:{courseName:1, instructorName:1, price:1, image:1, date:1 }
        }
        const result = await paymentCollection.find(query,options).toArray();
        res.send(result)
    })

    app.post('/payments', verifyJWT, async(req,res)=>{
        const paidCourse = req.body;
        const cartId =  paidCourse.cartId;
        const courseId = paidCourse.courseId;
        //delete enrolled course from selects
        const deleteFilter = {_id: new ObjectId(cartId)};
        const deleteResult = await cartCollection.deleteOne(deleteFilter);
        //update course seats
        const courseFilter = {_id: new ObjectId(courseId)};
        const availableSeats = paidCourse.availableSeats - 1;
        const enrolled = paidCourse.enrolled + 1;
        const updateDoc ={
            $set:{availableSeats, enrolled}
        }
        const updateResult = await classCollection.updateOne(courseFilter, updateDoc)
        //insert data to payments
        const insertResult = await paymentCollection.insertOne(paidCourse)
        res.send({insertResult, updateResult, deleteResult})
    })

    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);





app.get("/", (req, res) => {
  res.send({hello: "Server is running"});
});

app.listen(port, () => {
  console.log("server is running on", port);
});

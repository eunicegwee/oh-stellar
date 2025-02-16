const express = require("express");
const app = express();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


const {
  createAuthenticatedClient,
  isPendingGrant,
} = require("@interledger/open-payments");
const cors = require("cors");

const PORT = process.env.PORT || 8000;
require('dotenv').config()




const serviceAccount = require('./private_key.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();




app.use(express.json());

app.use(cors())

let interact_ref;
let accessToken;
let URLGlobal;
let walletAddressGlobal;
let quoteID;
let client;



async function IncreaseDonation(username, amount) {
  try {
    if (!username || typeof amount !== "number") {
        return res.status(400).json({ error: "Invalid request data." });
    }

    const userRef = db.collection("users").doc(username);

    // Use Firestore transaction to prevent race conditions
    await db.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);

        if (!userDoc.exists) {
            throw new Error("User not found.");
        }

        const currentScore = userDoc.data().donation|| 0;
        const newScore = currentScore + amount;

        transaction.update(userRef, { score: newScore });
    });

    res.json({ message: `donation increased by ${amount}.` });
} catch (error) {
    res.status(500).json({ error: error.message });
}

}


// Sample route
app.get("/", (req, res) => {
  res.send("Hello, adsfsdExpress!"); 
});

app.get("/", (req, res) => {
  res.send("Hello, adsfsdExpress!"); 
});


app.post("/increase-donation", async (req, res) => {
 
});
















// method for profile page 
app.get('/userData',async (req,res)=>{
  const username = req.body.username;
  const userDoc = await db.collection("users").doc(username).get();
  if(!userDoc.exists){
    console.log('user not found');
    return res.status(404).json({error:"User not found"});
  } else{
    res.send(200).json(userDoc.data());
  }
})

app.get('/donors', async (req,res)=>{
  const username = req.query.username;
  const userDoc = await db.collection("users").doc(username).get();
  if(!userDoc.exists){
    console.log('user not found');
    return res.status(404)
  } else{
    //returns json file of partner names 
    console.log('donors ran');
    console.log('this is ran');
    res.send([userDoc.partners,userDoc.level]);
  }
})



app.get('/milestone-stats', async (req,res)=>{
    // console.log(req)
    console.log('this was called')
    const userDoc = await db.collection("users").doc(req.query.username).get();
    res.send(userDoc.data());
})


app.post('/confirm', async (req,res)=>{
  // console.log(req)
  try {
    const userDoc = await db.collection("users").doc(req.query.username).get();
    // userDoc.total_days.set(userDoc.total_days+1);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.send(404)
  }
})


//Donation page 
app.post('/donation', async (req,res)=>{
  //! CHANGE FROM EMAIL ADDRESS TO USERNAME 
  //expected input {name:"",amount:"",walletaddress:"",userEmailAddress:""}

  async function checkAndCreateSubcollection(username) {
    const userRef = db.collection("users").doc(username);

    // Check if the subcollection has any documents
    const snapshot = await partnersRef.limit(1).get();

    if (snapshot.empty) {
        console.log("No documents found in 'partners'. Creating one...");
        
        data = userRef.partners
        data[req.body.name]={"amount":req.body.amount,"walletaddress":req.body.walletAddress,"userEmailAddress":req.body.userEmailAddress}
        db.collection('users').doc(username).set(data);


        console.log("'partners' subcollection created!");
        return false
    } else {
        console.log("'partners' subcollection already exists.");
        return true
    }
}

checkAndCreateSubcollection(req.body.userEmailAddress).catch(console.error);

async function addPartner(username, name, address) {
  const userRef = db.collection("users").doc(username);
  const partnersRef = userRef.collection("partners");

  // Add or update a partner entry where 'name' is the document ID
  await partnersRef.doc(name).set({
      address: address,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  console.log(`Partner '${name}' added/updated for user '${username}'.`);
}

addPartner(req.body.userEmailAddress,req.body.name,req.body.walletAddress)


})



app.get("/search", async (req, res) => {
  const username = req.query.username;
  const userDoc = await db.collection("users").doc(username).get();
  if(!userDoc.exists){
    console.log('user not found');
    return res.json({error:"User not found"});
  } else{
    res.send(200).json(userDoc.data());
  }
});



app.post('/createuser', async (req,res)=>{
  console.log(req.body);
  const data = req.body; //TODO!: NEED TO DO VALIDATION before passing into database 
  //input: username, password, email, 
  // walletaddress, 
  // 
  // score, partners, useradded

  data['score']="0";
  data['partners']={};
  data['user_added_money']=0
  data['level']=0;
  data['total_days']=0;
  data['streak']=0;
  const firebase_response =  await db.collection('users').doc(data.username).set(data);
  res.sendStatus(200)
});

app.get("/login-check", async (req, res) => {
  console.log('login GET method called');
  const username = req.query.username;
  const password = req.query.password;
  const userDoc = await db.collection("users").doc(username).get();
  if(!userDoc.exists){
    console.log('user not found');
    return res.send(404)
  } else{
    // res.sendStatus(404);
    res.send(userDoc.data());
  }
});

//this is expected to be a one-time payment type situtuation 
//input for this is based on stage            
//?INPUT : walletAddressUrl, PaymentAmount, Currency                                  

const PRIVATE_KEY_PATH = "./private_key_path.key";
const KEY_ID = process.env.KEY_ID;
const WALLET_ADDRESS = "https://ilp.interledger-test.dev/oh-stellar";


app.post("/depositfunds", async (req,res)=>{
  //many things to do here 
  
  //Authentication for Payee(me)
  client = await createAuthenticatedClient({
    walletAddressUrl: WALLET_ADDRESS,
    privateKey: PRIVATE_KEY_PATH,
    keyId: KEY_ID,
  });
  

  //retrieve the walletAddress of the payee 
  const walletAddress = await client.walletAddress.get({
    url: WALLET_ADDRESS,
  });

  //Request an incoming payment for the payee
  const grant = await client.grant.request(
    {
      url: walletAddress.authServer,
    },
    {
      access_token: {
        access: [
          {
            type: "incoming-payment",
            actions: ["list", "read", "read-all", "complete", "create"],
          },
        ],
      },
    },
  );

  const INCOMING_PAYMENT_ACCESS_TOKEN = grant.access_token.value;
  // Create InComing payment 
  const incomingPayment = await client.incomingPayment.create(
    {
      url: new URL(WALLET_ADDRESS).origin,
      accessToken: INCOMING_PAYMENT_ACCESS_TOKEN,
    },
    {
      walletAddress: WALLET_ADDRESS,
      incomingAmount: {
        value: req.body.amount,
        assetCode: "USD",
        assetScale: 2,
      },
      expiresAt: new Date(Date.now() + 60_000 * 10).toISOString(),
    },
  );
  //require a quote grant

  const quote_grant = await client.grant.request(
    {
      url: walletAddress.authServer,
    },
    {
      access_token: {
        access: [
          {
            type: "quote",
            actions: ["create", "read", "read-all"],
          },
        ],
      },
    },
  );

  
  //payee = OH- stellar payer = addict 
  const QUOTE_ACCESS_TOKEN = quote_grant.access_token.value;
  const INCOMING_PAYMENT_URL = incomingPayment.id;
//CREATING A QUOTE ON THE PAYER's
  const quote = await client.quote.create(
    {
      url: new URL(WALLET_ADDRESS).origin,
      accessToken: QUOTE_ACCESS_TOKEN,
    },
    {
      method: "ilp",
      walletAddress: req.body.walletAddress,
      receiver: INCOMING_PAYMENT_URL,
    },
  );
  quoteID=quote.id;
  console.log(quoteID)

//Request an outgoing payment GRANT FROM PAYER (from client)
      //NEED TO MAKE INTERACTIVE GRANT
      const payer_interactive_grant = await client.grant.request(
        {
          url: walletAddress.authServer,
        },
        {
          access_token: {
            access: [
              {
                identifier: walletAddress.id,
                type: "outgoing-payment",
                actions: ["list", "list-all", "read", "read-all", "create"],
                limits: {
                  debitAmount: {
                    assetCode: quote.debitAmount.assetCode,
                    assetScale: quote.debitAmount.assetScale,
                    value: quote.debitAmount.value,
                  },
                },
              },
            ],
          },
          interact: {
            start: ["redirect"],
            finish: {
              method: "redirect",
              uri: "http://localhost:8000/complete-payment",
              nonce: "hackomaniainterledger92",
            },
          },
        },
      );

      console.log(payer_interactive_grant)

      accessToken = payer_interactive_grant.continue.access_token.value;
      URLGlobal = payer_interactive_grant.continue.uri;

      walletAddressGlobal = req.body.walletAddress;



      // console.log(payer_interactive_grant)


      // //OUTGOING PAYMENT on payer's wallet 
      // const outgoingPayment = await client.outgoingPayment.create(
      //   {
      //     url: new URL(WALLET_ADDRESS).origin,
      //     accessToken: interactive_grant_continuation.access_token.value,
      //   },
      //   {
      //     walletAddress: req.body.walletAddress,
      //     quoteId: interactive_grant_continuation.uri,
      //   },
      // );
      app.get("/complete-payment", async (req, res) => {
        interact_ref = req.query.interact_ref; 
        console.log('this has been called')
        console.log(interact_ref)
        

        //OUTGOING PAYMENT 

        try {
          const interactive_grant_continuation = await client.grant.continue(
            {
              accessToken: accessToken,
              url: URLGlobal,
             },
            {
              interact_ref: interact_ref,
            },
          );
          console.log(interactive_grant_continuation);
          const outgoingPayment = await client.outgoingPayment.create(
            {
              url: new URL(WALLET_ADDRESS).origin, //payee (US)
              accessToken: interactive_grant_continuation.access_token.value,
            },
            {
              walletAddress: WALLET_ADDRESS,
              quoteId: quoteID,
            },
          );
          console.log(outgoingPayment)
          res.send(200);
        } catch (error) {
        }


        // console.log(outgoingPayment);
        res.send(200)
      });
});


app.get("/login-check", async (req, res) => {
  console.log('login GET method called');
  const username = req.body.username;
  const userDoc = await db.collection("users").doc(username).get();
  if(!userDoc.exists){
    console.log('user not found');
    return res.status(404).json({error:"User not found"});
  } else{
    res.send(200).json(userDoc.data());
  }
});


app.listen(8000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors(
    {
        origin: [
            'http://localhost:5173',
            'https://where-is-it-by-alifa.web.app',
            'https://where-is-it-by-alifa.firebaseapp.com'
        ],
        credentials: true,
        optionsSuccessStatus: 200
    }
));

//custom middleware
const verifyToken = (req, res, next) => {
    // console.log("Cookies:", req.cookies);
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access' })
    }

    //verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Token verification failed' + err.message })
        }

        //if there is no error,
        req.user = decoded;
        next();
    })
}

// cookie parser middleware
app.use(cookieParser());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kvlax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        const db = client.db('whereIsItDB');
        const postsCollection = db.collection('posts');
        const recoveredItemsCollection = db.collection('recoveredItems');

        // auth related apis
        app.post('/jwt', (req, res) => {
            const user = req.body;

            //create token
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '365d'
            });

            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict",
                    // sameSite: process.env.NODE_ENV === 'none',
                    // maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days in milliseconds
                })
                .send({ success: true })
        })

        // clearing the token after the user logs out
        app.post('/logout', (req, res) => {
            res.
                clearCookie('token', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                    // sameSite: process.env.NODE_ENV === 'none',
                })
                .send({ success: true })
        })

        //save a new post in db
        app.post('/addPost', verifyToken, async (req, res) => {
            const newPost = req.body;
            // console.log(newPost);
            const result = await postsCollection.insertOne(newPost)
            res.send(result)
            // res.json({ success: true, message: 'Post added successfully' });
        })


        //simple all posts
        app.get('/posts', async (req, res) => {
            const result = await postsCollection.find().toArray()
            res.send(result)
        })

        // get all posts
        app.get('/allPosts', async (req, res) => {
            const search = req.query.search;
            const sort = req.query.sort;
            const filterType = req.query.filterType; //getting posts by their type
            const filterCategory = req.query.filterCategory;
            const limit = parseInt(req.query.limit) || 0;

            let options = {} //to sort

            if (sort) {
                options = {
                    sort: {
                        date: sort === 'asc' ? 1 : -1
                    }
                }
            } //1, ascending, -1 descending

            let query = {};

            //Add search filters

            if (search) {
                query.$or = [
                    {
                        title: {
                            $regex: search,
                            $options: 'i' //Case-insensitive search
                        }
                    },
                    {
                        location: {
                            $regex: search,
                            $options: 'i'
                        }
                    }
                ]
            }

            //Add type filter
            if (filterType) {
                query.type = filterType; //Matches the specific type (e.g., "Lost" or "Found")
            }

            //Add Category filter
            if (filterCategory) {
                query.category = filterCategory; // Matches the specific category (e.g., "Documents", "Pets")
            }

            const result = await postsCollection.find(query, options).limit(limit).toArray();
            res.send(result)
        })


        //get a single post data by id
        app.get('/postDetails/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await postsCollection.findOne(query)

            if (!result) {
                return res.status(404).send({ message: 'Post not found' });
            }
            res.send(result)
        })

        //get all posts for a specific user
        app.get('/posts/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { email };

            if (req.user.email !== req.params.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const result = await postsCollection.find(query).toArray();
            res.send(result);
        })

        //update post
        app.put('/updatePost/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }

            const updatedPost = req.body;
            const post = {
                $set: {
                    type: updatedPost.type,
                    title: updatedPost.title,
                    category: updatedPost.category,
                    photo: updatedPost.photo,
                    date: updatedPost.date,
                    location: updatedPost.location,
                    description: updatedPost.description,
                }
            }

            const result = await postsCollection.updateOne(filter, post, options);
            res.send(result);
        })

        //delete post
        app.delete('/post/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }; // Match the post ID in postsCollection

            try {
                // Delete the post from postsCollection
                const postDeleteResult = await postsCollection.deleteOne(query);

                if (postDeleteResult.deletedCount > 0) {
                    // If the post was successfully deleted, delete from recoveredItemsCollection
                    const recoveredQuery = { postId: id }; // Match the postId as a string in recoveredItemsCollection
                    const recoveredDeleteResult = await recoveredItemsCollection.deleteOne(recoveredQuery);

                    // Send a combined response
                    return res.status(200).send({
                        message: 'Post deleted successfully',
                        postDeleteResult,
                        recoveredDeleteResult,
                    });
                } else {
                    return res.status(404).send({ message: 'Post not found' });
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                return res.status(500).send({ message: 'Internal server error', error: error.message });
            }
        });





        // recovered items collection apis
        app.post('/addRecovered', async (req, res) => {
            const recoveredData = req.body;

            // Check if the item has already been recovered
            const query = { postId: recoveredData.postId }
            const alreadyExist = await recoveredItemsCollection.findOne(query);

            if (alreadyExist)
                return res.status(400).send('Item has already been marked as recovered.')

            // save recovered data in recovered items collection
            const result = await recoveredItemsCollection.insertOne(recoveredData);

            //update recovered status in postsCollection
            const filter = { _id: new ObjectId(recoveredData.postId) } //which post will be updated

            //update type in post collection
            const update = {
                $set: {
                    type: 'Recovered'
                }
            }

            const updatedType = await postsCollection.updateOne(filter, update)
            res.send(result)
        })

        //get all recovered items by a user
        app.get('/allRecovered/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { email };

            if (req.user.email !== req.params.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const result = await recoveredItemsCollection.find(query).toArray();
            res.send(result);
        })

        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello From My Lost and Found Server...')
})

app.listen(port, () => {
    console.log('My Lost and Found server is running at', port);
})

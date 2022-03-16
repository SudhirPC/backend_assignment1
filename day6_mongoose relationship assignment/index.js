const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/library");
};

//here creating  user schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//here creating user model
const User = mongoose.model("user", userSchema);

// here creating section schema
const secSchema = new mongoose.Schema(
  {
    section_name: { type: String, required: false, default: "general" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// here creating sections model
const Section = mongoose.model("section", secSchema);

// here creating books schema
const booksSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    check: { type: Boolean, required: false, default: false },
    section_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    auth_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// here creating books model
const Book = mongoose.model("book", booksSchema);

// here creating authur schema
const authSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    books_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// here creating authur model
const Auth = mongoose.model("auth", authSchema);

//here creating the section
app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);
    return res.status(200).send(section);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
//here creating the authors
app.post("/auths", async (req, res) => {
  try {
    const auth = await Auth.create(req.body);
    return res.status(200).send(auth);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
//here creating the books
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(200).send(book);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
//here i adding author into books
app.put("/auths/:id", async (req, res) => {
  try {
    const auth = await Auth.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { books_id: req.body.bookId } },
      { new: true }
    );
    return res.status(200).send(auth);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//here i  adding the users
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
// here update the books status according to users
app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//que 1 ==> find book that are checkout
app.get("/books", async (req, res) => {
  try {
    const book = await Book.find({ check: { $eq: true } });
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//que 2  ==> find all book of author
app.get("/auths/:id", async (req, res) => {
  try {
    const auth = await Auth.findById(req.params.id).populate({
      path: "books_id",
    });
    return res.status(200).send(auth);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
// que 3  ==> find the book in a section
app.get("/books", async (req, res) => {
  try {
    const book = await Book.findMany({
      section_id: { $eq: ObjectId("6231c3f53abcd10b68377f67") },
    });
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//que 4  ==>find the book that are not checkout
app.get("/books", async (req, res) => {
  try {
    const book = await Book.find({ check: { $eq: false } });
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//que 5 ==> find the book of 1 author
app.get("/auths/:id", async (req, res) => {
  try {
    const auth = await Auth.findById(req.params.id).populate({
      path: "books_id",
    });
    return res.status(200).send(auth);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.listen(3700,async()=>{
    try{

        await connect();
        console.log("listening at port 3700") ;

    }catch(error){

        console.log("...something went wrong",error.message)
    }
})
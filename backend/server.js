import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))
app.use(cors())


const mongoServer = "mongodb://localhost/Sprint6_MarvelABC"
mongoose.connect(mongoServer, { useMongoClient: true })
mongoose.Promise = Promise
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

const Letter = mongoose.model ("Letter", {
  letterChar: String,
  characters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}]
  })

const Character = mongoose.model("Character", {
      apiId: Number,
      name: "String"
  })

app.get("/", (req, res) => {
  res.send("Marvel ABC API")
})


app.get("/letters/:letterChar", (req, res) => {
   Letter.findOne({letterChar:req.params.letterChar}).populate({path: "characters", select: "apiId name"}).then(letter => {
     // if (err) res.send(err)
    res.json(letter)
  })
})

const letters = [
  new Letter ({letterChar: "A", characters: ["5bec448bfd36863141423e01", ]})
]



// const armor = new Character ({apiId: 1011298, name: "Armor"})
// armor.save ()

// letters.forEach(letter => {
//   letter.save().then(() => { console.log("Created", letter.letterChar )})
// })

app.listen(8080, () =>
  console.log("Marvel ABC listening on port 8080!")
)

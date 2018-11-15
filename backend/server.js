import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import fetch from "node-fetch"
import md5 from "md5"

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

const time = (new Date().getTime())
const apiKeyPublic = "9e51a696b1806dcbcd5554c3c5e838e4"
const apiKeyPrivate = "38a7acfc2764bc2ffffe215567e50c45728fd184"
const hash = md5(`${time}${apiKeyPrivate}${apiKeyPublic}`)

app.get("/", (req, res) => {
  res.send("Marvel ABC API")
})

app.get("/letters/:letterChar", (req, res) => {
   Letter.findOne({letterChar:req.params.letterChar}).populate("characters").then(letter => {
     fetch(`https://gateway.marvel.com:443/v1/public/characters/${letter.characters[0].apiId}?ts=${time}&apikey=${apiKeyPublic}&hash=${hash}`)
     .then(response => response.json())
     .then (characters => {
       res.json({
         letter,
         characters
       })
     })
     .catch(function(error) {
})
})
})

const characters = [
  new Character ({apiId: 1011227, name: "Amadeus Cho"}),
  new Character ({apiId: 1009153, name: "Angel"}),
  new Character ({apiId: 1010801, name: "Ant-Man"}),
  new Character ({apiId: 1009187, name: "Black Panther"}),
  new Character ({apiId: 1009180, name: "Beta-Ray-Bill"}),
  new Character ({apiId: 1009175, name: "Beast"}),
  new Character ({apiId: 1009189, name: "Black Widow"}),
  new Character ({apiId: 1009243, name: "Colussus"}),
  new Character ({apiId: 1010338, name: "Captain Marvel"}),
  new Character ({apiId: 1009220, name: "Captain America"}),
  new Character ({apiId: 1009268, name: "Deadpool"}),
  new Character ({apiId: 1009288, name: "Elektra"}),
  new Character ({apiId: 1009297, name: "Falcon"}),
  new Character ({apiId: 1009313, name: "Gambit"}),
  new Character ({apiId: 1009351, name: "Hulk"}),
  new Character ({apiId: 1009368, name: "Iron Man"}),
  new Character ({apiId: 1009381, name: "Jubilee"}),
  new Character ({apiId: 1011081, name: "Ka-Zar"}),
  new Character ({apiId: 1009407, name: "Loki"}),
  new Character ({apiId: 1017577, name: "Ms. Marvel"}),
  new Character ({apiId: 1009466, name: "Namor"}),
  new Character ({apiId: 1009480, name: "Odin"}),
  new Character ({apiId: 1009504, name: "Professor X"}),
  new Character ({apiId: 1009524, name: "Quicksilver"}),
  new Character ({apiId: 1009546, name: "Rogue"}),
  new Character ({apiId: 1009610, name: "Spiderman"}),
  new Character ({apiId: 1009664, name: "Thor"}),
  new Character ({apiId: 1009683, name: "Uatu"}),
  new Character ({apiId: 1010350, name: "Valkrie"}),
  new Character ({apiId: 1009718, name: "Wolverine"}),
  new Character ({apiId: 1009722, name: "X-23"}),
  new Character ({apiId: 1010996, name: "Yellowjacket"}),
  new Character ({apiId: 1009742, name: "Zzzax"})
]

// characters.forEach(character => {
//   character.save().then (() => {console.log("Created", character.name)})
// })


// const armor = new Character ({apiId: 1011298, name: "Armor"})
// armor.save ()

// const letters = [
//   new Letter ({letterChar: "A", characters: ["5bec448bfd36863141423e01", ]})
// ]




// letters.forEach(letter => {
//   letter.save().then(() => { console.log("Created", letter.letterChar )})
// })

app.listen(8080, () =>
  console.log("Marvel ABC listening on port 8080!")
)

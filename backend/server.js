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
      name: String,
      image: String
  })

const time = (new Date().getTime())
const apiKeyPublic = "9e51a696b1806dcbcd5554c3c5e838e4"
const apiKeyPrivate = "38a7acfc2764bc2ffffe215567e50c45728fd184"
const hash = md5(`${time}${apiKeyPrivate}${apiKeyPublic}`)

app.get("/", (req, res) => {
  res.send("Marvel ABC API")
})


app.get("/letters/", (req, res) => {
  Letter.find().populate("characters").then(letters => {
      res.json(
        letters
      )
    })
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


// const characters = [
//   new Character ({name: "Armor", apiId: "1011298", image:"https://www.comicbox.com/wp-content/gallery/march2012xmen/wolvxmao2012001003_cov.jpg"}),
//   new Character ({name: "Amadeus Cho", apiId: "1011227", image:"https://sm.ign.com/ign_de/gallery/v/vorschau-t/vorschau-the-totally-awesome-hulk-1-ganz-neu-und-o_psq1.jpg"}),
//   new Character ({name: "Angel", apiId: "1009153", image:"https://i.pinimg.com/originals/22/6d/7d/226d7dfd3556dc580725082394d52471.jpg"}),
//   new Character ({name: "Ant-Man", apiId: "1010801", image:"http://3.bp.blogspot.com/-8C0UIrZZmNw/Va1UC3Bet3I/AAAAAAAAVnE/YLnZtE7KxKk/s1600/ant9.jpg"}),
//   new Character ({name: "Black Panther", apiId: "1009187", image:"https://imagesvc.timeincapp.com/v3/fan/image?url=https://fansided.com/files/2018/02/black-panther-1-2018-header.jpg&"}),
//   new Character ({name: "Beta-Ray-Bill", apiId: "1009180", image:"https://pbs.twimg.com/media/Dg1CiKcUwAAQTik.jpg"}),
//   new Character ({name: "Beast", apiId: "1009175", image:"https://i.pinimg.com/originals/cd/69/2c/cd692c497eef8031a4d084060e13fe22.jpg"}),
//   new Character ({name: "Black Widow", apiId: "1009189", image:"http://news.entertainmentearth.com/wp-content/uploads/2015/10/black-widow1.jpg"}),
//   new Character ({name: "Colussus", apiId: "1009243", image:"https://www.syfy.com/sites/syfy/files/wire/legacy/Colossus-Marvel-comics.jpg"}),
//   new Character ({name: "Captain Marvel", apiId: "1010338", image:"https://hicomm.bg//uploads/articles/201711/54592/mainimage-dzhud-lou-e-vtorata-golyama-zvezda-v-captain-marvel.jpg"}),
//   new Character ({name: "Captain America", apiId: "1009220", image:"https://crushingkrisis.com/assets/captain-america-granov.jpg"}),
//   new Character ({name: "Deadpool", apiId: "1009268", image:"https://i.pinimg.com/originals/51/d7/82/51d782cd43a1a5c16de8261d3b219594.jpg"}),
//   new Character ({name: "Elektra", apiId: "1009288", image:"https://vignette.wikia.nocookie.net/marveldatabase/images/a/a6/Daredevil_Vol_5_5_Women_of_Power_Variant_Textless.jpg/revision/latest?cb=20160314193215"}),
//   new Character ({name: "Falcon", apiId: "1009297", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Gambit", apiId: "1009313", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Hulk", apiId: "1009351", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Iron Man:", apiId: "1009368", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Jubilee", apiId: "1009382", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Ka-Zar", apiId: "1011081", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Loki", apiId: "1009407", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Ms. Marvel", apiId: "1017577", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Namor", apiId: "1009466", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Odin", apiId: "1009480", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Professor X", apiId: "1009504", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Quicksilver", apiId: "1009524", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Rogue", apiId: "1009546", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Spiderman", apiId: "1009610", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Thor", apiId: "1009664", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Uatu", apiId: "1009683", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Valkrie", apiId: "1010350", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Vision", apiId: "1009697", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Wolverine", apiId: "1009718", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "X-23", apiId: "1009722", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Yellowjacket", apiId: "1010996", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Zzzax", apiId: "1009742", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"})
//
// ]
// characters.forEach(character => {
//   character.save().then (() => {console.log("Created", character.name)})
// })

// const letters = [
//   new Letter ({letterChar: "A", name: "Armor", image:"https://www.google.se/url?sa=i&source=imgres&cd=&ved=2ahUKEwj57bmUydbeAhXFBiwKHfvwCwgQjRx6BAgBEAU&url=https%3A%2F%2Fwww.comicbox.com%2Fwp-content%2Fgallery%2Fmarch2012xmen%2F%3FC%3DM%3BO%3DD&psig=AOvVaw1ylbH3cBC02-gmR_h7IhKi&ust=1542377254846254"}),
//   new Letter ({letterChar: "B", name: "Black Widow", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkwyTe-Vb_1-WmpxCy2RuCPj20Vr1sGW5prywoAYd0jMJQ3phZ"}),
//   new Letter ({letterChar: "C", name: "Captain America", image:"https://orlandoinformer.com/wp-content/uploads/2017/06/Captain-America-throwing-his-shield.jpeg"}),
//   new Letter ({letterChar: "D", name: "Deadppol", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Dv2rQ1ZPWiLuTBJJ7ItS8ncPiwYJoYs9z2k1gF5Zt7lzyEWo"}),
//   new Letter ({letterChar: "E", name: "Elektra", image: "https://i.pinimg.com/originals/8e/c6/a1/8ec6a12f651042276041f6ae4d6440d8.jpg"}),
//   new Letter ({letterChar: "F", name: "Falcon", image: "https://static3.srcdn.com/wordpress/wp-content/uploads/falcon1.jpg"}),
//   new Letter ({letterChar: "G", name: "Gambit", image: "https://vignette.wikia.nocookie.net/marveldatabase/images/2/2c/X-Men_Red_Vol_1_3_Textless.jpg/revision/latest?cb=20180123190246"}),
//   new Letter ({letterChar: "H", name: "Hulk", image: "https://i.pinimg.com/originals/42/42/77/424277d57e8a4237b80a847a60f029b6.jpg"}),
//   new Letter ({letterChar: "I", name: "Iron Man", image: "https://i.pinimg.com/originals/e1/12/f8/e112f875d7f05db887f3d7750474fb1a.jpg"}),
//   new Letter ({letterChar: "J", name: "Jubilee", image: "https://vignette.wikia.nocookie.net/marveldatabase/images/b/b4/X-Men_Vol_4_13_Textless.jpg/revision/latest?cb=20140117001957"}),
//   new Letter ({letterChar: "K", name: "Ka-Zar", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "L", name: "Loki", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "M", name: "Ms. Marvel", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "N", name: "Namor", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "O", name: "Odin", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "P", name: "Professor X", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "Q", name: "Quicksilver", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "R", name: "Rogue", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "S", name: "Spiderman", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w" }),
//   new Letter ({letterChar: "T", name: "Thor", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "U", name: "Uatu", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "V", name: "Valkrie", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "W", name: "Wolverine", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "X", name: "X-23", image:"https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "Y", name: "Yondu", image:"https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"}),
//   new Letter ({letterChar: "Z", name: "Zzzax", image: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5a8c709253450a0e67a1a041/1519153307713/marvel-comics-reveals-their-new-avengers-superhero-roster2?format=750w"})
// ]
// const characters = [
//   new Character ({apiId: 1011227, name: "Amadeus Cho"}),
//   new Character ({apiId: 1009153, name: "Angel"}),
//   new Character ({apiId: 1010801, name: "Ant-Man"}),
//   new Character ({apiId: 1009187, name: "Black Panther"}),
//   new Character ({apiId: 1009180, name: "Beta-Ray-Bill"}),
//   new Character ({apiId: 1009175, name: "Beast"}),
//   new Character ({apiId: 1009189, name: "Black Widow"}),
//   new Character ({apiId: 1009243, name: "Colussus"}),
//   new Character ({apiId: 1010338, name: "Captain Marvel"}),
//   new Character ({apiId: 1009220, name: "Captain America"}),
//   new Character ({apiId: 1009268, name: "Deadpool"}),
//   new Character ({apiId: 1009288, name: "Elektra"}),
//   new Character ({apiId: 1009297, name: "Falcon"}),
//   new Character ({apiId: 1009313, name: "Gambit"}),
//   new Character ({apiId: 1009351, name: "Hulk"}),
//   new Character ({apiId: 1009368, name: "Iron Man"}),
//   new Character ({apiId: 1009381, name: "Jubilee"}),
//   new Character ({apiId: 1011081, name: "Ka-Zar"}),
//   new Character ({apiId: 1009407, name: "Loki"}),
//   new Character ({apiId: 1017577, name: "Ms. Marvel"}),
//   new Character ({apiId: 1009466, name: "Namor"}),
//   new Character ({apiId: 1009480, name: "Odin"}),
//   new Character ({apiId: 1009504, name: "Professor X"}),
//   new Character ({apiId: 1009524, name: "Quicksilver"}),
//   new Character ({apiId: 1009546, name: "Rogue"}),
//   new Character ({apiId: 1009610, name: "Spiderman"}),
//   new Character ({apiId: 1009664, name: "Thor"}),
//   new Character ({apiId: 1009683, name: "Uatu"}),
//   new Character ({apiId: 1010350, name: "Valkrie"}),
//   new Character ({apiId: 1009718, name: "Wolverine"}),
//   new Character ({apiId: 1009722, name: "X-23"}),
//   new Character ({apiId: 1010996, name: "Yellowjacket"}),
//   new Character ({apiId: 1009742, name: "Zzzax"})
// ]

// const letters = [
//   new Letter ({letterChar: "A", characters: ["5beda37f7751e74db9183072", "5beda37f7751e74db9183074", "5beda37f7751e74db9183075","5beda37f7751e74db9183073"]}),
//   new Letter ({letterChar: "B", characters: ["5beda37f7751e74db9183076", "5beda37f7751e74db9183077", "5beda37f7751e74db9183078","5beda37f7751e74db9183079"]}),
//   new Letter ({letterChar: "C", characters: ["5beda37f7751e74db918307a", "5beda37f7751e74db918307c", "5beda37f7751e74db918307b"]}),
//   new Letter ({letterChar: "D", characters: ["5beda37f7751e74db918307d"]}),
//   new Letter ({letterChar: "E", characters: ["5beda37f7751e74db918307e"]}),
//   new Letter ({letterChar: "F", characters: ["5beda37f7751e74db918307f"]}),
//   new Letter ({letterChar: "G", characters: ["5beda37f7751e74db9183080"]}),
//   new Letter ({letterChar: "H", characters: ["5beda37f7751e74db9183081"]}),
//   new Letter ({letterChar: "I", characters: ["5beda37f7751e74db9183082"]}),
//   new Letter ({letterChar: "J", characters: ["5bed5b4f80e60941551618af"]}),
//   new Letter ({letterChar: "K", characters: ["5bed5b4f80e60941551618b0"]}),
//   new Letter ({letterChar: "L", characters: ["5beda37f7751e74db9183085"]}),
//   new Letter ({letterChar: "M", characters: ["5bed5b4f80e60941551618b2"]}),
//   new Letter ({letterChar: "N", characters: ["5beda37f7751e74db9183087"]}),
//   new Letter ({letterChar: "O", characters: ["5bed5b4f80e60941551618b4"]}),
//   new Letter ({letterChar: "P", characters: ["5beda37f7751e74db9183089"]}),
//   new Letter ({letterChar: "Q", characters: ["5beda37f7751e74db918308a"]}),
//   new Letter ({letterChar: "R", characters: ["5beda37f7751e74db918308b"]}),
//   new Letter ({letterChar: "S", characters: ["5beda37f7751e74db918308c"]}),
//   new Letter ({letterChar: "T", characters: ["5bed5b4f80e60941551618b9"]}),
//   new Letter ({letterChar: "U", characters: ["5beda37f7751e74db918308e"]}),
//   new Letter ({letterChar: "V", characters: ["5beda37f7751e74db918308f"]}),
//   new Letter ({letterChar: "W", characters: ["5bed5b4f80e60941551618bc"]}),
//   new Letter ({letterChar: "X", characters: ["5bed5b4f80e60941551618bd"]}),
//   new Letter ({letterChar: "Y", characters: ["5beda37f7751e74db9183093"]}),
//   new Letter ({letterChar: "Z", characters: ["5bed5b4f80e60941551618bf"]})
// ]

// letters.forEach(letter => {
//   letter.save().then(() => { console.log("Created", letter.letterChar )})
// })

app.listen(8080, () =>
  console.log("Marvel ABC listening on port 8080!")
)

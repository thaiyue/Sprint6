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
  memory: [{type: mongoose.Scheme.Types.ObjectID, ref: 'Memory'}]
  })

const Character = mongoose.model("Character", {
      apiId: Number,
      name: String,
      image: String,
      description: String,
      gender: String,
      universe: String
  })

const Memory = mongoose.model("Memory", {
  name: String,
  image: String,
  description: String,
  date: String,
  gender: String,
  universe: String
})

const time = (new Date().getTime())
const apiKeyPublic = "9e51a696b1806dcbcd5554c3c5e838e4"
const apiKeyPrivate = "38a7acfc2764bc2ffffe215567e50c45728fd184"
const hash = md5(`${time}${apiKeyPrivate}${apiKeyPublic}`)

app.get("/", (req, res) => {
  res.send("Marvel ABC API")
})


app.get("/letters/", (req, res) => {
  Letter.find().populate("characters").populate("memory").then(letters => {
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

//
// const characters = [
//   new Character ({name: "Armor", apiId: "1011298", image:"https://www.comicbox.com/wp-content/gallery/march2012xmen/wolvxmao2012001003_cov.jpg"}),
//   new Character ({name: "Amadeus Cho", apiId: "1011227", image:"https://sm.ign.com/ign_de/gallery/v/vorschau-t/vorschau-the-totally-awesome-hulk-1-ganz-neu-und-o_psq1.jpg"}),
//   new Character ({name: "Angel", apiId: "1009153", image:"https://i.pinimg.com/originals/22/6d/7d/226d7dfd3556dc580725082394d52471.jpg"}),
//   new Character ({name: "Ant-Man", apiId: "1010801", image:"http://3.bp.blogspot.com/-8C0UIrZZmNw/Va1UC3Bet3I/AAAAAAAAVnE/YLnZtE7KxKk/s1600/ant9.jpg"}),
//   new Character ({name: "Black Panther", apiId: "1009187", image:"https://imagesvc.timeincapp.com/v3/fan/image?url=https://fansided.com/files/2018/02/black-panther-1-2018-header.jpg&"}),
//   new Character ({name: "Beta-Ray-Bill", apiId: "1009180", image:"https://pbs.twimg.com/media/Dg1CiKcUwAAQTik.jpg"}),
//   new Character ({name: "Beast", apiId: "1009175", image:"https://i.pinimg.com/originals/cd/69/2c/cd692c497eef8031a4d084060e13fe22.jpg"}),
//   new Character ({name: "Black Widow", apiId: "1009189", image:"http://news.entertainmentearth.com/wp-content/uploads/2015/10/black-widow1.jpg"}),
//   new Character ({name: "Colossus", apiId: "1009243", image:"https://www.syfy.com/sites/syfy/files/wire/legacy/Colossus-Marvel-comics.jpg"}),
//   new Character ({name: "Captain Marvel", apiId: "1010338", image:"https://hicomm.bg//uploads/articles/201711/54592/mainimage-dzhud-lou-e-vtorata-golyama-zvezda-v-captain-marvel.jpg"}),
//   new Character ({name: "Captain America", apiId: "1009220", image:"https://crushingkrisis.com/assets/captain-america-granov.jpg"}),
//    new Character ({name: "Daken", apiId: "1011001", image:"https://i.pinimg.com/originals/2d/4a/fc/2d4afc424a344cd4a3b029f9e5a3c2b6.jpg"}),
//    new Character ({name: "Deadpool", apiId: "1009268", image:"https://i.pinimg.com/originals/51/d7/82/51d782cd43a1a5c16de8261d3b219594.jpg"}),
//   new Character ({name: "Elektra", apiId: "1009288", image:"https://vignette.wikia.nocookie.net/marveldatabase/images/a/a6/Daredevil_Vol_5_5_Women_of_Power_Variant_Textless.jpg/revision/latest?cb=20160314193215"}),
//   new Character ({name: "Echo", apiId: "1010785", image:"https://i.pinimg.com/originals/61/57/7f/61577fcfa13e2822fa3146d3efd751c4.jpg"}),
//   new Character ({name: "Firebird", apiId: "1010868", image:"https://i.pinimg.com/originals/1c/a0/2b/1ca02bcdf458064a026c61923bba7542.jpg"}),
//   new Character ({name: "Falcon", apiId: "1009297", image:"https://i.pinimg.com/originals/fc/b4/43/fcb4438d0b9b3a93a3848beb7efadd7d.jpg"}),
//   new Character ({name: "Galactus", apiId: "1009312", image:"https://i.pinimg.com/originals/b9/64/0d/b9640db439f35441b3212f2408b4b8a7.jpg"}),
//   new Character ({name: "Gambit", apiId: "1009313", image:"https://i.pinimg.com/originals/8e/37/f7/8e37f72b232e049645ce345f94fa4a85.jpg"}),
//   new Character ({name: "Hulk", apiId: "1009351", image:"https://i.pinimg.com/originals/7c/80/00/7c8000538c1ca3d10f8b17f482042e0f.jpg"}),
//   new Character ({name: "Hawkeye", apiId: "1009338", image:"https://i.pinimg.com/originals/4d/be/6d/4dbe6d157c08b4cf899dede85e9de514.jpg"}),
//   new Character ({name: "Ice Man:", apiId: "1009362", image:"https://i.pinimg.com/originals/a1/46/a8/a146a8de805f21e48fddeb8944359fe4.jpg"}),
//   new Character ({name: "Iron Man:", apiId: "1009368", image:"https://i.pinimg.com/originals/e1/12/f8/e112f875d7f05db887f3d7750474fb1a.jpg"}),
//   new Character ({name: "Jocasta", apiId: "1009376", image:"https://i.pinimg.com/originals/18/75/ca/1875caec338dd41e2e8cdf647a86000c.jpg"}),
//   new Character ({name: "Jubilee", apiId: "1009382", image:"https://i.pinimg.com/originals/f0/af/8d/f0af8d1af154bf0c31bebbe77a631506.jpg"}),
//   new Character ({name: "Kitty Pride", apiId: "1009508", image:"https://66.media.tumblr.com/a0e87f1f13f2a82505a04190624d129f/tumblr_okcw6sVfoW1rra8xoo1_500.jpg"}),
//   new Character ({name: "Ka-Zar", apiId: "1011081", image:"https://s-media-cache-ak0.pinimg.com/736x/bc/40/8c/bc408cc59175f303513164b778709205.jpg"}),
//   new Character ({name: "Longshot", apiId: "1009408", image:"http://i.imgur.com/NJc6K3U.jpg"}),
//   new Character ({name: "Loki", apiId: "1009407", image:"https://i.pinimg.com/originals/8d/6b/03/8d6b035fd97bb9879a78abfb1b805bca.jpg"}),
//   new Character ({name: "Moon Knight", apiId: "1009452", image:"https://s-media-cache-ak0.pinimg.com/originals/d5/92/8c/d5928c21a9c5bdaeb00abce1cd1b4ba5.jpg"}),
//   new Character ({name: "Ms. Marvel", apiId: "1017577", image:"https://i.pinimg.com/originals/01/ab/b7/01abb748d52be89fd37826546a40c9ba.jpg"}),
//   new Character ({name: "Nightcrawler", apiId: "1009472", image:"https://i.pinimg.com/originals/b2/a2/2c/b2a22c9dea5bbcd1694ab4a42dfb2cf4.jpg"}),
//   new Character ({name: "Namor", apiId: "1009466", image:"https://i.pinimg.com/originals/f6/37/66/f6376644614f65e434bc53abaa00d5eb.jpg"}),
//   new Character ({name: "Onslaught", apiId: "1009483", image:"https://i.pinimg.com/originals/6b/88/c3/6b88c352eca83497da05bba94abc4a38.jpg"}),
//   new Character ({name: "Odin", apiId: "1009480", image:"https://i.pinimg.com/originals/69/ac/aa/69acaad0287488f8b9badf878b039d6a.jpg"}),
//   new Character ({name: " Proudstar", apiId: "1009504", image:"https://i.pinimg.com/originals/22/af/4c/22af4c00391e2515df75032a4768dd94.jpg"}),
//   new Character ({name: "Professor X", apiId: "1009506", image:"https://i.pinimg.com/originals/3e/5a/96/3e5a962a30c294224c704b47234f9910.jpg"}),
//   new Character ({name: "Quicksilver", apiId: "1009524", image:"https://i.pinimg.com/originals/21/8c/1d/218c1d14a028341a807b0980e94db865.jpg"}),
//   new Character ({name: "Quake (Daisy Johnson)", apiId: "1014528", image:"https://i.pinimg.com/originals/33/f6/e1/33f6e1913ba9d160108b291e4b6ee903.jpg"}),
//   new Character ({name: "Rocket Racoon", apiId: "1010744", image:"https://i.pinimg.com/originals/6f/4a/59/6f4a595f8adba8315de68bae611a6c2e.jpg"}),
//   new Character ({name: "Rogue", apiId: "1009546", image:"https://i.pinimg.com/originals/39/9d/9d/399d9d6fe559598d3c1dd45eba7baf7f.jpg"}),
//   new Character ({name: "Spiderman", apiId: "1009610", image:"https://i.pinimg.com/originals/b8/4e/95/b84e958a2fd6144dfffebb65de4bf4b8.jpg"}),
//   new Character ({name: "Scarlet Witch", apiId: "1009562", image:"https://i.pinimg.com/originals/67/7e/e3/677ee338bc37d26d67a20fa8c77c7f8f.jpg"}),
//   new Character ({name: "Thing", apiId: "1009662", image:"https://pbs.twimg.com/media/DdvxWR-VQAAT-jS.jpg:large"}),
//   new Character ({name: "Thor", apiId: "1009664", image:"https://i.pinimg.com/originals/a4/d3/df/a4d3df694d6151bf0537502661d08dda.jpg"}),
//   new Character ({name: "Union Jack (Brian Falsworth)", apiId: "1010985", image:"https://static.comicvine.com/uploads/original/11/117763/3113011-unionjack.jpg"}),
//   new Character ({name: "Uatu", apiId: "1009683", image:"https://i.pinimg.com/originals/ff/ff/11/ffff1142f1a89b93bb0948d07d687805.jpg"}),
//   new Character ({name: "Valkyrie", apiId: "1010350", image:"https://i.pinimg.com/originals/cb/89/a7/cb89a73a8534d7e642b67cf83fc4cdfb.jpg"}),
//   new Character ({name: "Vision", apiId: "1009697", image:"http://cdn.collider.com/wp-content/uploads/the-vision-marvel.png"}),
//   new Character ({name: "Wasp", apiId: "1009707", image:"https://i.pinimg.com/originals/78/28/0b/78280ba0d2a622a40a5e479edc1f0896.jpg"}),
//   new Character ({name: "Wolverine", apiId: "1009718", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "X-Man", apiId: "1009725", image:"https://i.pinimg.com/originals/0b/c4/d1/0bc4d1c4e0c2670df1a1d77bbe70cda1.jpg"}),
//   new Character ({name: "X-23", apiId: "1009722", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Young X-Men", apiId: "1011277", image:"https://static.comicvine.com/uploads/original/0/77/646276-young_x_men_billy_tan10cov.jpg"}),
//   new Character ({name: "Yellowjacket", apiId: "1010996", image:"https://68.media.tumblr.com/f0733dff12a64fc4857ba799cf8d5b51/tumblr_oqs9gfjvQu1vra80yo1_1280.jpg"}),
//   new Character ({name: "Zzzax", apiId: "1009742", image:"https://image-store.slidesharecdn.com/0901d54d-ed65-4b8a-b0e0-c5872fc6c188-original.jpeg"}),
//   new Character ({name: "Zemo", apiId: "1010780", image:"https://i.pinimg.com/originals/4c/a0/9b/4ca09be8050bb4a940fce42193d00958.jpg"})
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
//   new Letter ({letterChar: "A", characters: ["5bf03095e5e81d70b011103d", "5bf03095e5e81d70b011103f", "5bf03095e5e81d70b011103e","5bf03095e5e81d70b0111040"]}),
//   new Letter ({letterChar: "B", characters: ["5bf03095e5e81d70b0111041", "5bf03095e5e81d70b0111042", "5bf03095e5e81d70b0111044","5bf03095e5e81d70b0111043"]}),
//   new Letter ({letterChar: "C", characters: ["5bf03095e5e81d70b0111047", "5bf03095e5e81d70b0111046", "5bf03095e5e81d70b0111045"]}),
//   new Letter ({letterChar: "D", characters: ["5bf03095e5e81d70b0111049","5bf03095e5e81d70b0111048" ]}),
//   new Letter ({letterChar: "E", characters: ["5bf03095e5e81d70b011104b", "5bf03095e5e81d70b011104a"]}),
//   new Letter ({letterChar: "F", characters: ["5bf03095e5e81d70b011104c", "5bf03095e5e81d70b011104d"]}),
//   new Letter ({letterChar: "G", characters: ["5bf03095e5e81d70b011104e", "5bf03095e5e81d70b011104f"]}),
//   new Letter ({letterChar: "H", characters: ["5bf03095e5e81d70b0111051", "5bf03095e5e81d70b0111050"]}),
//   new Letter ({letterChar: "I", characters: ["5bf03095e5e81d70b0111053", "5bf03095e5e81d70b0111052"]}),
//   new Letter ({letterChar: "J", characters: ["5bf03095e5e81d70b0111055", "5bf03095e5e81d70b0111054"]}),
//   new Letter ({letterChar: "K", characters: ["5bf03095e5e81d70b0111056", "5bf03095e5e81d70b0111057"]}),
//   new Letter ({letterChar: "L", characters: ["5bf03095e5e81d70b0111058", "5bf03095e5e81d70b0111059"]}),
//   new Letter ({letterChar: "M", characters: ["5bf03095e5e81d70b011105b", "5bf03095e5e81d70b011105a"]}),
//   new Letter ({letterChar: "N", characters: ["5bf03095e5e81d70b011105d", "5bf03095e5e81d70b011105c"]}),
//   new Letter ({letterChar: "O", characters: ["5bf03095e5e81d70b011105f", "5bf03095e5e81d70b011105e"]}),
//   new Letter ({letterChar: "P", characters: ["5bf03095e5e81d70b0111060", "5bf03095e5e81d70b0111061"]}),
//   new Letter ({letterChar: "Q", characters: ["5bf03095e5e81d70b0111062", "5bf03095e5e81d70b0111063"]}),
//   new Letter ({letterChar: "R", characters: ["5bf03095e5e81d70b0111065", "5bf03095e5e81d70b0111064" ]}),
//   new Letter ({letterChar: "S", characters: ["5bf03095e5e81d70b0111066","5bf03095e5e81d70b0111067"]}),
//   new Letter ({letterChar: "T", characters: ["5bf03095e5e81d70b0111069", "5bf03095e5e81d70b0111068"]}),
//   new Letter ({letterChar: "U", characters: ["5bf03095e5e81d70b011106a", "5bf03095e5e81d70b011106b"]}),
//   new Letter ({letterChar: "V", characters: ["5bf03095e5e81d70b011106c", "5bf03095e5e81d70b011106d"]}),
//   new Letter ({letterChar: "W", characters: ["5bf03095e5e81d70b011106f", "5bf03095e5e81d70b011106e"]}),
//   new Letter ({letterChar: "X", characters: ["5bf03095e5e81d70b0111071", "5bf03095e5e81d70b0111070"]}),
//   new Letter ({letterChar: "Y", characters: ["5bf03095e5e81d70b0111073", "5bf03095e5e81d70b0111072"]}),
//   new Letter ({letterChar: "Z", characters: ["5bf03095e5e81d70b0111074", "5bf03095e5e81d70b0111075"]})
// ]
//
// letters.forEach(letter => {
//   letter.save().then(() => { console.log("Created", letter.letterChar )})
// })

app.listen(8080, () =>
  console.log("Marvel ABC listening on port 8080!")
)

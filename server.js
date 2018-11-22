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

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/Sprint6_MarvelABC"
mongoose.connect(mongoUrl, { useMongoClient: true })
mongoose.Promise = Promise
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

const Letter = mongoose.model ("Letter", {
  letterChar: String,
  characters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
  memories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Memory'}]
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
  Letter.find().populate("characters").sort("letterChar").then(letters => {
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

  app.post("/characters/", (req, res) => {
    const character = new Character(req.body)
    character.save()
      .then(() => {Character.findOne({name:character.name}).then((character)=> {character.id})})
      .then(()=> {})
      .catch(err => { res.status(400).send(err) })
  })



// const characters = [
//   new Character ({name: "Armor", apiId: "1011298", image:"https://www.comicbox.com/wp-content/gallery/march2012xmen/wolvxmao2012001003_cov.jpg", description: "Ambitious young Hisako Ichiki enrolled at the Xavier Institute for its second public term. Hisako opposed the alien Ord when he infiltrated the Institute and threatened her and her close friend, fellow student Wing", gender: "female", universe:"X-men", alias: "Hisako Ichiki"}),
//   new Character ({name: "Amadeus Cho", apiId: "1011227", image:"https://sm.ign.com/ign_de/gallery/v/vorschau-t/vorschau-the-totally-awesome-hulk-1-ganz-neu-und-o_psq1.jpg", description: `Many things can be said about Amadeus Cho. He is the seventh-smartest person in the world, he is Korean-American, is friends with the Hulk—and he even became the Hulk himself.`, gender: "Male", universe: "Avengers", alias: "Amadeus Cho"}),
//   new Character ({name: "Angel", apiId: "1009153", image:"https://i.pinimg.com/originals/22/6d/7d/226d7dfd3556dc580725082394d52471.jpg", description: `Born into an extremely wealthy family, young Warren attended a prestigious East Coast boarding school where he roomed with Cameron Hodge. Warren's life changed forever the day he began sprouting wings from his shoulder blades.`, gender: "Male", universe: "X-men", alias: "Warren Worthington"}),
//   new Character ({name: "Ant-Man", apiId: "1010801", image:"http://3.bp.blogspot.com/-8C0UIrZZmNw/Va1UC3Bet3I/AAAAAAAAVnE/YLnZtE7KxKk/s1600/ant9.jpg", description: `When ex-criminal Scott Lang turned to his illicit skills in order to save his daughter’s life, he unexpectedly became the size-shifting, insect-commanding Super Hero known as Ant-Man!`, gender: "Male", universe: "Avengers", alias: "Scott Lang"}),
//   new Character ({name: "Beta-Ray-Bill", apiId: "1009180", image:"https://pbs.twimg.com/media/Dg1CiKcUwAAQTik.jpg", description: `Bill becomes the first being outside the Marvel Universe's Norse pantheon to be deemed worthy to wield Thor's hammer, Mjolnir.`, gender: "Male", universe: "Asgard", alias: "Beta Ray Bill"}),
//   new Character ({name: "Black Panther", apiId: "1009187", image:"https://imagesvc.timeincapp.com/v3/fan/image?url=https://fansided.com/files/2018/02/black-panther-1-2018-header.jpg&", description: `As the king of the African nation of Wakanda, T’Challa protects his people as the latest in a legacy line of Black Panther warriors.`, gender: "Male", universe: "Avengers", alias: `King T'challa`}),
//   new Character ({name: "Beast", apiId: "1009175", image:"https://i.pinimg.com/originals/cd/69/2c/cd692c497eef8031a4d084060e13fe22.jpg", description: `Originally called "The Beast", the character was introduced as a mutant possessing ape-like superhuman physical strength and agility, oversized hands and feet, a genius-level intellect, and otherwise normal appearance and speech.`, gender: "Male", universe: "X-Men", alias: "Hank Mckoy"}),
//   new Character ({name: "Black Widow", apiId: "1009189", image:"http://news.entertainmentearth.com/wp-content/uploads/2015/10/black-widow1.jpg", description:  `Natasha Romanov is a Russian agent trained as a spy, martial artist, and sniper, and outfitted with an arsenal of high-tech weaponry, including a pair of wrist-mounted energy weapons dubbed her "Widow's Bite”.`, gender: "Female", universe: "Avengers", alias: "Natasha Romanov"}),
//   new Character ({name: "Colossus", apiId: "1009243", image:"https://www.syfy.com/sites/syfy/files/wire/legacy/Colossus-Marvel-comics.jpg", description:  `Piotr "Peter" Nikolayevich Rasputin is a  Russian mutant and member of the X-Men. Colossus is able to transform himself into metallic form, making him the physically strongest of the team.`, gender: "Male", universe: "X-men", alias: "Piotr Rasputin"}),
//   new Character ({name: "Captain Marvel", apiId: "1010338", image:"https://hicomm.bg//uploads/articles/201711/54592/mainimage-dzhud-lou-e-vtorata-golyama-zvezda-v-captain-marvel.jpg", description: "After an alien device mutated her DNA, Danvers transformed from a merely brilliant pilot into one of the most powerful Super Heroes in the universe. Now soaring among the stars, Carol Danvers is known as Captain Marvel.", gender: "Female", universe: "Avengers", alias:"Carol Danvers"}),
//   new Character ({name: "Captain America", apiId: "1009220", image:"https://crushingkrisis.com/assets/captain-america-granov.jpg", description: "When Steve Rogers enlisted to fight in World War II, he didn’t do it to become a hero, or an icon, or a legend; he did it because he felt it was the right thing to do.", gender: "Male", universe: "Avengers", alias: "Steve Rogers"}),
//   new Character ({name: "Daken", apiId: "1011001", image:"https://i.pinimg.com/originals/2d/4a/fc/2d4afc424a344cd4a3b029f9e5a3c2b6.jpg", description: `Daken is the mutant son of Wolverine and his deceased wife Itsu. He possesses superhuman abilities similar to his father (e.g., healing factor, retractable claws), and was a member of the Dark Avengers under the name Wolverine.`, gender: "Male", universe: "X-men", alias: "Daken"}),
//   new Character ({name: "Deadpool", apiId: "1009268", image:"https://i.pinimg.com/originals/51/d7/82/51d782cd43a1a5c16de8261d3b219594.jpg", description: "Wade Wilson was born in Canada, but grew up to become the least Canadian person ever. When it comes to the Merc with a Mouth, with great power comes no responsibility.", gender: "Male", universe: "X-men", alias: "Wade Wilson"}),
//   new Character ({name: "Elektra", apiId: "1009288", image:"https://vignette.wikia.nocookie.net/marveldatabase/images/a/a6/Daredevil_Vol_5_5_Women_of_Power_Variant_Textless.jpg/revision/latest?cb=20160314193215", description: "An assassin and bounty hunter trained by the ancient ninja cult known as the Hand, Elektra Natchios has a history of getting her jobs done—even when her allies get in the way.", gender: "Female", universe: "Daredevil", alias: "Elektra Natchios"}),
//   new Character ({name: "Echo", apiId: "1010785", image:"https://i.pinimg.com/originals/61/57/7f/61577fcfa13e2822fa3146d3efd751c4.jpg", description: "Maya Lopez is a supernatural fighter that can replicate any fighting style after seeing it once. She is a Native American and one of the very few deaf comic characters.", gender: "Female", universe: "Daredevil", alias: "Maya Lopez"}),
//   new Character ({name: "Firebird", apiId: "1010868", image:"https://i.pinimg.com/originals/1c/a0/2b/1ca02bcdf458064a026c61923bba7542.jpg", description: "While walking in the deserts of Albuquerque, New Mexico, Firebird came into contact with a radioactive meteorite fragment. The radiation altered her DNA, and gave her the power to generate flames and heat, and even fly.", gender: "Female", universe: "Avengers", alias: "Bonita Juarez"}),
//   new Character ({name: "Falcon", apiId: "1009297", image:"https://i.pinimg.com/originals/fc/b4/43/fcb4438d0b9b3a93a3848beb7efadd7d.jpg", description: "When Captain America asked Air Force Veteran Sam Wilson for help, Wilson immediately agreed. He donned the flight suit he’d used in combat to become the Falcon, setting him on a path towards becoming an Avenger.", gender: "Male", universe: "Avengers", alias: "Sam Wilson"}),
//   new Character ({name: "Galactus", apiId: "1009312", image:"https://i.pinimg.com/originals/b9/64/0d/b9640db439f35441b3212f2408b4b8a7.jpg", description: "Galactus is a cosmic entity who originally consumed planets to sustain his life force, and serves a functional role in the upkeep of the universe.", gender: "Male", universe: "Fantastic Four", alias: "Galan"}),
//   new Character ({name: "Gambit", apiId: "1009313", image:"https://i.pinimg.com/originals/8e/37/f7/8e37f72b232e049645ce345f94fa4a85.jpg", description: "Gambit has the ability to mentally create, control, and manipulate pure kinetic energy to his desire. He is also incredibly knowledgeable and skilled in card throwing, hand-to-hand combat.", gender: "Male", universe: "X-men", alias: "Remy Lebeau"}),
//   new Character ({name: "Hulk", apiId: "1009351", image:"https://i.pinimg.com/originals/7c/80/00/7c8000538c1ca3d10f8b17f482042e0f.jpg", description: "Exposed to heavy doses of gamma radiation, scientist Bruce Banner transforms into the mean, green rage machine called the Hulk.", gender: "Male", universe: "Avengers", alias: "Bruce Banner"}),
//   new Character ({name: "Hawkeye", apiId: "1009338", image:"https://i.pinimg.com/originals/4d/be/6d/4dbe6d157c08b4cf899dede85e9de514.jpg", description: "An expert marksman and fighter, Clint Barton puts his talents to good use by working for S.H.I.E.L.D. as a special agent. The archer known as Hawkeye also boasts a strong moral compass that at times leads him astray from his direct orders.", gender: "Male", universe: "Avengers", alias: "Clint Barton"}),
//   new Character ({name: "Ice Man", apiId: "1009362", image:"https://i.pinimg.com/originals/a1/46/a8/a146a8de805f21e48fddeb8944359fe4.jpg", description: "Bobby Drake has the ability to manipulate ice and cold by freezing water vapor around him. This allows him to freeze objects, as well as turn his body into ice.", gender: "Male", universe: "X-men", alias: "Bobby Drake"}),
//   new Character ({name: "Iron Man", apiId: "1009368", image:"https://i.pinimg.com/originals/e1/12/f8/e112f875d7f05db887f3d7750474fb1a.jpg", description: "Inventor Tony Stark applies his genius for high-tech solutions to problems as Iron Man, the armored Avenger.", gender: "Male", universe: "Avengers", alias: "Tony Stark"}),
//   new Character ({name: "Jocasta", apiId: "1009376", image:"https://i.pinimg.com/originals/18/75/ca/1875caec338dd41e2e8cdf647a86000c.jpg", description: "Jocasta is an artificial intelligence, originally Ultron's creation, she is a member of the Avengers and also a robot.", gender: "Female?", universe: "Avengers", alias: "Jocasta"}),
//   new Character ({name: "Jubilee", apiId: "1009382", image:"https://i.pinimg.com/originals/f0/af/8d/f0af8d1af154bf0c31bebbe77a631506.jpg", description: `Jubilation Lee can generate pyrotechnic energy blasts from her hands. She was introduced as an orphaned "mall rat" from Beverly Hills and joined the X-men as one their youngest members.`, gender: "Female", universe: "X-men", alias: "Jubilation Lee"}),
//   new Character ({name: "Kitty Pride", apiId: "1009508", image:"https://66.media.tumblr.com/a0e87f1f13f2a82505a04190624d129f/tumblr_okcw6sVfoW1rra8xoo1_500.jpg", description: `Kitty possesses a "phasing" ability that allows her, as well as objects or people she is in contact with, to become intangible.[1] This power also disrupts any electrical field she passes through, and lets her simulate levitation.`, gender: "Female", universe: "X-men", alias: "Kitty Pride"}),
//   new Character ({name: "Ka-Zar", apiId: "1011081", image:"https://s-media-cache-ak0.pinimg.com/736x/bc/40/8c/bc408cc59175f303513164b778709205.jpg", description: `Plunder was found and raised by the sabertooth tiger Zabu, who possesses near-human intelligence thanks to a mutation caused by radioactive mists. "Ka-Zar" means "Son of the Tiger" in the language of the Man-Apes.`, gender: "Male", universe: "X-men", alias: "Kevin Plunder" }),
//   new Character ({name: "Longshot", apiId: "1009408", image:"http://i.imgur.com/NJc6K3U.jpg", description: `Longshot is an artificially created humanoid life-form, with the ability to defy probability. He is from an alternate dimension known as "Mojoworld" or the "Mojoverse”. He’s basically very very lucky.`, gender: "Male", universe: "X-men", alias: "Longshot"}),
//   new Character ({name: "Loki", apiId: "1009407", image:"https://i.pinimg.com/originals/8d/6b/03/8d6b035fd97bb9879a78abfb1b805bca.jpg", description: "Loki, Prince of Asgard, Odinson, rightful heir of Jotunheim, and God of Mischief, is burdened with glorious purpose. His desire to be a king drives him to sow chaos in Asgard. In his lust for power, he extends his reach to Earth.", gender: "Male", universe: "Asgard", alias: "Loki"}),
//   new Character ({name: "Moon Knight", apiId: "1009452", image:"https://s-media-cache-ak0.pinimg.com/originals/d5/92/8c/d5928c21a9c5bdaeb00abce1cd1b4ba5.jpg", description: "Marc Spector was a mercenary fighting in Egypt when he died and got resurrected by the Moon God Khoshnu, obtaining the powers of the Moon and multiple personalities.", gender: "Male", universe: "Avengers", alias: "Marc Spector"}),
//   new Character ({name: "Ms. Marvel", apiId: "1017577", image:"https://i.pinimg.com/originals/01/ab/b7/01abb748d52be89fd37826546a40c9ba.jpg", description: `Kamala is a teenage Pakistani American from Jersey City, New Jersey with shapeshifting abilities who discovers that she has Inhuman genes in the aftermath of the "Inhumanity" storyline and assumes the mantle of Ms. Marvel from her idol Carol Danvers.`, gender: "Female", universe: "Avengers", alias: "Kamala Khan"}),
//   new Character ({name: "Nightcrawler", apiId: "1009472", image:"https://i.pinimg.com/originals/b2/a2/2c/b2a22c9dea5bbcd1694ab4a42dfb2cf4.jpg", description: "Nightcrawler possesses superhuman agility, the ability to teleport, and adhesive hands and feet. His physical mutations include indigo-colored velvety fur which allows him to become nearly invisible in shadows.", gender: "Male", universe: "X-men", alias: "Kurt Wagner"}),
//   new Character ({name: "Namor", apiId: "1009466", image:"https://i.pinimg.com/originals/f6/37/66/f6376644614f65e434bc53abaa00d5eb.jpg", description: "The offspring of an Atlantean princess and an American explorer, the powerful mutant Namor is a force to behold. While he occasionally leaves his kingdom to work with - or fight against - humanity, Atlantis is always his utmost priority.", gender: "Male", universe: "Avengers", alias: "Namor"}),
//   new Character ({name: "Onslaught", apiId: "1009483", image:"https://i.pinimg.com/originals/6b/88/c3/6b88c352eca83497da05bba94abc4a38.jpg", description: `Onslaught is the amalgamation of Magneto and Professor X’s psyche after Xavier mind wiped Magneto, possessing the omega level mutant powers of both men in one psionic all powerful being.`, gender: "Male", universe: "X-men", Alias: "????"}),
//   new Character ({name: "Odin", apiId: "1009480", image:"https://i.pinimg.com/originals/69/ac/aa/69acaad0287488f8b9badf878b039d6a.jpg", description: "King of Asgard and protector of the Nine Realms, Odin the All-Father once led with only conquest in mind. Eventually, he recognized the benefits of lasting peace and changed his ways.", gender: "Male", universe: "Asgard", alias: "Odin Borson"}),
//   new Character ({name: "Proudstar", apiId: "1009504", image:"https://i.pinimg.com/originals/22/af/4c/22af4c00391e2515df75032a4768dd94.jpg", description:  "Proudstar possesses mutant superhuman strength and speed. His powers resemble those of his older brother, the short-lived X-Men member Thunderbird, although Warpath's power-levels are much higher.", gender: "Male", universe: "X-Men", alias: "James Proudstar"}),
//   new Character ({name: "Professor X", apiId: "1009506", image:"https://i.pinimg.com/originals/3e/5a/96/3e5a962a30c294224c704b47234f9910.jpg", description: "The founder of the X-Men, Xavier is an exceptionally powerful telepath who can read and control the minds of others. To both shelter and train mutants from around the world, he runs a private school in New York State.", gender: "Male", universe: "X-Men", alias: "Charles Francis Xavier"}),
//   new Character ({name: "Quicksilver", apiId: "1009524", image:"https://i.pinimg.com/originals/21/8c/1d/218c1d14a028341a807b0980e94db865.jpg", description: "Quicksilver has the superhuman ability to move at great speeds. In most depictions, he is a mutant, a human born with innate superhuman powers.", gender: "Male", universe: "Avengers/X-men", alias: "Pietro Maximoff"}),
//   new Character ({name: "Quake", apiId: "1014528", image:"https://i.pinimg.com/originals/33/f6/e1/33f6e1913ba9d160108b291e4b6ee903.jpg", description: "The daughter of the supervillain Mister Hyde, she is a secret agent of the intelligence organization S.H.I.E.L.D. with the power to generate earthquakes.", gender: "Female", universe: "Shield", alias: "Daisy Johnson"}),
//   new Character ({name: "Rocket Racoon", apiId: "1010744", image:"https://i.pinimg.com/originals/6f/4a/59/6f4a595f8adba8315de68bae611a6c2e.jpg", description: `Ain’t no thing like Rocket, ‘cept Rocket. He lives for the simple things, including collecting valuable bounty alongside his friend and partner, Groot. Quick to train a weapon on anyone who offends him, he’s far more formidable than he appears.`, gender: "Male", universe: "Guardians of the Galaxy", alias: "Trash Rabbit"}),
//   new Character ({name: "Rogue", apiId: "1009546", image:"https://i.pinimg.com/originals/39/9d/9d/399d9d6fe559598d3c1dd45eba7baf7f.jpg", description:  "After she discovered her mutant powers—that, by touch, she was able to absorb memories, powers, and personality traits from others—Rogue went on a long journey that ultimately led her to become a leader for both the X-Men and the Avengers.", gender: "Female", universe: "X-Men", alias: "Anna Maria"}),
//   new Character ({name: "Spiderman", apiId: "1009610", image:"https://i.pinimg.com/originals/b8/4e/95/b84e958a2fd6144dfffebb65de4bf4b8.jpg", description: "With amazing spider-like abilities, teenage science whiz Peter Parker fights crime and dreams of becoming an Avenger as Spider-Man.", gender: "Male", universe: "Avengers", alias: "Peter Parker"}),
//   new Character ({name: "Scarlet Witch", apiId: "1009562", image:"https://i.pinimg.com/originals/67/7e/e3/677ee338bc37d26d67a20fa8c77c7f8f.jpg", description: "Notably powerful, Wanda Maximoff has fought both against and with the Avengers, attempting to hone her abilities and do what she believes is right to help the world.", gender: "Female", universe: "Avengers", alias: "Wanda Maximoff"}),
//   new Character ({name: "Thing", apiId: "1009662", image:"https://pbs.twimg.com/media/DdvxWR-VQAAT-jS.jpg:large", description: `Ben Grimm is the ever loving blue eyed Thing, heart and muscle of the Fantastic Four. It’s Clobberin’ Time!`, gender: "Male", universe: "Fantastic Four", alias: "Ben Grimm"}),
//   new Character ({name: "Thor", apiId: "1009664", image:"https://i.pinimg.com/originals/a4/d3/df/a4d3df694d6151bf0537502661d08dda.jpg", description: "Thor Odinson wields the power of the ancient Asgardians to fight evil throughout the Nine Realms and beyond.", gender: "Male", universe: "Avengers/Asgard", alias: "Thor"}),
//   new Character ({name: "Union Jack", apiId: "1010985", image:"https://static.comicvine.com/uploads/original/11/117763/3113011-unionjack.jpg", description: "Brian Falsworth possessed no superhuman powers. He was a superbly athletic man, but, having been exposed to a variant of the Super Soldier Formula, was enhanced to the peak of human potential, and was highly trained in armed and unarmed combat.", gender: "Male", universe: "Avengers", alias: "Brian Falsworth"}),
//   new Character ({name: "Uatu", apiId: "1009683", image:"https://i.pinimg.com/originals/ff/ff/11/ffff1142f1a89b93bb0948d07d687805.jpg", description: "Uatu is a member of the Watchers, an extraterrestrial species who in the distant past stationed themselves across space to monitor the activities of other species. Uatu is the Watcher assigned to observe Earth and its solar system.", gender: "Male", universe: "Fantastic Four", alias: "Uatu"}),
//   new Character ({name: "Valkyrie", apiId: "1010350", image:"https://i.pinimg.com/originals/cb/89/a7/cb89a73a8534d7e642b67cf83fc4cdfb.jpg", description: "Gifted the power of the legendary Asgardian Brunnhilde, Parrington assumed the mantle and the cosmic responsibilities of the Valkyrie.", gender: "Female", universe: "Asgard", alias: "Valkrie"}),
//   new Character ({name: "Vision", apiId: "1009697", image:"http://cdn.collider.com/wp-content/uploads/the-vision-marvel.png", description: "A fully unique being, Vision came about thanks to a combination of Wakandan Vibranium, Asgardian lightning, an Infinity Stone, and more.", gender: "Male", universe: "Avengers", alias: "Vision"}),
//   new Character ({name: "Wasp", apiId: "1009707", image:"https://i.pinimg.com/originals/78/28/0b/78280ba0d2a622a40a5e479edc1f0896.jpg", description: "From the northern wilderness of Canada hails one of the gruffest, most irascible, totally cynical and brooding member of the X-Men ever to grace the team with his presence.", gender: "Male", universe: "X-Men", alias: "James Howlett, Patch, Weapon X"}),
//   new Character ({name: "Wolverine", apiId: "1009718", image:"https://i.pinimg.com/originals/83/10/c2/8310c27849e8490dbd7023a7de5c9616.jpg"}),
//   new Character ({name: "X-Man", apiId: "1009725", image:"https://i.pinimg.com/originals/0b/c4/d1/0bc4d1c4e0c2670df1a1d77bbe70cda1.jpg", description: "Nate Summers comes from an Apocalyptic timeline where he was one of the most powerful mutants alive. Now he fights for our universe to ensure his past doesn’t become out future.", gender: "Male", universe: "X-Men", alias: "Nate Summers"}),
//   new Character ({name: "X-23", apiId: "1009722", image:"https://i.pinimg.com/originals/b7/07/51/b70751ae67017f1544059bad76528c4e.jpg", description: "X-23 was apparently the clone and later adopted daughter of Wolverine, created to be the perfect killing machine. For years, she proved herself a capable assassin working for an organization called the Facility. She becomes a hero in her own right after wearing the mantle of Wolverine.", gender: "Female", universe: "X-Men",alias: "Laura Kinney"}),
//   new Character ({name: "Young X-Men", apiId: "1011277", image:"https://static.comicvine.com/uploads/original/0/77/646276-young_x_men_billy_tan10cov.jpg", description: "The second generation of X-men.", gender: "Male", universe: "Avengers", alias: "Not applicable" }),
//   new Character ({name: "Yellowjacket", apiId: "1010996", image:"https://68.media.tumblr.com/f0733dff12a64fc4857ba799cf8d5b51/tumblr_oqs9gfjvQu1vra80yo1_1280.jpg", description: "The experimental nucleorganic pacemaker that saved Cross from his heart condition also granted him superhuman abilities such as enhanced physical attributes, increased sensory perception, and a regenerative healing factor.", gender: "Male", universe: "Avengers", alias: "Darren Cross"}),
//   new Character ({name: "Zzzax", apiId: "1009742", image:"https://www.frogx3.com/wp-content/uploads/2013/07/ilustraciones-sixmorevodka-fireman.jpg", description: "The collected entity of a host of individuals who died a violent death at a nuclear power plant.", gender: "Male", universe: "Avengers", alias:"not applicable"}),
//   new Character ({name: "Zemo", apiId: "1010780", image:"https://i.pinimg.com/originals/4c/a0/9b/4ca09be8050bb4a940fce42193d00958.jpg", description: "Baron Zemo is a hydra commander who has inherited his title from a lineage of Zemo’s bent on overthrowing America and battle Captain America.", gender: "Male", universe: "Avengers", alias: "Helmutt Zemo"})
// ]
//
//
// const charsCreators = characters.map(character => {
//   character.save().then (() => {console.log("Created", character.name)})
// })
//
// Promise.all(charsCreators).then(() => {
//   const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "Q", "W", "X", "Y", "Z"]
//
//   letters.forEach(letter => {
//     Character.find({ name: new RegExp(`^${letter}`) }).then(chars => {
//       const ids = chars.map(c => c._id)
//       const l = new Letter({ letterChar: letter, characters: ids })
//       l.save().then(() => {
//         console.log("created letter", letter)
//       })
//     })
//   })
// })





const port = process.env.PORT || 8080
app.listen(port, () =>
  console.log(`Server running on port ${port}`)
)

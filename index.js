import express from "express"
import multer from "multer";
import path from "path"
import fs from "fs"

const app = express()
const port = 3000
var verified = false

const uploadPath = '/var/data/uploads';

// Ensure directories exist
const dirs = [
  path.join(uploadPath, 'user_uploads'),
  path.join(uploadPath, 'user_uploads_campus')
];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.originalUrl.includes("food")) {
      cb(null, path.join(uploadPath, 'user_uploads'));
    } else if (req.originalUrl.includes("campus-life")) {
      cb(null, path.join(uploadPath, 'user_uploads_campus'));
    } else {
      cb(null, uploadPath); // default upload path if no match
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

let posts = []
let posts_camp = []

//middlewares here

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/food", (req, res) => {
    res.render('food.ejs', { posts: posts,
        authenticated: verified,
     });
})

app.get("/campus-life", (req, res) => {
    res.render("campus.ejs", {posts: posts_camp,
        authenticated: verified
    })
})


app.post("/food/submit", upload.single('image'),(req, res) => {
    const comment = req.body["food"]
    const name = req.body["food-name"]
    const imagePath = uploadPath + `/user_uploads/${req.file.filename}`
    if (name && comment) {
        posts.push({ username: name, comment: comment, image: imagePath, timestamp: new Date().toLocaleString() });
    }
    res.redirect("/food")
})

app.post("/campus-life/submit", upload.single('image'),(req, res) => {
    const comment = req.body["food"]
    const name = req.body["food-name"]
    const imagePath = uploadPath + `/user_uploads/${req.file.filename}`
    if (name && comment) {
        posts_camp.push({ username: name, comment: comment, image: imagePath, timestamp: new Date().toLocaleString() });
    }
    res.redirect("/campus-life")
})

app.get("/admin", (req, res) => {
    res.render("verify.ejs")
})


app.post("/admin/verify", (req, res) => {
    //default password
    if (req.body["password"] != "123456") {
        res.render("verify.ejs", {wrong: "Password is Wrong, Please try again"})
    } else {
        verified = true
        res.redirect("/")
    }
})

app.listen(port, () => {
    console.log("listening on port", port)
})
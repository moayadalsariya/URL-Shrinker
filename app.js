const express = require("express");
const app = express();
const mongo = require("mongoose");
const PORT = 3000;
const shortUrl = require("./models/shortUrl");
const methodOverride = require("method-override");

// mongoDb setup
mongo.connect('mongodb://localhost:27017/short_url', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended: false
}))

// Routes


app.get("/", (req, res) => {
    shortUrl.find({}, function (err, found) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                item: found
            })
        }
    })

})

app.post("/shortUrl", async (req, res) => {
    await shortUrl.create({
        full: req.body.fullUrl
    });

    res.redirect("/");
})

app.get("/:shortUrl", async (req, res) => {
    const url = await shortUrl.findOne({short : req.params.shortUrl});
    if(url == null) {
        return res.sendStatus(404);
    } 
    url.clicks++;
    url.save();
    res.redirect(url.full);
})

app.delete("/:id", (req, res) => {
    shortUrl.findByIdAndRemove(req.params.id, (err, delete_data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("data successful remove!!!");
        }
        res.redirect("/");
    })
})


app.listen(PORT, () => {
    console.log(`the server is running on port ${PORT}`);
})
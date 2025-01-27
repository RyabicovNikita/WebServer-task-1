const express = require("express");
const path = require("path");

const { add, getNotes, removeNote, editNote } = require("./controller");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.resolve(__dirname, "public")));

app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await add(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/:id", async (req, res) => {
  await editNote(req.params.id, req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log("Server has been start on port " + port);
});

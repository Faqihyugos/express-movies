const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

const movies = [
  {id: 67, title: "Spiderman:work from home", year: 2021},
  {id: 89, title: "The Batman", year: 2022},
  {id: 99, title: "Doctor Strange: Multiverse of madness", year: 2022},
]

app.use(express.json())

app.get("/", (req, res) => {
  res.json("hello ini dari express")
})

// memberikan semua data film
app.get("/movies", (req, res) => {
  res.json(movies)
})

// memberikan semua data film berdasarkan ID
app.get("/movies/:id", (req, res) => {
  const { id } = req.params

  const movie = movies.find(item => (item.id == id))

  res.json(movie)
})

// menambahakan film
app.post("/movies", (req, res) => {

  // mengambil Id dari data array
  let itemIds = movies.map(item => item.id);

  // membuat id baru (pada dasarnya +1 dari objek item terakhir)
  let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

  // buat objek Item baru
  let newItem = {
    id: newId,
    title: req.body.title, // set nilai `title` dapatkan dari req
    year: req.body.year // set nilai `year` dapatkan dari req
  };

  movies.push(newItem)

  res.json("data berhasil di tambahkan")
})

// Menghapus film berdasarkan ID
// pakai app.DELETE()
app.delete("/movies/:id", (req, res) =>{
  // temukan item dari array data
  let found = movies.find((item) => {
    return item.id === parseInt(req.params.id)
  })

  if (found) {
    // jika item ditemukan maka temukan indeks di mana item tersebut berada
    // stored in the `movies` array
    let targetIndex = movies.indexOf(found);

    // splice berarti menghapus item dari array `movies` menggunakan indeks
    movies.splice(targetIndex, 1);
  }

  res.json("data berhasil di hapus")
});

// Mengupdate film berdaasrkan ID
// pakai app.PUT()
app.put("/movies/:id", (req,res) => {
  let found = movies.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  // check if item found
  if (found) {
    let updated = {
        id: found.id,
        title: req.body.title, // set nilai `title` dapatkan dari req
        year: req.body.year // set nilai `year` dapatkan dari req
    };

    // find index of found object from array of movies
    let targetIndex = movies.indexOf(found);

    // replace object from movie list with `updated` object
    movies.splice(targetIndex, 1, updated);

    
    res.json("data berhasil di update");
  } else {
      res.sendStatus(404).json("error");
  }
});

app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
})
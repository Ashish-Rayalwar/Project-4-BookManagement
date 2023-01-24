const express = require("express")
const { registerUser,loginUser } = require("../Controller/userController")
const { createBook,getBooks,getBookById,updateBookById,deleteBookById } = require("../Controller/bookController.js")
const { verifyToken,verifyTokenAndAuthorization } = require("../Middleware/middleware")

const route = express.Router()


route.post("/register", registerUser )
route.post("/login", loginUser )
route.post("/books", verifyToken, createBook)
route.get("/books", verifyToken, getBooks)
route.get("/books/:bookId", verifyToken, getBookById)
route.put("/books/:bookId",  updateBookById)
route.delete("/books/:bookId",  deleteBookById)



route.all("/*",(req,res)=>{
    console.log("Plz enter valid route");
    res.status(400).send({msg:"invalid route"})
})



module.exports = route

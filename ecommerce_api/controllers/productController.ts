/* Product controller */
import {Request, Response} from "@types/express"
import validator from "validator"


const createProduct = async (req, res) => {
     const { title, description, price } = req.body
if (!title) {
     return res.status(400).json({"message": "Product title field must not be empty"})

if(!description){
return res.status(400).json({"message": "Product description field must not be empty"})
if(!price){
return res.status(400).json({"message": "Product price field must not be empty"})
}
if(validator.isDecimal(price)){

return res.status(400).json({"message": "Product price field must be a decimal value"})

}

const newProduct = new Price({
title, 
description

})
export {}
import { Request, Response } from "express";
import validator from "validator";
import prisma from "../db/prismaClient";

const createProduct = (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;
        if (validator.isEmpty(name) || name.length <= 6) {
            return res.status(400).json({ message: "Product must have a name" });
        }
        if (validator.isEmpty(description) || description.length <= 6) {
            return res.status(400).json({ message: "Description cannot be empty" });
        }
        if (validator.isEmpty(price)) {
            return res.status(400).json({ message: "Price field cannot be empty" });
        } else if (!validator.isDecimal(price)) {
            return res.status(400).json({ message: "Price must be a decimal value" });
        }

    } catch (e) {
        console.error("Error creating product:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const allProducts = await prisma.product.findMany({})
        return res.status(200).json({ allProducts })
    } catch (e) {
        return res.status(500).json({ "message": "Something went wrong on our end while fetching all products" })
    }
}

const getProductById = async (req: Request<{ id: string }, any, any>, res: Response) => {
    const { id } = req.params;
    try {
        const productId = parseInt(id);
        const product = await prisma.product.findFirst({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ product });
    } catch (e) {
        console.error("Error fetching product by ID:", e);
        return res.status(500).json({ message: "Something went wrong while fetching product by ID" });
    }
};

const updateProduct = async (req: Request<{ id: string }, any, { name: string; description: string; price: string }>, res: Response) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {

        if (validator.isEmpty(name) || name.length <= 6) {
            return res.status(400).json({ message: "Product must have a name" });
        }
        if (validator.isEmpty(description) || description.length <= 6) {
            return res.status(400).json({ message: "Description cannot be empty" });
        }
        if (validator.isEmpty(price)) {
            return res.status(400).json({ message: "Price field cannot be empty" });
        } else if (!validator.isDecimal(price)) {
            return res.status(400).json({ message: "Price must be a decimal value" });
        }

        const productId = parseInt(id);
        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: { name, description, price: parseFloat(price) } // Ensure price is parsed to float
        });

        return res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (e) {
        console.error("Error updating product:", e);
        return res.status(500).json({ message: "Something went wrong while updating product" });
    }
};
const deleteProduct = async (req: Request<{ id: string }, any, any>, res: Response) => {
    const { id } = req.params;

    try {
        const productId = parseInt(id);
        const deletedProduct = await prisma.product.delete({
            where: { id: productId }
        });

        return res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (e) {
        console.error("Error deleting product:", e);
        return res.status(500).json({ message: "Something went wrong while deleting product" });
    }
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct};



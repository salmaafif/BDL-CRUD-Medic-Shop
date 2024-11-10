import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.models.js";

const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Mengambil semua data dari koleksi 'Product'
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getProductById = async (req, res) => {
    try {
        const produkget = await Product.findById(req.params.id);
        res.status(200).json(produkget);
      } catch (error) {
        res.status(500).json({ messgae: error.messgae });
      }
}

const createProduct = async (req, res) => {
    try {
        const product1 = await Product.create(req.body);
        res.status(201).json(product1);
      } catch (error) {
        console.error("Error : ", error);
        res.status(500).json({ messgae: error.messgae });
      }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        const updateProduct = await Product.findById(req.params.id);
        res.status(200).json(updateProduct);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id, req.body);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        //const updateProduct = await Product.findById(req.params.id)
        res.status(200).json({ message: "already deleted " + product });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
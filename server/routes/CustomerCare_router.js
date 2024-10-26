import express from "express";
import dotenv from 'dotenv'
import upload from "../Image_Multer/Image_multer.js";
import { getMessageData, MessageSender } from "../controller/CustomerCareChatBox.js";
dotenv.config();

export const CustomerCareChatBox_router = express.Router()



CustomerCareChatBox_router.get('/api/messages',getMessageData)
CustomerCareChatBox_router.post('/api/messages',upload.single('image'),MessageSender)
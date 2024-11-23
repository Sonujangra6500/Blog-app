const express = require('express');
const router = express.Router();

const { signup, login, CreatePost, GetPosts, Logout, TokenBlacklisted, UpDatePost, AddComments, GetComments, DeleteComment } = require('../controller/UserController');
const { AuthMiddleware } = require('../middleware/AuthMiddleware');
const { upload } = require('../Multer');


router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', Logout);

router.post('/createpost', AuthMiddleware, TokenBlacklisted, upload.single('picture'), CreatePost);

router.put('/updatepost/:id',AuthMiddleware,upload.single('picture'),UpDatePost);

router.get('/getposts', AuthMiddleware, TokenBlacklisted, GetPosts);

router.post('/addcomments',AddComments);

router.get('/getcomments/:id',GetComments);

router.delete('/deletecomment/:id',DeleteComment);

module.exports = router;  
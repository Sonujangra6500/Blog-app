const { User, Post, Comment } = require("../models/Model.js")

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// user login 

const signup = async (req, res) => {
    try {
        const { firstname, lastname, username, password, confirmpassword } = req.body;

        if (!firstname || !lastname || !username || !password || !confirmpassword) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({
                message: "Password and confirm password do not match",
                success: false
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstname,
            lastname,
            username,
            password: hashedPassword
        });

        return res.status(200).json({
            message: "User created successfully",
            success: true,
            data: newUser
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// user login

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username or password required", success: false });
        }
        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            return res.status(401).json({ message: "User not registered", success: false });
        }
        const correctPassword = await bcrypt.compare(password, existingUser.password);
        if (!correctPassword) {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }
        const token = jwt.sign(
            { _id: existingUser._id, username: existingUser.username },
            "exsituser",
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "User logged in successfully", success: true, token: token, username: existingUser.username, name: `${existingUser.firstname}${existingUser.lastname}` })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", success: false });
    }
};

//  create posts

const CreatePost = async (req, res) => {
    try {
        const { title, description, username, categorie, createdDate } = req.body;

        if (!title || !description || !username || !categorie || !createdDate) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Picture is required", success: false });
        }

        const pictureUrl = `http://localhost:3030/uploads/${req.file.filename}`;

        const existdata = await Post.findOne({ title });
        if (existdata) {
            return res.status(400).json({ message: "Blog already exists", success: false });
        }

        const NewBlog = await Post.create({
            title,
            description,
            picture: pictureUrl,
            username,
            categorie,
            createdDate
        });

        res.status(200).json({ message: "Blog created successfully", success: true, NewBlog });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
};

// get posts

const GetPosts = async (req, res) => {
    try {
        const AllPosts = await Post.find({});

        if (AllPosts.length === 0) {
            return res.status(400).json({ message: "No posts found", success: false });
        }
        res.status(200).json({
            message: "Posts retrieved successfully",
            success: true,
            data: AllPosts
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

//  Update post

const UpDatePost = async (req, res) => {
    try {
        const { title, description, categorie, username, createdDate } = req.body;
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found", success: false });
        }
        if (post.username !== username) {
            return res.status(403).json({
                message: "Username mismatch. Only the author can update this post.",
                success: false,
            });
        }

        const pictureUrl = req.file
            ? `http://localhost:3030/uploads/${req.file.filename}`
            : post.picture;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, description, picture: pictureUrl, username, categorie, createdDate },
            { new: true }
        );

        if (updatedPost) {
            return res
                .status(200)
                .json({ message: "Post updated successfully", success: true });
        } else {
            return res
                .status(500)
                .json({ message: "Failed to update post", success: false });
        }
    } catch (error) {
        console.error("Error updating post:", error);
        return res
            .status(500)
            .json({ message: "Internal server error", success: false });
    }
};

// 
const DeletePost = async(req,res)=>{
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);  
        res.status(200).send({ message: 'Post  deleted successfully',success:true });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting Post', error });
    }
}
    
// Remove token and Logout 

const tokenBlacklist = new Set();

const TokenBlacklisted = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token && tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Invalid token.', success: false });
    }
    next(); 
};

const Logout = async (req, res) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: 'No token provided.' });
        }
        tokenBlacklist.add(token);
        return res.status(200).json({ message: 'Logged out successfully.', success: true });
    }
    catch (error) {
        console.log(error)
    }
}

// Add comments 

const AddComments = async(req,res)=>{
    try{ 
           const {username , postId ,comments,date} = req.body;
      if(!username || !postId || !comments || !date){
        return res.status(401).json({message:"No Add Comments", success:false})
      }
      const Addcomment = await Comment.create({
        username,
        date : new Date(),
        postId,
        comments,
      })
      res.status(200).json({ message: "Comments created successfully", success: true,Addcomment });

}
catch(error){
     return res.status(500).json({
        message: "Internal server error",
        success: false,
        error
    });
}
}

// get comment  

const GetComments = async (req, res) => {
    try {
        const { id } = req.params;

         const comments = await Comment.find({ postId: id }); 

        if (!comments || comments.length === 0) {
            return res.status(200).json({ 
                message: "No Comments available",
                success: true
            });
        }

        return res.status(200).json({
            message: "Comments retrieved successfully",
            success: true,
            comments,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

// delete comment 

const DeleteComment = async(req,res)=>{
    try {
        const { id } = req.params;
        await Comment.findByIdAndDelete(id);  
        res.status(200).send({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting comment', error });
    }}


module.exports = { signup,DeletePost, login, CreatePost, GetPosts, UpDatePost, Logout, TokenBlacklisted,GetComments,DeleteComment,AddComments }
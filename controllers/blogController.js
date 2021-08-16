const Blog = require('../models/blogModel');

//Getting all blogs on the database
exports.getAllBlogs = async(req, res) => {
    try {
        const result = await Blog.find().sort({ createdAt: -1 });
        res.render('index', { blogs: result, title: 'All blogs' });
        
    } catch (error) {
        console.log(error);
    }
};

//Getting a single blog from the database
exports.getBlog = async (req, res) => {
    try {
        const result = await Blog.findById(req.params.id);
        res.render('details', { blog: result, title: 'Blog Details' });
    } catch (error) {
        console.log(error);
        res.render('404', { title: 'Blog not found' });
    }
};

//Creating a new blog in the database
exports.createBlog = async (req, res) => {
    try {
        await Blog.create(req.body);
        res.redirect('/blogs');
    } catch (error) {
        console.log(error);
    }
};

//Deleting a single blog from the database
exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ redirect: '/blogs' });
    } catch (error) {
        console.log(error);
    }
};
const express = require('express');
const passport = require('passport');
const Profile = require('../models/Profile.model');
const User = require('../models/User.model');
const Post = require('../models/Post.model');
const validatePostInput = require('../validation/post');
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        status: 200,
        msg: 'Good to go',
        data: []
    });
});

/* 
    @Route: GET /api/posts
    @Desc: API to get posts
    @Access: Public
    @Params: none
*/
router.get('/', (req, res) => {
    const errors = {};
    Post.find().sort({ date: -1 }).then(posts => {
        res.json({ status: 200, msg: 'Posts successfully retrieved!', data: posts});
    }).catch(err => {
        errors.post = 'No post found!';
        res.status(404).json({ status: 404, msg: 'Error!', errors });
    });
});


/* 
    @Route: GET /api/posts/:id
    @Desc: API to get posts
    @Access: Public
    @Params: none
*/
router.get('/:id', (req, res) => {
    const postId = req.params.id;
    const errors = {};
    Post.findById(postId).then(post => {
        if (post === null) {
            errors.post = 'No post found for the id that was passed!';
            return res.status(404).json({ status: 404, msg: 'Error!', errors });
        }
        res.json({ status: 200, msg: 'Post successfully retrieved!', data: [post]});
    }).catch(err => {
        errors.post = 'No post found for the id that was passed!';
        res.status(404).json({ status: 404, msg: 'Error!', errors });
    });
});


/* 
    @Route: Delete /api/posts/:id
    @Desc: API to delete posts
    @Access: Private
    @Params: none
*/
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const errors = {};
    Profile.findOne({ userId: userId }).then(user => {
        Post.findById(postId).then(post => {
            // Check for post owner
            if (post.user.toString() !== userId) {
                errors.authorization = 'User is not authorized to delete this post';
                return res.status(401).json({ status: 401, msg: 'Error!', errors });
            }

            // Delete post
            post.remove().then(post => {
                res.json({ status: 200, msg: 'Post was successfully deleted!', data: [post]});
            }).catch(err => {
                errors.post = 'No post found for the id that was passed!';
                res.status(404).json({ status: 404, msg: 'Error!', errors });
            });
        }).catch(err => {
            errors.post = 'No post found for the id that was passed!';
            res.status(404).json({ status: 404, msg: 'Error!', errors });
        });
    });
});


/* 
    @Route: POST /api/posts/like/:id
    @Desc: API to like and unlike a post
    @Access: Private
    @Params: none
*/
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const errors = {};

    Profile.findOne({ userId: userId }).then(user => {
        Post.findById(postId).then(post => {
            // Check if the user has already liked this post
            const hasLiked = post.likes.filter(like => like.user.toString() === userId).length === 0;
            let action = 'liked';
            if (hasLiked) {
                // Add userid to the likes array
                post.likes.unshift({ user: userId });
            } else {
                // remove userid from the likes array
                post.likes = post.likes.filter(like => like.user.toString() !== userId);
                action = 'unliked';
            }
            post.save().then(post => {
                res.json({ status: 200, msg: `User has successfully ${action} this post!`, data: [post]});
            }).catch(err => {
                errors.post = 'User cannot like this post!';
                res.status(404).json({ status: 404, msg: 'Error!', errors });
            });
        }).catch(err => {
            errors.post = 'No post found for the id that was passed!';
            res.status(404).json({ status: 404, msg: 'Error!', errors });
        });
    });
});


/* 
    @Route: POST /api/posts/comment/:id
    @Desc: API to comment on a post
    @Access: Private
    @Params: none
*/
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    let { errors, isValid } = validatePostInput(req.body);

    // check validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json({ status: 400, msg: 'Validation Error!', errors });
    }

    Profile.findOne({ userId: userId }).then(user => {
        Post.findById(postId).then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: userId
            }

            // Add to comments array
            post.comments.unshift(newComment);
            
            post.save().then(post => {
                res.json({ status: 200, msg: `User has successfully commented on this post!`, data: [post]});
            }).catch(err => {
                errors.post = 'User cannot comment this post!';
                res.status(404).json({ status: 404, msg: 'Error!', errors });
            });
        }).catch(err => {
            errors.post = 'No post found for the id that was passed!';
            res.status(404).json({ status: 404, msg: 'Error!', errors });
        });
    });
});


/* 
    @Route: DELETE /api/posts/comment/:id/:commentId
    @Desc: API to comment on a post
    @Access: Private
    @Params: none
*/
router.delete('/comment/:id/:commentId', passport.authenticate('jwt', { session: false }), (req, res) => {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const userId = req.user.id;
    let errors = {};

    Profile.findOne({ userId: userId }).then(user => {
        Post.findById(postId).then(post => {
            // Check if the user has already commented on this post
            const hasCommented = post.comments.filter(comment => comment._id.toString() === commentId).length === 0;

            if (hasCommented) {
                errors.comment = 'Comment does not exist!';
                return res.status(404).json({ status: 404, msg: 'Error!', errors });
            }

            post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);

            post.save().then(post => {
                res.json({ status: 200, msg: `Comment has been deleted successfully!`, data: [post]});
            }).catch(err => {
                errors.post = 'User cannot comment this post!';
                res.status(404).json({ status: 404, msg: 'Error!', errors });
            });
        }).catch(err => {
            errors.post = 'No post found for the id that was passed!';
            res.status(404).json({ status: 404, msg: 'Error!', errors });
        });
    });
});


/* 
    @Route: GET /api/posts
    @Desc: API to post posts
    @Access: Private
    @Params: none
*/
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let { errors, isValid } = validatePostInput(req.body);

    // check validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json({ status: 400, msg: 'Validation Error!', errors });
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => {
        res.json({ status: 200, msg: 'Post was saved successfully!', data: [post]});
    }).catch(err => {
        errors = err;
        res.status(404).json({ status: 404, msg: 'Error!', errors});
    });
});

module.exports = router;
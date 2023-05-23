const express = require('express');
const app = express();
const connection = require('../be-nc-games/db/connection');
const { getCategories, getAPI, getReviewById, getAllReviews, getCommentByReviewId, postComment } = require('../be-nc-games/db/controllers/categories.controller');
app.use(express.json());

app.get('/api/categories', getCategories);

app.get('/api', getAPI);

app.get('/api/reviews/:review_id', getReviewById);

app.get('/api/reviews/:review_id/comments', getCommentByReviewId)
app.get('/api/reviews', getAllReviews);

app.post('/api/reviews/:review_id/comments', postComment);

app.all("*", (req, res) => {
    res.status(404).send({ msg: "Invalid endpoint" });
})

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: 'invalid endpoint syntax' });
    } else if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    } else {
        console.log(err);
        res.status(500).send({msg: "internal server error"});
    }
})

module.exports = app;
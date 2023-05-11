const { categories, fetchCategories, selectReviewById } = require('../models/categories.model');
const endpoints = require('../endpoints.json');

exports.getCategories = (req, res, next) => {
    fetchCategories().then((categories) => {
        res.status(200).send({ categories: categories})
    })
    .catch((err) => {
        next(err)
    })
}

exports.getAPI = (req, res, next) => {
    res.status(200).send(endpoints);
}

exports.getReviewById = (req, res, next) => {
    const { review_id } = req.params
    selectReviewById(review_id).then((review) => {
        res.status(200).send({ review });
    })
    .catch((err) => {
        next(err)
    })
}
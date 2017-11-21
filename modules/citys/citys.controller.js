const mongoose = require('mongoose');
const CityModel = mongoose.model('City');

exports.getCityList = (req, res) => {
    CityModel.find({}, (err, result) => {
        if (err) {
            return res.status(400).send({
                message: '无数据',
                data: []
            });
        } else {
            res.jsonp(result);
        }
    })
};

exports.getCityGtThousand = (req, res) => {
    CityModel.aggregate([
        {$group: {_id: '$province', total: {$sum: '$person'}}},
        {$match: {total: {$gt: 1000}}}
    ], (err, result) => {
        if (err) {
            return res.status(400).send({
                message: '无数据',
                data: []
            });
        } else {
            res.jsonp(result);
        }
    })
};

exports.getITPerson = (req, res) => {
    CityModel.aggregate([
        {$unwind: '$industry'},
        {$match: {'industry.name': 'IT'}},
        {
            $group: {
                _id: {province: '$province'}, itTotal: {$sum: '$industry.person'}, city: {$push: '$city'}
            }
        },
        {$match: {itTotal: {$gt: 400}}}
    ]).exec((err, result) => {
        if (err) {
            return res.status(400).send({
                message: '无数据',
                data: []
            });
        } else {
            res.jsonp(result);
        }
    })
}

exports.sortByPerson = (req, res) => {
    CityModel.aggregate([
        { $sort: {person: 1} },
        {
            $project: {
                _id: 0,
                province: 1,
                person: 1,
                city: 1
            }
        }
    ]).exec((err, result) => {
        if (err) {
            return res.status(400).send({
                message: '无数据',
                data: []
            });
        } else {
            res.jsonp(result);
        }
    })
}

exports.getSecondCity = (req, res) => {
    CityModel.aggregate([
        {$skip: 1},
        {$limit: 1}
    ]).exec((err, result) => {
        if (err) {
            return res.status(400).send({
                message: '无数据',
                data: []
            });
        } else {
            res.jsonp(result);
        }
    })
}

exports.getRandomCity = (req, res) => {
    CityModel.aggregate({$sample: {size: 1}}).exec((err, result) => {
        if (err) {
            return res.status(400).send({
                message: '无数据',
                data: []
            });
        } else {
            res.jsonp(result);
        }
    })
}


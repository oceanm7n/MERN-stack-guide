const express = require('express');
const router = express.Router();

// Item model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

router.get('/:id', (req, res) => {
    Item.findById(req.params.id).then(item => res.json(item));
})
// @route   POST item
// @desc    Create an item
// @access  public
router.post('/', (req, res) => {
     const newItem = new Item({
         name: req.body.name
     });
     newItem.save().then(() => Item.find().then(items => res.json(items)));
})

// @route   DELETE item
// @desc    Create an item
// @access  public
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    Item
        .findById(req.params.id)
        .then(item => item.remove().then(() => res.json({'success': true})))
        .catch(err => res.status(404).json({'success': false}));
})

module.exports = router;
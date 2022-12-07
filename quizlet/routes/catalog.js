const express = require('express');
const router = express.Router();

// Require controller modules.
const card_controller = require('../controllers/cardController');
const topic_controller = require('../controllers/topicController');

/// title ROUTES ///

// GET catalog home page.
router.get('/', card_controller.index);

// GET request for creating a card. NOTE This must come before routes that display card (uses id).
router.get('/card/create', card_controller.card_create_get);

// POST request for creating card.
router.post('/card/create', card_controller.card_create_post);

// GET request to delete card.
router.get('/card/:id/delete', card_controller.card_delete_get);

// POST request to delete card.
router.post('/card/:id/delete', card_controller.card_delete_post);

// GET request to update card.
router.get('/card/:id/update', card_controller.card_update_get);

// POST request to update card.
router.post('/card/:id/update', card_controller.card_update_post);

// GET request for one card.
router.get('/card/:id', card_controller.card_detail);

// GET request for list of all card items.
router.get('/cards', card_controller.card_list);

/// topic ROUTES ///

// GET request for creating a topic. NOTE This must come before route that displays topic (uses id).
router.get('/topic/create', topic_controller.topic_create_get);

//POST request for creating topic.
router.post('/topic/create', topic_controller.topic_create_post);

// GET request to delete topic.
router.get('/topic/:id/delete', topic_controller.topic_delete_get);

// POST request to delete topic.
router.post('/topic/:id/delete', topic_controller.topic_delete_post);

// GET request to update topic.
router.get('/topic/:id/update', topic_controller.topic_update_get);

// POST request to update topic.
router.post('/topic/:id/update', topic_controller.topic_update_post);

// GET request for one topic.
router.get('/topic/:id', topic_controller.topic_detail);

// GET request for list of all topic.
router.get('/topics', topic_controller.topic_list);


module.exports = router;

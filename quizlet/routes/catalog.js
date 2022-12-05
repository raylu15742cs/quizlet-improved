const express = require('express');
const router = express.Router();

// Require controller modules.
const title_controller = require('../controllers/titleController');
const definitions_controller = require('../controllers/definitionsController');
const topic_controller = require('../controllers/topicController');
const status_controller = require('../controllers/statusController');

/// title ROUTES ///

// GET catalog home page.
router.get('/', title_controller.index);

// GET request for creating a title. NOTE This must come before routes that display title (uses id).
router.get('/title/create', title_controller.title_create_get);

// POST request for creating title.
router.post('/title/create', title_controller.title_create_post);

// GET request to delete title.
router.get('/title/:id/delete', title_controller.title_delete_get);

// POST request to delete title.
router.post('/title/:id/delete', title_controller.title_delete_post);

// GET request to update title.
router.get('/title/:id/update', title_controller.title_update_get);

// POST request to update title.
router.post('/title/:id/update', title_controller.title_update_post);

// GET request for one title.
router.get('/title/:id', title_controller.title_detail);

// GET request for list of all title items.
router.get('/titles', title_controller.title_list);

/// definitions ROUTES ///

// GET request for creating definitions. NOTE This must come before route for id (i.e. display definitions).
router.get('/definitions/create', definitions_controller.definitions_create_get);

// POST request for creating definitions.
router.post('/definitions/create', definitions_controller.definitions_create_post);

// GET request to delete definitions.
router.get('/definitions/:id/delete', definitions_controller.definitions_delete_get);

// POST request to delete definitions.
router.post('/definitions/:id/delete', definitions_controller.definitions_delete_post);

// GET request to update definitions.
router.get('/definitions/:id/update', definitions_controller.definitions_update_get);

// POST request to update definitions.
router.post('/definitions/:id/update', definitions_controller.definitions_update_post);

// GET request for one definitions.
router.get('/definitions/:id', definitions_controller.definitions_detail);

// GET request for list of all definitionss.
router.get('/definitionss', definitions_controller.definitions_list);

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

/// status ROUTES ///

// GET request for creating a status. NOTE This must come before route that displays status (uses id).
router.get(
  '/status/create',
  status_controller.status_create_get
);

// POST request for creating status.
router.post(
  '/status/create',
  status_controller.status_create_post
);

// GET request to delete status.
router.get(
  '/status/:id/delete',
  status_controller.status_delete_get
);

// POST request to delete status.
router.post(
  '/status/:id/delete',
  status_controller.status_delete_post
);

// GET request to update status.
router.get(
  '/status/:id/update',
  status_controller.status_update_get
);

// POST request to update status.
router.post(
  '/status/:id/update',
  status_controller.status_update_post
);

// GET request for one status.
router.get('/status/:id', status_controller.status_detail);

// GET request for list of all status.
router.get('/statuses', status_controller.status_list);

module.exports = router;

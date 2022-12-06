const express = require('express');
const router = express.Router();

// Require controller modules.
const title_controller = require('../controllers/titleController');
const definition_controller = require('../controllers/definitionController');
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

/// definition ROUTES ///

// GET request for creating definition. NOTE This must come before route for id (i.e. display definition).
router.get('/definition/create', definition_controller.definition_create_get);

// POST request for creating definition.
router.post('/definition/create', definition_controller.definition_create_post);

// GET request to delete definition.
router.get('/definition/:id/delete', definition_controller.definition_delete_get);

// POST request to delete definition.
router.post('/definition/:id/delete', definition_controller.definition_delete_post);

// GET request to update definition.
router.get('/definition/:id/update', definition_controller.definition_update_get);

// POST request to update definition.
router.post('/definition/:id/update', definition_controller.definition_update_post);

// GET request for one definition.
router.get('/definition/:id', definition_controller.definition_detail);

// GET request for list of all definitions.
router.get('/definitions', definition_controller.definition_list);

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

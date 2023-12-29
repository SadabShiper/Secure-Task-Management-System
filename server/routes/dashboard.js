const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth');

const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', isLoggedIn, dashboardController.dashboard);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewTask);
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateTask);
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteTask);
router.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddTask);
router.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddTaskSubmit);
router.get('/dashboard/search', isLoggedIn, dashboardController.dashboardSearch);
router.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit);
router.get('/dashboard/sortbypriority', isLoggedIn, dashboardController.dashboardSort);
router.get('/dashboard/sortbydeadline', isLoggedIn, dashboardController.dashboardDeadline);

// router.get('/about', dashboardController.about);

module.exports = router;
 
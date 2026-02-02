const express = require('express');
const router = express.Router();

// Placeholder route handlers
const authController = require('../controllers/authController');
const businessController = require('../controllers/businessController');
const reviewController = require('../controllers/reviewController');

const auth = require('../middleware/auth');

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/verify', auth, authController.verify);

// Business Routes (Protected)
router.post('/business', auth, businessController.create);
router.get('/business', auth, businessController.get);
router.put('/business', auth, businessController.update);

// Review Request Routes (Protected for Send/Get, Public for Rating)
router.post('/review/send', auth, reviewController.sendRequest);
router.get('/review/requests', auth, reviewController.getRequests);

// Rating Logic (Public)
router.get('/rate/:business_id', reviewController.getRatingPage);
router.post('/rate/:business_id', reviewController.submitRating);

// Feedback (Public submission, Protected Retrieval)
router.post('/feedback', reviewController.submitFeedback);
router.get('/feedback', auth, reviewController.getFeedback);

// Analytics (Protected)
router.get('/analytics/overview', auth, businessController.getAnalytics);

// Billing Routes
const billingController = require('../controllers/billingController');
router.get('/billing', auth, billingController.getSubscription);
router.post('/billing/checkout', auth, billingController.createCheckoutSession);

module.exports = router;

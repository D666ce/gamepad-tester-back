const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const Controller = require('../models/Controller');

const router = Router();

/* /api/controller/register */
router.post(
    '/register',
    [
        check('id', 'Incorrect controller id').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Controller registration error'
                });
            }

            const { id, buttons, axes } = req.body;
            const candidate = await Controller.findOne({ id, buttons, axes });

            if (!candidate) {
                const controller = new Controller({ id, buttons, axes, count: 1 });
                await controller.save();
                res.status(200);
            } else {
                candidate.count;
            }

            await res.status(200);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again'})
        }
});

/* /api/controller/list */
router.get(
    '/list',
    [
        check('id', 'Incorrect controller id').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Error while getting the list of controllers'
                });
            }

            const { id } = req.body;

            const candidate = await Controller.find({ id });
            res.status(200);

            console.log(candidate);

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again'})
        }
});

module.exports = router;
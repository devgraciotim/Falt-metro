import {Router, Request, Response} from "express";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   - name: Test
 *     description: Test operations
 */

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test route
 *     description: Test only route.
 *     tags: 
 *       - Test
 *     responses:
 *       200:
 *         description: Sucess.
 *       500:
 *         description: Internal server error.
 */
router.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'this only a test' });
});

export default router;
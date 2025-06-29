import express from 'express'

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello world");
})

router.post('/', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send('Data recieved')
})

export default router;
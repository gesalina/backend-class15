import { Router } from "express";
import chatManager from "../../controllers/dao/ChatManager.js";

const router = Router();
const chat = new chatManager();

router.get("/", async (request, response) => {
    const getMessages = await chat.getMessages();
    response.json(getMessages);
})
router.post("/",async (request, response) => {
    let data = request.body;
    const createMessage = await chat.insertMessage(data);
    request.app.get('socketio').emit('logs', createMessage);
    response.json({status: 'success', messages: createMessage});
})
export default router

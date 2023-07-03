import {chatModel} from './models/chat.model.js'

class chatManager {
    constructor() {
      this.error = "";
    }
    /**
     * Get the products
     */
    getMessages = async () => {
        const messages = await chatModel.find().lean();
        return messages;
    };
    /**
     * Create a new product
     */
    insertMessage = async (data) => {
      const result = await chatModel.create(data);
      return result
    };
  
  }
  export default chatManager;
class Sessions {
    constructor() {
        this.sessions = {};
    }
    get(sessionId) {
        if (!this.sessions[sessionId]) {
           this.sessions[sessionId] = {
                offset: 0
           }
        }
        return this.sessions[sessionId];
    }
}

export default new Sessions();
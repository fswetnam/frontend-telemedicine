export class UserSession {
    static getUserSession() {
        //@todo Not sure why I need to parse it twice
        return JSON.parse(JSON.parse(sessionStorage.getItem('user')));
    }

    static setUserSession(data) {
        sessionStorage.setItem('user', JSON.stringify(data));
    }
}

import express from 'express';


export default class Server {

    public app: express.Application;
    public port: number = 3000;

    constructor() {
        this.app = express();
        if (process.env.PORT) {
            // console.log('hay puerto');
            this.port = + process.env.PORT;
        } else {
            // console.log('no hay puerto');
        }
    }

    start(callback: any) {
        this.app.listen(this.port, callback);
    }

}
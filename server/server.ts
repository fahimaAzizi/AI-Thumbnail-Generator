import express, { Request, Response } from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js';
import session from 'express-session';

 declare module 'express-session' {
interface SessionData{
    isLoggedIn : boolean;
    userId: string
}
 }

await connectDB();

const app = express();

app.use(cors({
    origin:['http://lcalhost:5173','http://lcalhost:3000'],
    credentials: true 
}))

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave : false,
}))
app.use(express.json())





app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
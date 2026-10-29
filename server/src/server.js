import 'dotenv/config';
import express from 'express'; import cors from 'cors'; import helmet from 'helmet'; import rateLimit from 'express-rate-limit';
import {connectDB} from './config/db.js'; import authRoutes from './routes/auth.js'; import domainRoutes from './routes/domain.js';
const app=express();
app.use(helmet()); app.use(cors({origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',').map(s=>s.trim()) : 'http://localhost:5173'}));
app.use(express.json({limit:'1mb'})); app.use('/api/auth',rateLimit({windowMs:15*60*1000,limit:100,standardHeaders:true,legacyHeaders:false}));
app.get('/api/health',(req,res)=>res.json({status:'ok',app:'teamtrack'})); app.use('/api/auth',authRoutes);
app.use('/api',domainRoutes);
app.use((req,res)=>res.status(404).json({message:'Route not found'}));
app.use((err,req,res,next)=>{console.error(err);if(err.name==='ValidationError')return res.status(400).json({message:err.message});if(err.name==='CastError')return res.status(400).json({message:'Invalid identifier'});if(err.code===11000)return res.status(409).json({message:'A record with that value already exists'});res.status(500).json({message:'Unexpected server error'});});
const port=Number(process.env.PORT)||5003;
if(process.env.NODE_ENV!=='test'){connectDB(process.env.MONGO_URI).then(()=>app.listen(port,()=>console.log(`{pr['name']} API listening on ${port}`))).catch(err=>{console.error('Database connection failed:',err.message);process.exit(1);});}
export default app;

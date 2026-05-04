import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGODB_URI){
    throw new Error('MONGODB_URI is not defined');
}
if(!process.env.JWT_SECRET){
    throw new Error('MONGODB_URI is not defined');
}
if(!process.env.JWT_EXPIRATION){
    throw new Error('JWT_EXPIRATION is not defined');
}
if(!process.env.JWT_REFRESH_EXPIRATION){
    throw new Error('JWT_REFRESH_EXPIRATION is not defined');
}
if(!process.env.JWT_REFRESH_SECRET){
    throw new Error('JWT_REFRESH_SECRET is not defined');
}


const config ={
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION

}
export default config; 
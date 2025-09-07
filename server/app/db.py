from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URI,DB_NAME
import os

if not MONGO_URI : 
    raise RuntimeError("MongoDB connection string is not set in environment variables")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
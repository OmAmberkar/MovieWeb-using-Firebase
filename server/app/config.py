from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI") 
DB_NAME = os.getenv("DB_NAME", "movieweb")
OPENAI_API_KEY = os.getenv("OPEN_ROUTER_DEEPSEEK_API_KEY")
FRONTEND_URL = os.getenv("FRONTEND_ORIGINS", "http://localhost:5173").split(",")

# OMDB_API_KEY = os.getenv("OMDB_API_KEY")
# TMDB_API_KEY = os.getenv("VITE_TMDB_API_KEY")
# FANART_API_KEY = os.getenv("VITE_FANART_API_KEY")
# TRAKT_CLIENT_ID = os.getenv("VITE_TRAKT_CLIENT_ID")


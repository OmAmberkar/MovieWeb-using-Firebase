# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import movies
from app.config import FRONTEND_URL

app = FastAPI(
    title="Movie AI Story Generator",
    description="Generate novel-style stories from movie titles and characters using AI + MongoDB caching.",
    version="1.0.0",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_URL,  # list of allowed frontend origins from config
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(movies.router, prefix="/movies", tags=["movies"])


@app.get("/", tags=["health"])
async def root():
    return {"message": "Welcome to the Movie AI Story Generator API"}

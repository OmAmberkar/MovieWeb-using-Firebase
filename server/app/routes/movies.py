# app/routes/movies.py
from fastapi import APIRouter, HTTPException, status
from app.models import StoryRequest, StoryResponse
from app.db import db
from app.services.ai_service import generate_story_text
from datetime import datetime

router = APIRouter()


@router.post("/story", response_model=StoryResponse)
async def create_story(req: StoryRequest):
    key = {
        "title_lower": req.title.strip().lower(),
        "tone": req.style,
        "characters": req.characters
    }

    # Check if already cached
    existing = await db.stories.find_one(key)
    if existing:
        return StoryResponse(
            cached=True,
            title=existing["title"],
            story=existing["story"]
        )

    # Generate new story using AI
    try:
        story_text = await generate_story_text(
            req.title,
            req.characters,
            req.style,
            req.max_tokens
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI generation failed: {str(e)}"
        )

    if not story_text:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="No text returned from AI"
        )

    # Save story in DB
    doc = {
        "title": req.title,
        "title_lower": req.title.strip().lower(),
        "characters": req.characters,
        "tone": req.style,
        "story": story_text,
        "created_at": datetime.utcnow()
    }

    await db.stories.insert_one(doc)

    return StoryResponse(
        cached=False,
        title=req.title,
        story=story_text
    )

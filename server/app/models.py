from pydantic import BaseModel, Field
from typing import List, Optional

class StoryRequest(BaseModel):
    title: str
    characters: Optional[List[str]] = Field(default_factory=list)
    style: str = Field("novel", example="novel | screenplay | dialogue | cinematic | multi-part")
    max_tokens: Optional[int] = 4096


class StoryResponse(BaseModel):
    cached:bool
    title: str
    story: str
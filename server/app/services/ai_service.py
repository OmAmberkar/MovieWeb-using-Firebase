import os
import openai
from app.config import OPENAI_API_KEY

if not OPENAI_API_KEY:
    raise RuntimeError("OpenAI API key is not set in environment variables")

client = openai.OpenAI(
    api_key=OPENAI_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

# -----------------------
# Prompt templates
# -----------------------
PROMPT_TEMPLATES = {
    "novel": (
    "You are a seasoned novelist and screenwriter. "
    "Adapt the movie '[Movie Title]' into a comprehensive and engaging storybook. "
    "Structure the narrative into CHAPTERS, each with distinct and captivating titles. "
    "Within each chapter, explore characters’ thoughts, emotions, and motivations. "
    "Provide sensory-rich descriptions of scenes (sight, sound, touch, smell) that allow readers to visualize the world. "
    "Expand the dialogue to reveal hidden depth while keeping it faithful to the original tone. "
    "Ensure smooth narrative flow between chapters while staying true to the film’s essence. "
    "The final output must read as a full novel, not a screenplay."
),

   "screenplay": (
    "You are an experienced professional screenwriter. "
    "Adapt the movie '[Movie Title]' into a complete screenplay that reads like it is ready for production. "
    "Divide the story into SCENES, each introduced with a proper scene heading (INT./EXT., SPECIFIC LOCATION, TIME OF DAY). "
    "For each scene, include concise but vivid ACTION LINES that describe characters’ movements, expressions, and the environment. "
    "Ensure all character names appear in uppercase before dialogue. "
    "Write DIALOGUE that is natural, emotionally charged, and true to each character’s voice, including subtext where appropriate. "
    "Use PARENTHETICALS only when necessary to clarify delivery or action. "
    "Maintain cinematic pacing with alternating beats of dialogue, silence, and action. "
    "Stage directions should capture blocking, tone, and atmosphere without excessive detail, keeping a balance between readability and visualization. "
    "Where relevant, include TRANSITIONS (e.g., CUT TO:, FADE IN:, DISSOLVE TO:) to guide the cinematic flow. "
    "The final screenplay must follow standard Hollywood formatting conventions while expanding the narrative depth of the original movie."
),


    "dialogue": (
    "You are a dramatist. "
    "Retell the movie '[Movie Title]' in a dialogue-driven format. "
    "Organize the story into CHAPTERS or SECTIONS if the narrative naturally divides into acts or arcs. "
    "Within each section, present the story primarily as conversations. "
    "Use CHARACTER NAMES in ALL CAPS before each line, as done in plays or scripts. "
    "Ensure dialogue reflects tone, subtext, and emotion while remaining faithful to the original characters’ voices. "
    "Between dialogues, insert brief NARRATION or STAGE DIRECTIONS to set context, describe scene changes, and clarify character actions or moods. "
    "Balance spoken lines with minimal but effective narration to maintain flow and reader immersion. "
    "The final output must feel like a dramatized retelling of the film, focused on dialogue while still providing enough descriptive cues to follow the story."
),

    "cinematic": (
    "You are a cinematic narrator. "
    "Retell the movie '[Movie Title]' as if guiding the audience through a visually immersive film experience. "
    "Use cinematic language such as CAMERA MOVEMENTS (e.g., 'The camera pans across the skyline,' 'A close-up reveals a trembling hand'), "
    "LIGHTING, SOUND EFFECTS, and VISUAL CUES to create a dynamic flow. "
    "Blend third-person narration with DIALOGUE, ensuring character names appear in ALL CAPS before their lines. "
    "Describe MOOD and ATMOSPHERE in each scene, capturing tone through sound, environment, and pacing. "
    "Transitions between scenes should feel like film cuts (e.g., 'FADE IN,' 'CUT TO,' 'DISSOLVE'). "
    "Highlight emotional beats with descriptive intensity, showing how the 'camera' frames characters and settings. "
    "The final output must read like a narrated film script, immersive and cinematic, while staying faithful to the movie’s core story."
),

    "multi-part": (
    "You are a narrative architect. "
    "Break the movie '[Movie Title]' into multiple PARTS, each corresponding to an Act in a classical 3-ACT structure: "
    "Act I (Setup), Act II (Confrontation), Act III (Resolution). "
    "Each PART should contain several CHAPTERS with unique, descriptive titles that reflect the story beats. "
    "At the start of each PART, provide a clear summary highlighting major events, character goals, conflicts, and turning points. "
    "Within each CHAPTER: "
    "  - Explore characters’ inner thoughts, emotions, motivations, and personal stakes. "
    "  - Provide rich, sensory scene descriptions (sight, sound, smell, touch) to immerse the reader in the environment. "
    "  - Include dialogue that reveals character, advances the plot, and captures subtext. "
    "  - Show actions, reactions, and interactions with precision, emphasizing cause-and-effect relationships between events. "
    "  - Maintain narrative tension and pacing, ensuring smooth flow from chapter to chapter and across PARTS. "
    "Optionally, include short interludes, foreshadowing, or flashbacks to enrich character backstories or world-building. "
    "The final output must read as a comprehensive, multi-part storybook that expands on the movie’s plot and depth, "
    "giving readers a fully immersive, chapter-by-chapter experience while staying faithful to the essence of the original film."
),

}

# -----------------------
# Generation function
# -----------------------
async def generate_story_text(title: str, characters: list[str], style: str = "novel", max_tokens: int = 1200):
    char_line = ", ".join(characters) if characters else "Main characters"
    user_prompt = (
        f"Movie Title: '{title}'.\n"
        f"Characters: {char_line}.\n"
        "Generate the story as instructed."
    )

    system_prompt_template = PROMPT_TEMPLATES.get(style, PROMPT_TEMPLATES["novel"])
    system_prompt = system_prompt_template.replace('[Movie Title]', title)

    resp = client.chat.completions.create(
        model="deepseek/deepseek-chat",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7,
        max_tokens=max_tokens
    )

    story_text = ""
    if resp and resp.choices:
        msg = resp.choices[0].message if hasattr(resp.choices[0], "message") else resp.choices[0].text
        story_text = msg.get("content") if isinstance(msg, dict) else str(msg)

    return story_text.strip()

from typing import Any, Dict
from uagents import Agent, Context, Model
import time
from flask import jsonify

import os
from dotenv import load_dotenv, dotenv_values


import requests
from openai import OpenAI

load_dotenv()

googlemaps_api = os.getenv("googleMAPAPI")

def get_attr(userLocationName, api=googlemaps_api):
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        'query': userLocationName,
        'key': api,
        'type': 'tourist_attraction',
    }
    response = requests.get(url, params)
    data = response.json()
    locationList = []

    for place in data['results']:
        name = place.get('name')
        rating = place.get('rating')
        formAddress = place.get('formatted_address')
        locationList.append(f"{name}: {rating} stars\n{formAddress}\n")
    
    str2 = ''.join(locationList)
    return str2



# Define request and response models
class Request(Model):
    message: str
    location: str

class Response(Model):
    timestamp: int
    text: str
    agent_address: str
    user_message: str

# Initialize the agent
agent = Agent(name="Rest API Agent")

# Define a POST endpoint that handles requests with a message
@agent.on_rest_post("/sendrequest", Request, Response)
async def handle_post(ctx: Context, req: Request) -> Response:
    ctx.logger.info("Received POST request with message: %s", req)

    visit_places = get_attr(req.location)

    client = OpenAI(
        # This is the default and can be omitted
        api_key=os.getenv("gptAPI"),
    )

    activity = "eat"
    restrictions = "hallal only"

    message_string = f"pick a 5 good place from the following: {visit_places} and return the name, rating and what makes that location great (DO NOT SAY I)"

    chat_completion = client.chat.completions.create(


        messages=[
            {
                "role": "user",
                "content": message_string,
            }
        ],
        model="gpt-3.5-turbo",
    )

    sendback = str(chat_completion.choices[0].message.content)

    # sendback = visit_places

    
    # Process the request and return a response
    return Response(
        timestamp=int(time.time()),
        text=sendback,
        agent_address=ctx.agent.address,
        user_message=req.message  # Include the user-provided message in the response
    )

if __name__ == "__main__":
    agent.run()

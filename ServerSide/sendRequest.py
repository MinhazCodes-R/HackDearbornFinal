import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
import time


# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for the app, allowing requests from a specific origin
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Define a route to handle POST requests at /sendrequest
@app.route('/sendrequest', methods=['POST'])
def send_request():
    # Check if the request contains JSON data
    if request.is_json:
        data = request.get_json()  # Parse JSON data from the request
        
        # Access the data from the JSON body
        user_message = data.get("message", "")
        location = data.get("location", "")
        print("message recieved was", user_message, "location recieved was",location)
        

        # ---------------------------------------------------------------------------------------



        url = 'http://localhost:8000/sendrequest'
        data = {
            'message': user_message,
            'location': location
        }

        # Send the POST request
        response = requests.post(url, json=data)

        # Check the response
        if response.status_code == 200:
            user_message = str(response.text)  # Assuming the response is JSON
        else:
            print('Failed to send request:', response.status_code)




        # ---------------------------------------------------------------------------------------



        response = {
            "received_message": user_message,
            "received_location": location,
        }
        
        # Return the response as JSON with a 200 OK status
        return jsonify(response), 200
    else:
        # Return an error if the request data is not JSON
        return jsonify({"error": "Request must be JSON"}), 400

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)
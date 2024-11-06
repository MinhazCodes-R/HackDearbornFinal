from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)  # Allow CORS for this origin

@app.route('/', methods=['GET'])
def handle_data():

    data = request.args.getlist('data[]')
    if (data):
        #make sure to program so that each index value exists! try and catch or for loop
            
        print("THE DATA ----------------------\n")
        print('starting data is',data[0])
        print('ending data is',data[1])
        print('location is',data[2])
        print('price is',data[3])
        print("\ndone\n")

    else:
        print("nodata")



    resonse_data = {
        "message":"good work!"
    }
    return resonse_data

if __name__ == '__main__':
    app.run(debug=False)

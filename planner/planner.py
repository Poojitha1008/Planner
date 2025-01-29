from flask import Flask, request, jsonify
import random

app = Flask(__name__)

motivational_quotes = {
    "high": [
        "You're on fire! Keep up the great work!",
        "Success is near! Stay consistent!",
        "You're crushing it! Keep going!"
    ],
    "medium": [
        "You're halfway there! Keep pushing!",
        "Great progress! Just a little more effort!",
        "You're doing well! Stay focused!"
    ],
    "low": [
        "Don't give up! Small steps lead to big success!",
        "Keep going! Every effort counts!",
        "Stay strong! Finish what you started!"
    ]
}

@app.route("/quote", methods=["GET"])
def get_quote():
    progress = int(request.args.get("progress", 0))

    if progress >= 80:
        quote = random.choice(motivational_quotes["high"])
    elif progress >= 40:
        quote = random.choice(motivational_quotes["medium"])
    else:
        quote = random.choice(motivational_quotes["low"])

    return jsonify({"quote": quote})

if __name__ == "__main__":
    app.run(debug=True)

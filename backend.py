from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import InferenceClient

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 
# Hugging Face API Key
# HF_API_KEY = ""
#second key
HF_API_KEY = "xxxx"


# ✅ Connect Fireworks-AI by InferenceClient
client = InferenceClient(
    provider="fireworks-ai",  # ✅ for DeepSeek-R1 
    api_key=HF_API_KEY,
)

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
  
    messages = [{"role": "user", "content": user_input}]

    try:
        completion = client.chat.completions.create(
            model="deepseek-ai/DeepSeek-R1",
            messages=messages,
            max_tokens=10000,
            stream=False
        )

        # Generate AI response
        ai_response = completion.choices[0].message.content
        print(ai_response)
    
    except Exception as e:
        ai_response = f"API Error: {str(e)}"

    return jsonify({"response": ai_response})

if __name__ == "__main__":
    app.run(debug=True)

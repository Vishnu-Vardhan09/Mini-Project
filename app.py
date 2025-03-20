from flask import Flask, request, render_template, make_response,send_from_directory
from transformers import pipeline
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Route to serve the HTML page
@app.route('/')
def home():
    return render_template('home.html')  # Make sure index.html is in a 'templates' folder

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(app.root_path, 'static'), filename)

@app.route('/index')
def index():
    return render_template('index.html')

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Route to handle form submission
@app.route('/process', methods=['POST'])
def process_text():
    input_text = request.form.get('inputText', '')
    processed_text=summarizer(input_text, max_length=192, min_length=30, do_sample=False)
    output_text=processed_text[0]["summary_text"]
    response = make_response(output_text)
    response.mimetype = "text/plain"
    return response
 
if __name__ == '__main__':
    app.run(debug=True)



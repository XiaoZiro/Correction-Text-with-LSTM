from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import textdistance
import json

app = Flask(__name__, template_folder='website')

# Muat model LSTM
model = load_model('model_lstm.h5')
tokenizer = Tokenizer()
max_len = 100  

try:
    with open('kata_baku.json', 'r') as f:
        target_texts = json.load(f)
except Exception as e:
    print(f"Error loading kata_baku.json: {e}")
    target_texts = []

@app.route('/')
def index():
    return render_template('koreksi.html')
def correct_word(word, threshold=3):
    if not model:
        return word
    
    try:
        word_sequence = tokenizer.texts_to_sequences([word])
        word_sequence = pad_sequences(word_sequence, maxlen=max_len, padding='post')
        
        pred = model.predict(word_sequence)
        if np.argmax(pred) == 0: 
            best_match = None
            min_distance = float('inf')
            
            for target_word in target_texts:
                distance = textdistance.levenshtein(word, target_word)
                if distance < min_distance:
                    min_distance = distance
                    best_match = target_word
            
            if min_distance <= threshold:
                return best_match
            else:
                return word
        else:
            return word
    except Exception as e:
        print(f"Error correcting word: {e}")
        return word

def correct_sentence(sentence, threshold=3):
    try:
        words = sentence.split()
        corrected_words = [correct_word(word, threshold) for word in words]
        corrected_sentence = ' '.join(corrected_words)
        return corrected_sentence
    except Exception as e:
        print(f"Error correcting sentence: {e}")
        return sentence

@app.route('/correct', methods=['GET'])
def correct_endpoint():
    sentence = request.args.get('sentence')
    threshold = int(request.args.get('threshold', 3))
    
    if not sentence:
        return jsonify({'error': 'Kalimat tidak diberikan!'}), 400
    
    # Hapus karakter newline atau whitespace yang tidak diinginkan
    sentence = sentence.replace('\n', ' ').strip()
    
    corrected_sentence = correct_sentence(sentence, threshold)
    return jsonify({'original_sentence': sentence, 'corrected_sentence': corrected_sentence})


if __name__ == '__main__':
    app.run(debug=True)

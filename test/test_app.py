import unittest
import sys
import os
# Menambahkan folder project ke sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import correct_word, correct_sentence, correct_endpoint  # Mengimpor fungsi dari app.py
from flask_testing import TestCase
from app import app  # Mengimpor aplikasi Flask dari app.py

class TestCorrectWord(unittest.TestCase):
    def test_correct_typo(self):
        # Tes untuk fungsi correct_word
        word = "beljjar"
        corrected_word = correct_word(word)
        self.assertEqual(corrected_word, "belajar")

    def test_no_typo(self):
        word = "belajar"
        corrected_word = correct_word(word)
        self.assertEqual(corrected_word, "belajar")

class TestCorrectSentence(unittest.TestCase):
    def test_correct_sentence(self):
        sentence = "saya belajr python"
        corrected_sentence = correct_sentence(sentence)
        self.assertEqual(corrected_sentence, "saya belajar python")

class TestCorrectEndpoint(TestCase):
    def create_app(self):
        return app  # Menggunakan aplikasi Flask yang sudah ada

    def test_correct_sentence_valid(self):
        response = self.client.get('/correct?sentence=saya%20belajr%20python')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['original_sentence'], "saya belajr python")
        self.assertEqual(data['corrected_sentence'], "saya belajar python")

if __name__ == '__main__':
    unittest.main()

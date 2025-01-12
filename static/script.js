// Fungsi untuk memanggil API dan mengoreksi kata typo
function koreksiKalimat() {
    const sentence = document.getElementById('typo-input').value.trim();
    const threshold = 3; // Optional: You can dynamically get the threshold from an input

    if (!sentence) {
        alert('Harap masukkan kalimat untuk dikoreksi!');
        return;
    }

    if (sentence.length > 250) {
        alert('Jumlah karakter terlalu panjang!');
        return;
    }

    // Show loading indicator inside the result section
    document.getElementById('loading-indicator').style.display = 'block';
    document.getElementById('baku-result').innerText = ''; // Clear the result while loading

    fetch(`/correct?sentence=${encodeURIComponent(sentence)}&threshold=${threshold}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal mengambil respons dari server');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                alert('Teks berhasil dikoreksi!');
                document.getElementById('baku-result').innerText = data.corrected_sentence;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menghubungi server.');
        })
        .finally(() => {
            // Hide loading indicator once the process is complete
            document.getElementById('loading-indicator').style.display = 'none';
        });
}


// function koreksiKalimat() {
//     const sentence = document.getElementById('typo-input').value.trim();
//     const threshold = 3; // Optional: You can dynamically get the threshold from an input

//     if (!sentence) {
//         alert('Harap masukkan kalimat untuk dikoreksi!');
//         return;
//     }

//     // Show loading indicator inside the result section
//     document.getElementById('loading-indicator').style.display = 'block';
//     document.getElementById('baku-result').innerText = ''; // Clear the result while loading

//     fetch(`/correct?sentence=${encodeURIComponent(sentence)}&threshold=${threshold}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Gagal mengambil respons dari server');
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.error) {
//                 alert(`Error: ${data.error}`);
//             } else {
//                 document.getElementById('baku-result').innerText = data.corrected_sentence;
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Terjadi kesalahan saat menghubungi server.');
//         })
//         .finally(() => {
//             // Hide loading indicator once the process is complete
//             document.getElementById('loading-indicator').style.display = 'none';
//         });
// }



// function koreksiKalimat() {
//     const sentence = document.getElementById('typo-input').value.trim();
//     const threshold = 3; // Anda bisa menambahkan input threshold jika diinginkan

//     if (!sentence) {
//         alert('Harap masukkan kalimat untuk dikoreksi!');
//         return;
//     }

//     fetch(`/correct?sentence=${encodeURIComponent(sentence)}&threshold=${threshold}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Gagal mengambil respons dari server');
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.error) {
//                 alert(`Error: ${data.error}`);
//             } else {
//                 document.getElementById('baku-result').innerText = data.corrected_sentence;
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Terjadi kesalahan saat menghubungi server.');
//         });
// }

// async function koreksiTypo() {
//     const typoInput = document.getElementById('typo-input').value;
//     const resultElement = document.getElementById('baku-result');

//     if (typoInput.trim() === '') {
//         resultElement.textContent = 'Silakan masukkan kata untuk dikoreksi.';
//         return;
//     }

//     // Memanggil API GET untuk koreksi kata
//     try {
//         const response = await fetch(`/correct?word=${encodeURIComponent(typoInput)}&threshold=3`);
//         const result = await response.json();

//         if (response.ok) {
//             resultElement.textContent = `Kata yang dikoreksi: ${result.corrected_word}`;
//         } else {
//             resultElement.textContent = `Error: ${result.error}`;
//         }
//     } catch (error) {
//         resultElement.textContent = 'Terjadi kesalahan saat menghubungi server.';
//         console.error('Error:', error);
//     }
// }



// // Fungsi untuk memanggil API dan mengoreksi kata
// async function correctWord() {
//     const word = document.getElementById('wordInput').value;
//     const threshold = document.getElementById('thresholdInput').value || 3;

//     // Memanggil API GET
//     const response = await fetch(`/correct?word=${encodeURIComponent(word)}&threshold=${threshold}`);
//     const result = await response.json();

//     if (response.ok) {
//         document.getElementById('result').textContent = `Kata yang dikoreksi: ${result.corrected_word}`;
//     } else {
//         document.getElementById('result').textContent = `Error: ${result.error}`;
//     }
// }


// function correctText() {
//     const typoText = document.getElementById('typoText').value;
//     const correctedText = typoText.replace(/typo/gi, 'baku'); // Placeholder logic
//     document.getElementById('correctedText').value = correctedText;

//     const wordCount = typoText.split(/\s+/).filter(word => word).length;
//     document.getElementById('wordCount').innerText = wordCount;
// }

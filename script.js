document.addEventListener('DOMContentLoaded', () => {
    const answerInput = document.getElementById('answerInput');
    const submitAnswerButton = document.getElementById('submitAnswer');
    const quizMessage = document.getElementById('quizMessage');
    const quizContainer = document.querySelector('.quiz-container');
    const viewRewardButton = document.getElementById('viewRewardButton'); 
    
    // Fotoğraf elementleri
    const sadImage = document.getElementById('sadImage');
    const happyImage = document.getElementById('happyImage');

    let incorrectAttemptCount = 0;
    const maxAttempts = 3; 
    const finalMessage = "Talha senin sevgilin değil kocan!"; 

    // Sad fotoğrafı 1 saniye gösterip gizleyen fonksiyon
    function showSadImage() {
        sadImage.classList.add('visible');
        setTimeout(() => {
            sadImage.classList.remove('visible');
        }, 1000); 
    }

    // Mutlu fotoğrafı gösteren ve kilitlenen fonksiyon
    function showHappyEnding() {
        // Mutlu fotoğrafı görünür yap
        happyImage.classList.add('visible');
        
        // Mesajı göster ve butonları kapat
        quizMessage.textContent = finalMessage;
        quizMessage.classList.add('success');
        answerInput.disabled = true;
        submitAnswerButton.disabled = true;
        
        // 3 saniye sonra mutlu fotoğrafı gizle ve ödül butonunu göster
        setTimeout(() => {
            happyImage.classList.remove('visible');
            
            // Ödül butonunu görünür yap
            viewRewardButton.classList.add('visible');
        }, 3000); 
    }


    if (submitAnswerButton) {
        submitAnswerButton.addEventListener('click', () => {
            const userAnswer = answerInput.value.trim(); 
            answerInput.value = ''; // Giriş alanını temizle

            incorrectAttemptCount++;

            if (incorrectAttemptCount > maxAttempts) {
                // 4. ve sonraki denemelerde
                showHappyEnding();
            } else {
                // 1., 2. ve 3. denemeler
                // DÜZELTME YAPILDI: Daha önceki isteğinizdeki mesaj eklendi
                quizMessage.textContent = `Yanlış cevap!  Tekrar dene. (Deneme hakkı: ${maxAttempts - incorrectAttemptCount} kaldı)`;
                quizMessage.classList.remove('success');
                
                // Üzgün fotoğrafı göster
                showSadImage();
            }
        });

        // Enter tuşu ile de cevap gönderme
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitAnswerButton.click();
            }
        });
    }
});
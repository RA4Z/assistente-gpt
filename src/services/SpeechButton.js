import React, { useEffect, useState } from 'react';

const SpeechButton = () => {

  const [transcript, setTranscript] = useState('');

  const onSpeak = (e) => {
    setTranscript(e.results[0][0].transcript);
    const inputElement = document.querySelector('#ValorInserido');
    inputElement.value = e.results[0][0].transcript;
  };

  const handleSpeechRecognition = () => {
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-Br';
    recognition.start();

    recognition.addEventListener('result', onSpeak);
  };
  
  useEffect(() => {
    handleSpeechRecognition()
  },[])

  return (
    <div>
    </div>
  );
};

export default SpeechButton;

import React, { useState, useEffect } from 'react'
import Header from './Header'
import './Amplifier.css'

const Amplifier = ({setToggle}) => {

  const info = {
    title: 'Audiowalk'
  }

  /*
  const [stream, setStream] = useState(null)
  const [isListening, setIsListening] = useState(false)

  const handleListening = () => {
    if (isListening) {
      stopAudio()
    } else {
      getMedia()
    }
  }

  const stopAudio = () => {
    stream.getTracks().forEach(track => track.stop());
    setIsListening(false)
  }

  const getMedia = async () => {

    const constraints = { video: false, audio: true };
    let audioContext = new AudioContext();

    let BUFF_SIZE_RENDERER = 16384;
    let microphone_stream = null;
    let gain_node = null;
    let script_processor_node = null;

    try {
      let tempStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(tempStream)
      start_microphone(tempStream)
      setIsListening(true)
    } catch (err) {
      alert('error capturing audio..') 
    }

    function process_microphone_buffer(event) {
      let microphone_output_buffer;
      microphone_output_buffer = event.inputBuffer.getChannelData(0); // just mono - 1 channel for now
    }

    function start_microphone(stream) {
      gain_node = audioContext.createGain();
      gain_node.connect(audioContext.destination);

      microphone_stream = audioContext.createMediaStreamSource(stream);
      microphone_stream.connect(gain_node); 

      script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE_RENDERER, 1, 1);
      script_processor_node.onaudioprocess = process_microphone_buffer;

      microphone_stream.connect(script_processor_node);
    }

  }
  */

  useEffect(() => {
  
    return () => {
      console.log('unmounting Amplifier...');
    }
  }, [])
  
  return (
    <>
      <Header info={info} setToggle={setToggle}/>
      <div className="main">
        <div className='listen'>
          {/* <button onClick={handleListening} > {isListening ? 'stop' : 'listen'} </button> */}
          <p> soon will be available </p>
        </div>
      </div>
    </>
  )
}

export default Amplifier
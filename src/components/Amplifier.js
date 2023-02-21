import React, { useState, useEffect } from 'react'
import Header from './Header'
import './Amplifier.css'


const Amplifier = ({setToggle}) => {

  const info = {
    title: 'Audiowalk'
  }

  const pageData = [
    {
      BODY: 'Play this audio indoors, before leaving your home/workspace or starting point. After the audio finishes click on next',
      AUDIO_URL: 'https://cloud.disorient.xyz/s/GEeMr4x8jTkfHD9/download/to-recall_part-1.mp3'
    },
    {
      BODY: 'After getting ready play this audio and start the drift',
      AUDIO_URL: 'https://cloud.disorient.xyz/s/jwPCFzDBwKdL4ns/download/to-recall_part-2.mp3'
    }
  ]

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

  const [pageNo, setPagaNo] = useState(0)
  const [body, setBody] = useState('')
  const [url, setUrl] = useState('')

  const setData = () => {
    if (pageNo === 0) {
      setBody(pageData[0].BODY)
      setUrl(pageData[0].AUDIO_URL)
    }
    if (pageNo === 1) {
      setBody(pageData[1].BODY)
      setUrl(pageData[1].AUDIO_URL)
    }
  }

  const handleClick = () => {
    if (pageNo === 0) {
      setPagaNo(1)
    } else {
      setPagaNo(0)
    }
  }


  useEffect(() => {
    setData();
  
    return () => {
      console.log('unmounting Amplifier...');
    }
  }, [pageNo])
  
  return (
    <>
      <Header info={info} setToggle={setToggle}/>
      <div className='main'>

        <div className='body audio'>
          <h3 className='audio-title'> Part {pageNo === 0 ? '1' : '2'}</h3>
          <p className='audio-description'> {body} </p>
          <audio
            className='audio-player'
            src={url}
            controls
            controlsList='nodownload'>  
          </audio>
        </div>

        <div className='buttons'>
          {/* <button onClick={handleListening} > {isListening ? 'stop' : 'listen'} </button> */}
          <button type="button" className="btn-big" onClick={handleClick}>
            {pageNo === 0 ? 'Next' : 'Back'}
          </button>
        </div>

      </div>
    </>
  )
}

export default Amplifier
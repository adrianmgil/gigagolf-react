import { useEffect, useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

export function useTextToListen() {
    const [textToListen, setTextToListen] = useState('');
    let resultLength = 0;
    let listenTextLength = 0;

    const { listen, listening, stop } = useSpeechRecognition({
        continuous: true,
        autoRestart: false,
        onResult: (result) => {
            if (resultLength > result.length) {
                setTextToListen(prev => { prev = `${prev}<br /><br />`; listenTextLength = prev.length; return ( prev ); });
            }
            resultLength = result.length;
            setTextToListen(prev => prev.substring(0, listenTextLength) + result);
        },
        onError: (event) => {
            if (event.error === 'no speech')
                console.log('no speech detected')
            else
                console.log(event.error);
        },
        onEnd: () => {
            console.log('silence detected')
        }
    });

    const onStartListen = ((e) => {listen(); e.preventDefault();});
    const onStopListen = ((e) => {stop(); e.preventDefault();});

    const onTextListenClear = () => {
        listenTextLength = 0;
        setTextToListen('');
    };

    useEffect(() => {
        listen({ interimResults: true });
    }, [listen])
    
    return { textToListen, listening, onStartListen, onStopListen, onTextListenClear };
}

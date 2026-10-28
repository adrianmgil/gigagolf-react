import { useCallback, useState, useEffect, useMemo } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import './speech.css';

export function useTextToSpeech({ isDebugMode }) {

    const STATUS = useMemo(() => Object.freeze({ NONE: 0, TYPING: 1, TYPING_WHILE_DELAY: 2, TYPING_WHILE_SPEAKING: 3 }),[]);
    const [textToSpeak, setTextToSpeak] = useState('');
    const textObject = useMemo(() => { return { text: '', index: 0, timeStamp: null, status: STATUS.NONE }; },[STATUS]);
    const { speak, speaking, voices } = useSpeechSynthesis({onEnd: () => { onSpeakStopped(); }});
    const speakDelay = +localStorage.getItem('speakDelay') * 1000;
    const langSepak = voices.find(v => v.lang.includes('en-US'));
    //const words = useMemo(() => { return [] });

    const log = useCallback((message) => {
        if (isDebugMode) {
            console.log(message);
        }
    }, [isDebugMode]);

    const getTextLastIndex = useCallback(() => {
        if (!textObject.text) return -1;
        const characterList = [' ']; //, '\u00A0'];
        const indexList = characterList.map(character => textObject.text.lastIndexOf(character));
        return Math.max(...indexList);
    },[textObject]);

    const setHighlight = useCallback((text) => {
        const textBefore = textObject.text.substring(0, textObject.index);
        const textAfter = textObject.text.substring(textObject.index-1);
        const leadingSpaces = text.match(/^\s+/) ?? '';
        const trailingSpaces = text.match(/\s+$/) ?? '';
        const textReplace = `${leadingSpaces}<span class='text-highlight'>${text}</span>${trailingSpaces}`;
        textObject.text = textBefore + textAfter.replace(text, textReplace);
        setTextToSpeak(textObject.text);
        return textReplace.length - text.length + 1;
    }, [textObject]);

    const clearHighlight = useCallback(() => {
        if (textObject.text) {
            const previousLength = textObject.text.length;
            textObject.text = textObject.text.replace(/<span\s+[^>]*>/g, '').replace(/<\/span>/g, '');
            setTextToSpeak(textObject.text);
            return previousLength - textObject.text.length;
        }
    }, [textObject]);

    const startSpeak = useCallback((startChar = '') => {
        textObject.index -= clearHighlight();
        textObject.status = STATUS.NONE;

        const lastIndex = Math.max(getTextLastIndex(), textObject.text.length);
        // const countWords = textObject.text.substring(textObject.index).split(' ').length;
        // console.log('c=' + countWords);
        // if (startChar === '*' && lastIndex !== -1) {
        //     if (countWords <= 1) {
        //         lastIndex = textObject.text.length;
        //     }
        // } else if (lastIndex === -1) {
        //     lastIndex = textObject.text.length;
        // }

        if (lastIndex >= 1) {
            let speakText = textObject.text.substring(textObject.index, lastIndex);
            if (speakText) {
                textObject.index += setHighlight(speakText);
                log(startChar + '[' + speakText.trim().replace(/[.,?!]/g,'').replace(/&nbsp;/g,' ') + ']');
                speak({text: speakText.trim().replace(/[.,?!]/g,'').replace(/&nbsp;/g,' '), voice: langSepak, rate: 1.0});
                textObject.index += speakText.length;
            }
        }
    },[textObject, langSepak, STATUS, speak, getTextLastIndex, log, clearHighlight, setHighlight]);

    const onSpeakStopped = () => {
        if (textObject.status !== STATUS.TYPING_WHILE_DELAY) {
            startSpeak('*');
        }
    };

    const onTextToSpeakClear = useCallback((e) => {
        textObject.status = STATUS.NONE;
        textObject.text = '';
        textObject.index = 0;
        setTextToSpeak('');
        e.preventDefault();
    }, [textObject, STATUS])

    const onChange = useCallback((event) => {
        textObject.text = event.target.value || event.target.innerHTML;//.replace(/&nbsp;/g,' ');
        textObject.status = speaking ? STATUS.TYPING_WHILE_SPEAKING : (textObject.status === STATUS.TYPING_WHILE_DELAY ? STATUS.TYPING_WHILE_DELAY : STATUS.TYPING);
        setTextToSpeak(textObject.text);
    },[textObject, speaking, STATUS]);

    useEffect(() => {
        if (textObject.status === STATUS.NONE || textObject.status === STATUS.TYPING_WHILE_DELAY) { return; }

        if (textObject.status === STATUS.TYPING) {
            textObject.status = STATUS.TYPING_WHILE_DELAY;
            setTimeout(() => startSpeak('~'), speakDelay);
            return;            
        }
    }, [textObject, startSpeak, speakDelay, STATUS]);

    return { textToSpeak, onTextToSpeakChange: onChange, onTextToSpeakClear };
}
import './index.css';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useTextToSpeech } from './speech/TextToSpeech';
import { useTextToListen } from './speech/TextToListen';
import Settings from './settings/Settings';
import { isDesktop } from 'react-device-detect';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import useWakeLock from 'react-use-wake-lock';
import ContentEditable from 'react-contenteditable';
import { useKeyboardHeight } from 'react-simplikit';
import { ReactComponent as SettingsIcon } from './images/settings-cog.svg';
import { ReactComponent as FullScreenIcon } from './images/fullscreen-alt.svg';
import { ReactComponent as TrashIcon } from './images/trash.svg';

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const {textToSpeak, onTextToSpeakClear, onTextToSpeakChange } = useTextToSpeech({ isDebugMode: searchParams.has('debug')});
  const {textToListen, listening, onStartListen, onStopListen, onTextListenClear } = useTextToListen();
  const [isSettingDisplay, setSettingsDisplay] = useState(false);
  const { isSupported: isWakeLockSupported, request: requestWakeLock } = useWakeLock();
  const fullScreenHandle = useFullScreenHandle();
  const { keyboardHeight  } = useKeyboardHeight();
  const [win, setWin] = useState({ innerHeight: window.innerHeight, innerWidth: window.innerWidth });
  const resiableLineRef = useRef(null);
  const [resize, setResize] = useState({ initHeight: null, topHeight: 0, bottomHeight: 0});
   
  useEffect(() => {
    const handleResize = () => { setWin({ innerHeight: window.innerHeight, innerWidth: window.innerWidth }); };
    window.addEventListener("resize", handleResize);

    if (isWakeLockSupported) {
      requestWakeLock();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };    
  },[isWakeLockSupported, requestWakeLock])

  const [,setUpdate] = useState({});
  const onSettingChange = useCallback(()  => {
    setUpdate({});
  },[]);

  const darkTheme = localStorage.getItem('darkTheme');
  const colorHighlight = (localStorage.getItem('colorHighlight') ?? '').replace(/"/g,'');
  const colorText = (localStorage.getItem('colorText') ?? '').replace(/"/g,'');
  const containerStyle = {
    '--keyboardHeight': keyboardHeight + 'px',
    '--windowHeight': win.innerHeight + 'px',
    '--windowWidth': win.innerWidth +'px',
    '--colorHighlight': colorHighlight,
    '--colorText': colorText,
    '--colorTextDefault': '#00FF88'
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      handleReize(e.clientY);
    }
  }
  
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleReize(touch.clientY);
  }
  
  const handleTouchEnd = (e) => {
    if (document.activeElement instanceof HTMLElement) 
      document.activeElement.blur();
  }

  const handleReize = (clientY) => {
      const initHeight = resize.initHeight ?? resiableLineRef.current.offsetTop + 2;
      if (initHeight < clientY) {
        setResize({initHeight: initHeight, topHeight: (clientY - initHeight)*2 + 'px', bottomHeight: 0 });
      }else{
        setResize({initHeight: initHeight, topHeight: 0, bottomHeight: (initHeight - clientY)*2 + 'px' });
      }
  }

  return (
    <div style={ containerStyle }>
      <FullScreen handle={fullScreenHandle} onInput={onTextToSpeakChange} className={`App color-theme-${darkTheme === 'true' ? 'dark':'light'} force-mobile-wrapper`}>
        <div className='contentEditors'>
          <ContentEditable className='textListen' html={textToListen ?? ''} tagName='div' disabled={true} style={{ height: resize.topHeight }} />
          <TrashIcon onMouseDown={onTextListenClear} class='buttonClear' style={{ top: '1rem'}}/>
          <div className='resizable-line' onMouseMove={handleMouseMove} onTouchMove={handleTouchMove} ref={resiableLineRef} onTouchEnd={handleTouchEnd}></div>
          <ContentEditable className='textSpeak' html={textToSpeak ?? ''} tagName='div' disabled={false} onChange={onTextToSpeakChange} style={{ height: resize.bottomHeight }} />
          <TrashIcon onMouseDown={onTextToSpeakClear} class='buttonClear' style={{ bottom: '4rem'}}/>
        </div>
        <div className='bottomBar'>
          <SettingsIcon onClick={() => setSettingsDisplay(!isSettingDisplay)}/>
          {listening && <button onMouseDown={onStopListen}>Stop Listening</button>}
          {!listening && <button onMouseDown={onStartListen}>Start Listening</button>}
          {isDesktop &&
            <FullScreenIcon onClick={() => fullScreenHandle.enter()} className='buttonFullscreen'/>
          }
          {(!isDesktop && !fullScreenHandle.active) &&
            <FullScreenIcon onMouseDown={(e)=> { fullScreenHandle.enter(); e.preventDefault(); }} className='buttonFullscreen'/>
          }
          {isSettingDisplay && <Settings onChange={onSettingChange} onClose={() => setSettingsDisplay(false)}/>}
        </div>
      </FullScreen>
    </div>
  );
}

export default App;
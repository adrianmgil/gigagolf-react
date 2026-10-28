import { useLocalStorage } from './settings.hook';
import './settings.css';
import { Slider, Switch, ColorPicker } from 'antd';
import { useEffect } from 'react';

function Settings({ onClose, style, onChange }) {
  const [ darkTheme, setDarkTheme ] = useLocalStorage('darkTheme', false);
  const [ speakDelay, setSpeakDelay ] = useLocalStorage('speakDelay', 5);
  const [ colorHighlight, setColorHighlight ] = useLocalStorage('colorHighlight', '#FFFFB0');
  const [ colorText, setColorText ] = useLocalStorage('colorText', '#00FF88');

  const sliderMin = 5;
  const sliderMax = 12;
  const marks = {}; for (let i = sliderMin; i <= sliderMax; i++) { marks[`${i}`] = { label:`${i}`}; }
  
  useEffect(()  => {
    onChange();
  },[darkTheme, colorText, onChange]);

  const Field = (component, label) => {
    return <div className={'fieldRow'}><label>{label}:</label><div className={'component'}>{component}</div></div>
  }
  
  return (
    <div className='settings' style= { style }>
      {Field(<Slider min={sliderMin} max={sliderMax} marks={marks} included={false} defaultValue={speakDelay} onChange={setSpeakDelay} />, 'Speak Delay (sec)')}
      {Field(
        <div>
          <label>Light&nbsp;</label>
          <Switch defaultValue={darkTheme} onChange={setDarkTheme} />
          <label>&nbsp;Dark</label>
        </div>, 'Theme')
      }
      {Field(<ColorPicker value={colorHighlight} onChange={(c) => setColorHighlight(c.toHexString())}/>, 'Highlight Color')}
      {Field(<ColorPicker value={colorText} onChange={(c) => setColorText(c.toHexString())} />, 'Color')}
      <button onClick={onClose} className='settings-buttonClose'>Close</button>
    </div>
  );
}

export default Settings;
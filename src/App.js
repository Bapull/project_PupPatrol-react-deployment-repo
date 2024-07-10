import { MobileView } from 'react-device-detect';
import './App.css';

function App() {
  return (
    <div className="App">
      <MobileView>모바일 브라우져!</MobileView>
    </div>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router} from 'react-router-dom';

import MainPages from './Components/Pages';

function App() {
  return (
    <Router>
      <div className="App">
      
        <MainPages />
      </div>
    </Router>
  );
}

export default App;

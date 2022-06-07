import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import exampleComponent from './components/exampleComponent'

import './index.css'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/example" element={<exampleComponent />} />
        </Routes>
      </Router>  
    </div>
  )
}

export default App

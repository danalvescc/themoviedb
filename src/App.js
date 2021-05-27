import Home from './pages/Home.jsx'
import MoviePage from './pages/MoviePage.jsx'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from './components/Header.jsx';



function App() {
  
  return (
    <div className="App">
      <Header/>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/movie/:id" component={MoviePage} />
      </Router>
    </div>
  );
}

export default App;

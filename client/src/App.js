import './App.css';
import{BrowserRouter, Routes,Route}from 'react-router-dom';
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import VideogameDetail from './components/VideogameDetail/VideogameDetail'
import FormVideogame from './components/FormVideogame/FormVideogame'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Landing/>}/>
      <Route exact path='/home'element ={<Home/>}/>
      <Route exact path='/home/:id' element ={<VideogameDetail/>}/>
      <Route exact path='/form' element ={<FormVideogame/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

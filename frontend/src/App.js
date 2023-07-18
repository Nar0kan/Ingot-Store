import Header from './components/header'
import Footer from './components/footer'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'


function App() {
  return (
    <Router>
      <Header />
        <main className="py-3">
          <Container>
              <Routes>
                <Route path='/' element={ <HomeScreen /> } exact />
                <Route path='/login' element={ <LoginScreen /> } />
                <Route path='/product/:id' element={ <ProductScreen /> } />
                <Route path='/cart/:id?' element={ <CartScreen /> } />
              </Routes>
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;

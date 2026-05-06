import Router from './router/Router'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      <div className='main'>
        <Router />
      </div>
      <Footer />
    </>
  )
}

export default App
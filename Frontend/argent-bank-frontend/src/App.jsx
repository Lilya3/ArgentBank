import Router from './router/Router'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  )
}

export default App
import Header from '../../components/Header/'
import Hero from '../../components/Hero/'
import Presentation from '../../components/Presentation/'
import Skills from '../../components/Skills/'
import Services from '../../components/Services/'
import Portfolio from '../../components/Portfolio/'
import Cv from '../../components/Cv/'
import Contact from '../../components/Contact/'
import Footer from '../../components/Footer/'

function Home() {
    return (
        <div>
            <Header />
            <Hero />
            <Presentation />
            <Skills />
            <Services />
            <Portfolio />
            <Cv />
            <Contact />
            <Footer />
      </div>
    )
  }
  
  export default Home
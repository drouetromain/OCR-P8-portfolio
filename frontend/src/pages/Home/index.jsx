import Header from '../../components/Header/'
import Navigation from '../../components/Navigation/'
import Hero from '../../components/Hero/'
import Presentations from '../../components/Presentations/'
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
            <Presentations />
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
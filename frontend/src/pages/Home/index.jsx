import Header from '../../components/Header/'
import Heros from '../../components/Heros/'
import Presentations from '../../components/Presentations/'
import Skills from '../../components/Skills/'
import Services from '../../components/Services/'
import Portfolio from '../../components/Portfolio/'
import Cv from '../../components/Cv/'
import Contact from '../../components/Contact/'
import Footer from '../../components/Footer/'
import '../../components/Hp.css'

function Home() {
    return (
        <div>
            <Header />
            <Heros />
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
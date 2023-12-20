import Header from '../../components/Header/'
import Heros from '../../components/Heros/'
import Presentations from '../../components/Presentations/'
import Skills from '../../components/Skills/'
import Services from '../../components/Services/'
import Portfolio from '../../components/Portfolio/'
import Cvs from '../../components/Cvs/'
import Contact from '../../components/Contact/'
import Footer from '../../components/Footer/'
import '../../components/Hp.css'

function Home() {
    return (
        <main className='hp-main'>
            <Header />
            <Heros />
            <Presentations />
            <Skills />
            <Services />
            <Portfolio />
            <Cvs />
            <Contact />
            <Footer />
      </main>
    )
  }
  
  export default Home
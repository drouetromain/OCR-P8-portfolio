import Header from '../../components/Header/'
import Heros from '../../components/Heros/'
import Presentations from '../../components/Presentations/'
import Skills from '../../components/Skills/'
import Services from '../../components/Services/'
import Portfolios from '../../components/Portfolios/'
import Cvs from '../../components/Cvs/'
import Contact from '../../components/Contact/'
import Footer from '../../components/Footer/'
import '../../components/Hp.css'

function Home() {
    return (
        <main className='hp-main'>
            <Heros />
            <Presentations />
            <Skills />
            <Services />
            <Portfolios />
            <Cvs />
            <Contact />
            <Footer />
      </main>
    )
  }
  
  export default Home
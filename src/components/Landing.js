import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import '../styles/Landing.css'
import code_editor from '../assets/images/code-editor-icon.png'
import community from '../assets/images/community-icon.png'
import problem_solving from '../assets/images/problem-solving-icon.png'
import { Link, animateScroll as scroll } from 'react-scroll'
import Editor from './EditorWithoutQuestion'
import code_editor_img from '../assets/images/code-editor.jpg'
import arrow_up from '../assets/images/arrow_up.png'
import ScrollAnimation from 'react-animate-on-scroll'
import Footer from './Footer'

function Landing() {
  const { innerWidth: width, innerHeight: height } = window
  const [show, handleShow] = useState(false)

  useEffect(() => {
    document.getElementById('goto').style.display = 'none'
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        document.getElementById('goto').style.display = null
        handleShow(false)
      } else {
        handleShow(true)
      }
    })
    // This is to remove the listener in case useEffect fires multiple times to avoid multiple listeners
    return () => {
      window.removeEventListener('scroll')
    }
  }, [])

  const addExtraText = () => {
    if (width < 650) {
      return 'Please access the code editor in your PC or Laptops'
    }
  }

  return (
    <div>
      <div className='navigation' id='navigation'>
        <Nav />
      </div>
      <div className={`goto__top ${show && 'set_display_goto'}`} id='goto'>
        <Link
          className='link_goto_top'
          activeClass='active'
          to='navigation'
          spy={true}
          smooth={true}
          offset={-70}
          duration={1000}
        >
          <img src={arrow_up} alt='Arrow Up' />
        </Link>
      </div>
      <div className='intro' id='intro'>
        {/* <IntroLandingPage /> */}
        <div className='intro__section'>
          <div className='intro__text'>
            <p className='intro__title'>Step by Step</p>
            <p className='tagline'>
              An easy way to contribute to the society, and gain from it, by
              adding and solving problems open to all...
            </p>
            <Link
              className='no__style'
              activeClass='active'
              to='editor'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <button className='try__for__free'>
                Try out the vanilla editor
              </button>
            </Link>
          </div>
          <div className='intro__image'>
            <img src={code_editor_img} alt='Code Editor' />
          </div>
        </div>
      </div>
      <div className='what__section'>
        <p>What is SbS?</p>
        <div className='info__cards'>
          <div className='info__card'>
            <div className='info__icon'>
              <img src={code_editor} alt='Code Editor Icon' />
            </div>
            <div className='title'>Vanilla Editor</div>
            <div className='content'>
              <p>
                A normal online editor with 40+ language support, and a normal
                compiler to compile them and show the output. This does not
                require signing in and no questions are displayed.
              </p>
            </div>
          </div>
          <div className='info__card'>
            <div className='info__icon'>
              <img src={community} alt='Code Editor Icon' />
            </div>
            <div className='title'>Community</div>
            <div className='content'>
              <p>
                A huge community with people contributing to the problem list
                anytime, thus allowing the versatality to be intact and thrill
                for any new challenge that comes across
              </p>
            </div>
          </div>
          <div className='info__card'>
            <div className='info__icon'>
              <img src={problem_solving} alt='Code Editor Icon' />
            </div>
            <div className='title'>Unique Problems</div>
            <div className='content'>
              <p>
                A unique collection of questions for problem solving contributed
                by many programmers all over the world, thus helping the
                beginners feel confident and ready for any challenge.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='editor' id='editor'>
        <div className='editor__content'>
          <p className='header'>Practice Environment</p>
          <p className='editor__description'>
            The perfect way to practice, learn, and contribute to the society by
            free online code editor, practice problems curated by individuals
            from everywhere. <br /> For the people, By the people. <br /> Pick a
            question, read the problem, write some code, compile it or just
            write code without any prompt, and execute it. <br />
            <br />
            <b>{addExtraText()}</b>
          </p>
        </div>

        <div className='ace__editor' id='ace__editor'>
          <Editor />
        </div>
      </div>
      <div className='footer__content'>
        <Footer />
      </div>
    </div>
  )
}

export default Landing

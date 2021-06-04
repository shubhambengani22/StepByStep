import React, { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-golang'
import 'ace-builds/src-noconflict/mode-swift'
import 'ace-builds/src-noconflict/mode-kotlin'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-typescript'

import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-ambiance'
import 'ace-builds/src-noconflict/theme-chaos'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/theme-clouds_midnight'
import 'ace-builds/src-noconflict/theme-cobalt'
import 'ace-builds/src-noconflict/theme-crimson_editor'
import 'ace-builds/src-noconflict/theme-dawn'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/theme-dreamweaver'
import 'ace-builds/src-noconflict/theme-eclipse'
import 'ace-builds/src-noconflict/theme-gob'
import 'ace-builds/src-noconflict/theme-gruvbox'
import 'ace-builds/src-noconflict/theme-idle_fingers'
import 'ace-builds/src-noconflict/theme-iplastic'
import 'ace-builds/src-noconflict/theme-katzenmilch'
import 'ace-builds/src-noconflict/theme-nord_dark'
import 'ace-builds/src-noconflict/theme-pastel_on_dark'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/theme-sqlserver'

import 'ace-builds/src-noconflict/ext-language_tools'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/EditorWithoutQuestion.css'
import logo from '../assets/images/logoStepByStep.png'
import { modes } from '../modes'
import { themes } from '../themes'

import light from '../assets/images/light-mode-icon.png'
import dark from '../assets/images/dark-mode-icon.png'

var axios = require('axios').default

function handleSubmit(input) {
  var options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: { base64_encoded: 'true', fields: '*' },
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-key': '58f79bfcbdmsh0a1b9ef1187faa0p102711jsn6b8a01d61564',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    },
    data: {
      language_id: 71,
      source_code: btoa(input),
    },
  }
  axios
    .request(options)
    .then(function (response) {
      //console.log(response.data.token)
      var token = response.data.token
      console.log(token)
      var getOptions = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'x-rapidapi-key':
            '58f79bfcbdmsh0a1b9ef1187faa0p102711jsn6b8a01d61564',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        },
      }
      axios
        .request(getOptions)
        .then(function (response) {
          const data = response.data
          // console.log(data)
          // console.log(new Date(data.created_at))
          // console.log(new Date(data.finished_at))
          console.log(new Date(data.finished_at) - new Date(data.created_at))
          //console.log(atob(response.data.message), atob(response.data.stderr))
          //console.log(response.data)
          if (data.stderr) {
            console.log(atob(data.stderr))
            const output = <p>{atob(data.stderr)}</p>
            ReactDOM.render(output, document.getElementById('output'))

            // const elapsed_time = (
            //   <div style={{ display: 'inline-block' }}>
            //     <p className='time_elapsed'>
            //       {'Elapsed time : ' +
            //         (new Date(data.finished_at) - new Date(data.created_at)) /
            //           1000 +
            //         'seconds'}
            //     </p>
            //     <button
            //       className='output-btn'
            //       onClick={() => {
            //         const output = (
            //           <p>
            //             <h3>Output</h3>
            //           </p>
            //         )
            //         ReactDOM.render(output, document.getElementById('output'))
            //         handleSubmit(input)
            //       }}
            //     >
            //       Submit
            //     </button>
            //   </div>
            // )
            // console.log(document.getElementById('options'))
            // ReactDOM.render(elapsed_time, document.getElementById('options'))
          } else {
            console.log(atob(data.stdout))
            const output = <p>{atob(data.stdout)}</p>
            //console.log(document.getElementsByClassName('output'))
            ReactDOM.render(output, document.getElementById('output'))

            // const elapsed_time = (
            //   <div style={{ display: 'inline-block' }}>
            //     <p className='time_elapsed'>
            //       {'Elapsed time : ' +
            //         (new Date(data.finished_at) - new Date(data.created_at)) /
            //           1000 +
            //         'seconds'}
            //     </p>
            //     <button
            //       className='output-btn'
            //       onClick={() => {
            //         const output = (
            //           <p>
            //             <h3>Output</h3>
            //           </p>
            //         )
            //         ReactDOM.render(output, document.getElementById('output'))
            //         handleSubmit(input)
            //       }}
            //     >
            //       Submit
            //     </button>
            //   </div>
            // )
            // console.log(document.getElementById('options'))
            // ReactDOM.render(elapsed_time, document.getElementById('options'))
          }
        })
        .catch(function (error) {
          console.error(error)
        })
    })
    .catch(function (error) {
      console.error(error)
    })
}

function Editor() {
  const [input, setInput] = useState('')
  const [fontSize, setFontSize] = useState('')
  const [theme, setTheme] = useState('')
  const [mode, setMode] = useState('')
  const [isModeSet, setIsModeSet] = useState(false)
  const [isThemeSet, setIsThemeSet] = useState(false)
  const [isFontSizeSet, setIsFontSizeSet] = useState(false)
  const [themeMode, setThemeMode] = useState('light')
  const [isThemeModeSet, setIsThemeModeSet] = useState(false)

  //useEffect(() => {
  // If [], run once when the row loads and we don't run again
  // If [param1, ...] it loads everytime the params change. params are called dependencies
  // Since we are making a request to a third party service, we have to make sure we use async
  //   var options = {
  //     method: 'GET',
  //     url: 'https://judge0-ce.p.rapidapi.com/languages',
  //     headers: {
  //       'x-rapidapi-key': '58f79bfcbdmsh0a1b9ef1187faa0p102711jsn6b8a01d61564',
  //       'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
  //     },
  //   }

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       //console.log(response)
  //       if (response.status === 200) {
  //         //console.log(response.data)
  //         setLanguages(response.data)
  //       }
  //     })
  //     .catch(function (error) {
  //       console.error(error)
  //       return error
  //     })
  // }, [])

  // var checkIfDataExists = setTimeout(function () {
  //   if (languages.length > 0) {
  //     setLoadWindow(true)
  //   }
  // }, 1500)

  // if (loadWindow) {
  //   //console.log(languages)
  //   clearInterval(checkIfDataExists)
  // }

  //console.log(mode)
  if (mode && !isModeSet) {
    //console.log(mode)
    setIsModeSet(true)
  }

  if (fontSize && !isFontSizeSet) {
    //console.log(fontSize)
    setIsFontSizeSet(true)
  }

  if (theme && !isThemeSet) {
    //console.log(theme)
    setIsThemeSet(true)
  }

  if (themeMode && !isThemeModeSet) {
    setIsThemeModeSet(true)
  }

  const getFonts = () => {
    var fonts = []
    for (let i = 12; i <= 18; i++) {
      fonts.push(<option value={`${i}px`}>{i}</option>)
    }
    return fonts
  }

  const getThemesAccordingToMode = (themes) => {
    //console.log(themes.length)
    var n = themes.length
    var themeArr = []
    for (let i = 0; i < n; i++) {
      if (themes[i].mode == themeMode) {
        themeArr.push(<option value={themes[i].value}>{themes[i].name}</option>)
      }
    }
    return themeArr
  }

  return (
    <div>
      <div className='options'>
        <div className='logo'>
          <img src={logo} alt='Logo' />
        </div>
        <div className='option__buttons'>
          <div className='option'>
            <select
              onChange={(e) => {
                setMode(e.target.value)
              }}
              name='languages'
              id='languages'
            >
              {modes.map((m) => (
                <option value={m.value}>{m.name}</option>
              ))}
            </select>
            <select
              onChange={(e) => {
                setFontSize(e.target.value)
              }}
              name='fonts'
              id='fonts'
            >
              {/* <option value='JavaScript'>JavaScript</option> */}
              {getFonts()}
            </select>
            <select
              onChange={(e) => {
                setTheme(e.target.value)
              }}
              name='theme'
              id='theme'
            >
              {/* {themes.map((theme) => (
                <option value={theme.value}>{theme.name}</option>
              ))} */}
              {getThemesAccordingToMode(themes)}
            </select>
            <img
              src={dark}
              className='mode'
              id='mode'
              onClick={() => {
                setTheme('monokai')
                var image = document.getElementById('mode')
                if (image.src.includes('dark-mode-icon')) {
                  setTheme('monokai')
                  setThemeMode('dark')
                  image.src = light
                } else if (image.src.includes('light-mode-icon')) {
                  setTheme('github')
                  setThemeMode('light')
                  image.src = dark
                }
              }}
              alt='Dark Mode'
            />
            <button className='run' onClick={() => handleSubmit(input)}>
              Run Code
            </button>
          </div>
        </div>
      </div>
      <div className='code-editor'>
        <AceEditor
          width='100%'
          height='50vh'
          mode={isModeSet ? mode : ''}
          theme={isThemeSet ? theme : 'github'}
          fontSize={isFontSizeSet ? fontSize : '14px'}
          onChange={(e) => setInput(e)}
          name='UNIQUE_ID_OF_DIV'
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
        <div className='output__section'>
          <h4>Output</h4>
          <div className='output' id='output'></div>
        </div>
      </div>
    </div>
  )
}

export default Editor

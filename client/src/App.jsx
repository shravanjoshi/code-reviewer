import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
import {WavyBars} from 'spinny-loader';

function App() {
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true);
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setLoading(false);
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              lang='javascript'
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                color: "#f8f8f2",
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
              readOnly={false}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          {loading ? <div><WavyBars /></div> : 

          <Markdown
          
          rehypePlugins={[ rehypeHighlight ]}
          
          >{review}</Markdown>
        }
        </div>
      </main>
    </>
  )
}



export default App
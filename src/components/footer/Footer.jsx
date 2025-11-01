import { useState } from "react"
import "./footer.css"
export default function Footer(props){    
    const [arr,setArr] = useState([1,2,3,4,5,6,7,8,9]);
    function previous(){
        if(props.current !== 1){
            if(arr[0]===props.current){
                setArr([props.current-1, ...arr.slice(0,-1)])
            }
            props.setCurrent(props.current-1);
        }
    }
    function next(){
        if(props.current!==1000){
            if(arr[arr.length-1]===props.current){
                setArr([...arr.slice(1), props.current+1]);
            }
            props.setCurrent(props.current+1)
        }
    }
    const goToFirstPage = () => {
        if (props.current !== 1) {
            setArr([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            props.setCurrent(1);
        }
    };

    return (
        <>
            <div className="pagination-container">
                <button 
                    className="pagination-btn first-page" 
                    onClick={goToFirstPage}
                    disabled={props.current === 1}
                    title="Go to first page"
                >
                    First
                </button>
                <button 
                    className="pagination-btn prev-page" 
                    onClick={previous}
                    disabled={props.current === 1}
                    title="Previous page"
                >
                    Previous
                </button>
                <ul className="number-list">
                    {arr.map((item) => (
                        <li 
                            key={item} 
                            className={`page-number ${item === props.current ? 'active' : ''}`}
                            onClick={() => props.setCurrent(item)}
                            title={`Go to page ${item}`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                <button 
                    className="pagination-btn next-page" 
                    onClick={next}
                    disabled={props.current === 1000}
                    title="Next page"
                >
                    Next
                </button>
            </div>
            
            {/* Developer Watermark */}
            <div className="developer-watermark">
                <div className="watermark-content">
                    <p className="watermark-text">
                        Developed with ❤️ by <span className="developer-name">Kommireddy Santhosh</span>
                    </p>
                    <div className="developer-links">
                        <a href="https://kommireddy-santhosh-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
                            <span className="link-icon">🌐</span> Portfolio
                        </a>
                        <a href="https://github.com/kommireddya32" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <span className="link-icon">🔗</span> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/santhosh-kommireddy-6ba34724a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <span className="link-icon">💼</span> LinkedIn
                        </a>
                        <a href="mailto:kommireddysanthosh@gmail.com" aria-label="Email">
                            <span className="link-icon">✉️</span> kommireddysanthosh@gmail.com
                        </a>
                    </div>
                    <p className="copyright-text">
                        © {new Date().getFullYear()} Movie Explorer. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    )
}
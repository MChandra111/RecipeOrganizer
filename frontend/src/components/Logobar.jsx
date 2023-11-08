import React from 'react';
import "./Logobar.css";
import Cinna from "../assets/cinnamoroll-sanrio.gif";

function Logobar() {
    return (
        <div className='Logo'>
            <h1>
                <img
                    src={Cinna}
                    alt="CINNAMOROLL"
                    className='Cinna'
                />
                Happy <span style={{color: "maroon"}}>Wife</span>, Happy <span style={{color: "maroon"}}>Life</span>
            </h1>
            <div className='Logobar'>            
            </div>
        </div>
    );
} export default Logobar;
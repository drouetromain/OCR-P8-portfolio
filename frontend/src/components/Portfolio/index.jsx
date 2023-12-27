import React, { useState } from 'react';

function Portfolio({ title, anchorId, imageUrl, alt, description, filters, link }) {

    const [isHover, setIsHover] = useState(false);
    const handleMouseEnter = () => {
      setIsHover(true);
     };
   const handleMouseLeave = () => {
      setIsHover(false);
   };
    
    return (
        <div id={anchorId}>
            <div id={filters}>
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  
                >
                {isHover ?
                    <div>
                        <a href={link} target="_blank" rel="noreferrer">
                            <div
                                className="hp-portfolio-img-container"
                                style={{ 
                                    backgroundImage: `url(https://api.romaindrouet.com${imageUrl})`,
                                    filter: `grayscale(0)`,
                                }}
                            >
                            </div>
                        </a>
                        
                        <div id="app">
                            <div className="ui-slide-in">
                                <div className="text-wrapper">
                                    <h3 className="line"><span class="black">{title}</span></h3>
                                    <div className="line"><span class="thin">{description}</span></div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    
                    :
                    <div
                        className="hp-portfolio-img-container"
                        style={{ 
                            backgroundImage: `url(https://api.romaindrouet.com${imageUrl})`,
                            filter: `grayscale(1)`
                        }}
                    >
                    </div>
                    
                    
                }
                </div>
            </div>
        </div> 
        
    )
}

export default Portfolio;
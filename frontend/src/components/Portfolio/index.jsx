import React, { useState } from 'react';

function Portfolio({ title, anchorId, imageUrl, alt, description, filters }) {

    const [isHover, setIsHover] = useState(false);
    console.log('isHover:' + isHover)
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
                    // className={isHover ? "hp-portfolio-img-container" : ""}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  
                >
                {isHover ?
                    <div>
                       <div
                            className="hp-portfolio-img-container"
                            style={{ 
                                backgroundImage: `url(${imageUrl})`,
                                filter: `grayscale(0)`,
                            }}
                        >

                        </div>
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
                            backgroundImage: `url(${imageUrl})`,
                            filter: `grayscale(1)`
                        }}
                    >
                        {/* <h3 className="hp-h3">{title}</h3>
                        <div>{description}</div> */}
                    </div>
                    
                    
                }
                </div>
            </div>
        </div> 
        
    )
}

export default Portfolio;
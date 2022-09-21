import { useState, useEffect, useRef } from "react";
import { sliderData } from "./sliderData";
import "./Slider.css";

export const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
    const autoScroll = true;
    let slideInterval;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
    }

    // const prevSlide = () => {
    //     setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)
    // }

    const autoSlide = () => {
        slideInterval = setInterval(nextSlide, 10200);
    }

    useEffect(() =>{
        setCurrentSlide(0);
    }, [])

    useEffect(() =>{
            autoSlide()
        return () => clearInterval(slideInterval)
    }, [currentSlide]);

    return (
        <div className="slider">
            <div className="pointsHome">
                <i className="fa-solid fa-circle" onClick={() => setCurrentSlide(0)}></i>
                <i className="fa-solid fa-circle" onClick={() => setCurrentSlide(1)}></i>
                <i className="fa-solid fa-circle" onClick={() => setCurrentSlide(2)}></i>
            </div>
            {sliderData.map((slide, index) => {
                return (
                    <div className={index === currentSlide ? "slideCurrent" : "slide"} key={index}>
                        {index === currentSlide && (
                            <>
                                <img src={slide.image} alt="slide" className="slider-pic"/>
                                <div className="content-pictures">
                                    <h1>{slide.heading}</h1>
                                    <hr />
                                    <p>{slide.arg1}</p>
                                    <p>{slide.arg2}</p>
                                    <p>{slide.arg3}</p>
                                </div>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
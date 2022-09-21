import "./DogAnimation.css";

export const DogAnimation = () => {
    return (
        <div className="container">
            <div className="dog">
                <div className="dog-head">
                    <div className="dog-ears ears-left"></div>
                    <div className="dog-ears ears-right"></div>
                    <div className="dog-eyes"></div>
                    <div className="dog-mouth">
                        <div className="dog-nose"></div>
                        <div className="dog-tongue"></div>
                    </div>
                </div>
                <div className="dog-tail"></div>
                <div className="dog-body">
                    <div className="dog-foot"></div>
                </div>
                <div className="ball"></div>
            </div>
        </div>
    )
}
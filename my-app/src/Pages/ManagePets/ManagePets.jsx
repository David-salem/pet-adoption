import "./ManagePets.css";

export const ManagePets = () => {
    return(
        <div className="my-pets-page">
            <div className="title-mypets">
                <h1>Upload new pet</h1>
                <p>Here you can see all the information of the pet.</p>
            </div>
            <div className="imp-info-pet">
                <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/large-dog-breeds-lead-1550810849.jpg?crop=0.668xw:1.00xh;0.191xw,0&resize=640:*" alt="pet-picture" className="my-pet-pic"/>
                <p>name</p>
                <div>
                    <button>boton 1</button>
                    <button>boton 2</button>
                </div>
            </div>
            <div className="status">
                <p >status</p>
            </div>
            <div className="status-info-pet">
                <p>bio</p>
            </div>
        </div>
    )
}
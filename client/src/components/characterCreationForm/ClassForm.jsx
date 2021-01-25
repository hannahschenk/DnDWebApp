import React, {useState, useEffect} from 'react';
import dndApi from "../../utils/dnd5eApi";

const ClassForm = () => {
    const [classChoices, setClassChoices]  = useState([]);

    useEffect(() => {
        dndApi.getClasses()
        .then((response) => setClassChoices(response.data.results))
        .catch(err => console.log(err))
    }, [])


    const pickClass = (chosenClassInfo) => {
        dndApi.getMoreInfo(chosenClassInfo.url)
        .then(data => {
            console.log(data.response)
            /*
                TODO: this is a good spot to format the data and send what ever we need to the global state
            */
        })
        .catch(err => console.log(err))
    }

    //note: having a form here is kind of useless but for the sake of being semantic
    return (
        <>
            <form>
                <p>Pick a Class: </p>
                {
                    classChoices.map((classContent) => 
                        <React.Fragment key={`${classContent.index}`}>
                            <label htmlFor="class">{classContent.name}</label>
                            <input 
                                type="radio" 
                                name="class"
                                id="class"
                                value={classContent.index}
                                onClick={() => pickClass(classContent)}
                            /><br/>
                        </React.Fragment>
                    )
                }
            </form>
        </>
    );
};

export default ClassForm;
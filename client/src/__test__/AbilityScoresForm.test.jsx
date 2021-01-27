import React, { useState as useStateMock } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import AbilityScoresForm from "../components/characterCreationForm/AbilityScoresForm";


// Upon test, character is undefined thus the destructuring of undefined is causing an error when testing.
//For now comment out just to verify that form is rendering properly.
describe("The AbilityScoresForm Component...", () => {
    test("will render without crashing", () => {
        const { baseElement } = render(<AbilityScoresForm />);
        expect(baseElement).toBeDefined();
    })
 
    test("will match snapshot",()=>{
        // renderer will give you a pure JS object you can turn in to JSON of the page the has rendered.
        const tree = renderer.create(<AbilityScoresForm />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
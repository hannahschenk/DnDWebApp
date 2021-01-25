import React, { useState as useStateMock } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import ClassForm from "../components/characterCreationForm/ClassForm";

describe("The AbilityScoresForm Component...", () => {
    test("will render without crashing", () => {
        const { baseElement } = render(<ClassForm />);
        expect(baseElement).toBeDefined();
    })
 
    test("will match snapshot",()=>{
        // renderer will give you a pure JS object you can turn in to JSON of the page the has rendered.
        const tree = renderer.create(<ClassForm />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
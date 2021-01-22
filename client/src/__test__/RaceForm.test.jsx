import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';
import RaceForm from "../components/characterCreationForm/RaceForm";

describe("The RaceForm Component...", () => {
    test("will match snapshot", () => {
        const tree = renderer.create(<RaceForm />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    test("will render without crashing", () => {
        const {baseElement} = render(<RaceForm/>);
        expect(baseElement).toBeTruthy();
    })
})

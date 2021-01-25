import {getRaces, getClasses, getBackgrounds, getLanguages, getClass, getMoreInfo, getStartingEquipment, getBackground} from '../utils/dnd5eApi.js';

jest.mock('../utils/dnd5eApi.js');

afterEach(jest.resetAllMocks)

describe('API call', ()=> {
    test("getRaces will successfully get called", async () => {
        await getRaces()
        expect(getRaces).toHaveBeenCalledTimes(1);
    })

    test('getClasses will successfully get called', async () => {
        await getClasses()
        expect(getClasses).toHaveBeenCalledTimes(1);
    })

    test('getClass will successfully get called', async () => {
        await getClass()
        expect(getClass).toHaveBeenCalledTimes(1);
    })

    test('getBackgrounds will successfully get called', async () => {
        await getBackgrounds()
        expect(getBackgrounds).toHaveBeenCalledTimes(1);
    })

    test('getMoreInfo will successfully get called', async () => {
        await getMoreInfo()
        expect(getMoreInfo).toHaveBeenCalledTimes(1);
    })

    test('getLanguages will successfully get called', async () => {
        await getLanguages()
        expect(getLanguages).toHaveBeenCalledTimes(1);
    })

    test('getStartingEquipment will successfully get called', async () => {
        await getStartingEquipment()
        expect(getStartingEquipment).toHaveBeenCalledTimes(1);
    })

    test('getBackground will successfully get called', async () => {
        await getBackground()
        expect(getBackground).toHaveBeenCalledTimes(1);
    })
});


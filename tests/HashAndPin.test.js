
const createPin = require('../usecase/shared/PinGenerator');
const createHash = require('../usecase/shared/HashGenerator');


test('Generated pin number is within range', () => {
    const min = 100000;
    const max = 999999;
    const randomNumber = createPin();
    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
});

test('Generated Hash has length 16',()=>{
        const hash = createHash(); 
        expect(hash).toHaveLength(16);
});
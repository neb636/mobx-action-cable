import dispatch from './dispatch';

let state, originalStateNumber, payloadNumber, mockMutator, addNumberAction, middlewareAPI;

beforeEach(() => {
    originalStateNumber = 3;
    payloadNumber = 2;
    state = { number: originalStateNumber };

    mockMutator = (payload) => (state) => {

        state.number = payload.number + state.number;
    };


    addNumberAction = {
        type: 'addNumber',
        payload: { number: payloadNumber },
        actionMutator: mockMutator
    };

    middlewareAPI = { getState: () => state };
});


test('executes the actionMutatorCorrectly', () => {

    dispatch(middlewareAPI)(addNumberAction);

    expect(state.number).toBe(payloadNumber + originalStateNumber)
});
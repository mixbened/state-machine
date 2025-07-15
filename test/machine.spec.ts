import { StateMachine } from "../lib/machine";

describe('state machine', () => {
    let machine: StateMachine;

    beforeAll(() => {
        machine = new StateMachine({
            stateTransititons: [
                {
                    event: 'pauseEvent',
                    current: 'off',
                    next: 'on'
                },
                {
                    event: 'pauseEvent',
                    current: 'on',
                    next: 'pause'
                }
            ],
            stateList: ['on', 'off', 'pause']
        })
    })

    it('should transition to pause, if machine is on', () => {
        machine.start('on');
        machine.executeTransition('pauseEvent');
        expect(machine.getCurrentState()).toBe('pause')
    });

    it('should transition to on, if machine is off', () => {
        machine.start('off');
        machine.executeTransition('pauseEvent');
        expect(machine.getCurrentState()).toBe('on')
    })
})
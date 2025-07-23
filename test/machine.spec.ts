import { StateMachine } from "../lib/machine";

describe('state machine', () => {
    let machine: StateMachine;

    beforeEach(() => {
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
    });
    
    afterEach(() => {
        machine.stop();
    });        

    it('should transition to pause, if machine is on', () => {
        machine.start('on');
        machine.executeTransition('pauseEvent');
        expect(machine.getCurrentState()).toBe('pause')
    });

    it('should transition to on, if machine is off', () => {
        machine.start('off');
        machine.executeTransition('pauseEvent');
        expect(machine.getCurrentState()).toBe('on')
    });

    it('should stop the machine', () => {
        machine.start('on');
        machine.stop();
        expect(machine.getCurrentState()).toBeUndefined();
    });
})
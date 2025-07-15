export declare class StateMachine {
    private readonly error;
    private currentState?;
    private readonly stateTransititons;
    private context?;
    private stateList;
    constructor(config: {
        stateTransititons: Transition[];
        stateList: string[];
        currentState?: string;
        context?: Record<string, any>;
    });
    static fromSerialized(json: string): StateMachine;
    start(initialState: string): StateMachine | string;
    getCurrentState(): string | undefined;
    executeTransition(event: string): string;
    private findTransition;
}
interface Transition {
    event: string;
    current: string;
    next: string;
    transitionAction: () => void;
}
export {};
//# sourceMappingURL=machine.d.ts.map
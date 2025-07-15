export class StateMachine {
  private readonly error: string = 'INVALID ACTION'
  private currentState?: string
  private readonly stateTransititons: Transition[];
  private context?: Record<string, any>;
  private stateList: string[];

  constructor(config: {
    stateTransititons: Transition[],
    stateList: string[],
    currentState?: string,
    context?: Record<string, any>,
  }) {
    this.currentState = config.currentState;
    this.stateTransititons = config.stateTransititons;
    this.stateList = config.stateList;
  }

  static fromSerialized(json: string): StateMachine {
    const obj = JSON.parse(json);
    return new StateMachine(obj.state);
  }

  public start(initialState: string): StateMachine | string {
    if (this.stateList?.includes(initialState)) {
      this.currentState = initialState;
      return this;
    }
    throw Error('State does not exist in state list.');
  }

  public stop(): void {
    this.currentState = undefined;
  }

  public getCurrentState() {
    return this.currentState;
  }

  public executeTransition(event: string): string {
    const foundTransition = this.findTransition(event);

     if (!foundTransition) return this.error;

     if (this.currentState !== foundTransition.current) return this.error;

     this.currentState = foundTransition.next;

     return this.currentState;
  }

  private findTransition(event: string): Transition | undefined {
      return this.stateTransititons.find(
        transition => transition.event === event && transition.current === this.currentState
      ) 
  }

}

export interface Transition {
  event: string,
  current: string,
  next: string,
  transitionAction?: () => void
}
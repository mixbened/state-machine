"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = void 0;
class StateMachine {
    constructor(config) {
        this.error = 'INVALID ACTION';
        this.currentState = config.currentState;
        this.stateTransititons = config.stateTransititons;
        this.stateList = config.stateList;
    }
    static fromSerialized(json) {
        const obj = JSON.parse(json);
        return new StateMachine(obj.state);
    }
    start(initialState) {
        var _a;
        if ((_a = this.stateList) === null || _a === void 0 ? void 0 : _a.includes(initialState)) {
            this.currentState = undefined;
            return this;
        }
        return this.error;
    }
    getCurrentState() {
        return this.currentState;
    }
    executeTransition(event) {
        const foundTransition = this.findTransition(event);
        if (!foundTransition)
            return this.error;
        if (this.currentState !== foundTransition.current)
            return this.error;
        this.currentState = foundTransition.next;
        return this.currentState;
    }
    findTransition(event) {
        return this.stateTransititons.filter(transition => transition.event === event)[0];
    }
}
exports.StateMachine = StateMachine;

import {createNode, Node} from "flowcode";
import Timer = NodeJS.Timer;

export type In = {
  /** Whether the ticker is ticking. */
  st_ticking: boolean;
};

export type Out = {
  /** Tick signal. */
  ev_tick: any;
};

/**
 * Emits a signal at predefined intervals when ticking.
 * @link https://github.com/kwaia/flowcode.js/wiki/Ticker
 */
export type Ticker = Node<In, Out>;

/**
 * Creates a Ticker node.
 * @param ms Number of milliseconds between ticks.
 * @param ticking Whether the ticker is ticking initially.
 */
export function createTicker(ms: number, ticking: boolean = false): Ticker {
  return createNode<In, Out>(["ev_tick"], (outputs) => {
    let timer: Timer;
    if (ticking) {
      timer = setInterval(outputs.ev_tick, ms);
    }
    return {
      st_ticking: (value) => {
        if (!ticking && value) {
          timer = setInterval(outputs.ev_tick, ms);
          ticking = true;
        } else if (ticking && !value) {
          clearInterval(timer);
          ticking = false;
        }
      }
    };
  });
}

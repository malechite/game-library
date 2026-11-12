import { Button, Icon } from "@game-library/cinder";
import { caption, startButton } from "./roulette.css";

export interface RouletteStartProps {
  /** Games the spin can land on. */
  remaining: number;
  /** Called when the spin button is pressed. */
  onSpin: () => void;
}

/** The roulette at rest: one big button and the size of the pool behind it. */
export const RouletteStart = ({ remaining, onSpin }: RouletteStartProps) => (
  <>
    <Button className={startButton} onClick={onSpin}>
      {/* Not the `icon` prop: that renders at the button's stock label size. */}
      <Icon type="Shuffle" size={1.5} weight="bold" />
      Spin
    </Button>
    <span className={caption}>
      {remaining.toLocaleString()} {remaining === 1 ? "game" : "games"} in the pool
    </span>
  </>
);

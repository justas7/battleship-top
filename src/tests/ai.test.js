import Ai from '../modules/ai';
import Player from '../modules/player';

describe('Ai class', () => {
  let ai;
  beforeEach(() => {
    ai = new Ai([1, 2], false);
  });
  test('ai instace of player', () => {
    expect(new Ai([1, 2], false)).toBeInstanceOf(Player);
  });

  test('create new player', () => {
    expect(ai.getGameboard() && ai.isMyTurn()).toBeFalsy();
  });
  test('toggle turn', () => {
    expect(ai.toggleMyTurn()).toBeTruthy();
    expect(ai.toggleMyTurn()).toBeFalsy();
  });
});

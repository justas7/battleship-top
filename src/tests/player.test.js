import Player from '../modules/player';

describe('Player class', () => {
  let p1;
  beforeEach(() => {
    p1 = new Player([1, 2], true);
  });

  test('create new player', () => {
    expect(p1.getGameboard() && p1.isMyTurn()).toBeTruthy();
  });
  test('toggle turn', () => {
    expect(p1.toggleMyTurn()).toBeFalsy();
    expect(p1.toggleMyTurn()).toBeTruthy();
  });

  test.todo('player should be able to shoot');
});

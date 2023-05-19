import dbLoader from '../../../src/main/loaders/db-loader.js';
import GameDatabase from '../../../src/data-access/database/game-database.js';
import GameRepository from '../../../src/data-access/repositories/game-repository.js';

describe('Game Mongo Repository', () => {
  let connection = null;
  let gameCollection = null;

  beforeAll(async () => {
    // Get mongodb memory server url from env
    connection = await dbLoader(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    gameCollection = new GameDatabase();
    await gameCollection.deleteMany({});
  });

  const makeSut = () => {
    return new GameRepository(gameCollection);
  };

  test('Should return a game on success', async () => {
    const sut = makeSut();
    const game = await sut.create({
      title: 'Game test title',
      rating: 4.2,
      summary: 'Game test summary',
    });

    expect(game).toBeTruthy();
    expect(game.id).toBeTruthy();
    expect(game.title).toBe('Game test title');
    expect(game.rating).toBe(4.2);
    expect(game.summary).toBe('Game test summary');
  });

  test('Should update a game on success', async () => {
    const sut = makeSut();
    const game = await sut.create({
      title: 'Game test title',
      rating: 4.2,
      summary: 'Game test summary',
    });
    const updatedGame = await sut.updateById(game.id, {
      title: 'Updated game title',
      rating: 4.3,
      summary: 'Updated game summary',
    });

    expect(updatedGame).toBeTruthy();
    expect(updatedGame.id).toBeTruthy();
    expect(updatedGame.title).toBe('Updated game title');
    expect(updatedGame.rating).toBe(4.3);
    expect(updatedGame.summary).toBe('Updated game summary');
  });
});

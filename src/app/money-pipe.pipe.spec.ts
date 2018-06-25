import { MoneyPipePipe } from './money-pipe.pipe';

describe('MoneyPipePipe', () => {
  it('create an instance', () => {
    const pipe = new MoneyPipePipe();
    expect(pipe).toBeTruthy();
  });
});

import { DeclaracionAnualModule } from './declaracion-anual.module';

describe('DeclaracionAnualModule', () => {
  let declaracionAnualModule: DeclaracionAnualModule;

  beforeEach(() => {
    declaracionAnualModule = new DeclaracionAnualModule();
  });

  it('should create an instance', () => {
    expect(declaracionAnualModule).toBeTruthy();
  });
});

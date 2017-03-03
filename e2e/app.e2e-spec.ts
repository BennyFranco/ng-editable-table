import { Ng2TemplatePage } from './app.po';

describe('ng2-template App', function() {
  let page: Ng2TemplatePage;

  beforeEach(() => {
    page = new Ng2TemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

// setup
import { setup, Context, Actor, Movie } from '../../setup';

// models
import { ItemResponses, FieldModels, TypeResponses } from '../../../lib';

// tests
describe('Live type', () => {

  var context = new Context();
  setup(context);

  var codename: string = 'movie';
  var response: TypeResponses.DeliveryTypeResponse;

  var multipleChoiceElement: string = 'category';
  var taxonomyElement: string = 'releasecategory';

  beforeAll((done) => {
    context.deliveryClient.type(codename)
      .get()
      .subscribe(r => {
        response = r as TypeResponses.DeliveryTypeResponse;
        done();
      });
  });

  it(`type should be defined`, () => {
    expect(response).toBeDefined();
  });

  it(`elements should be defined`, () => {
    expect(response.type.elements).toBeDefined();
  });

  it(`system properties should be defined`, () => {
    expect(response.type.system).toBeDefined();
  });

  it(`proper type should be returned based on test config`, () => {
    expect(response.type.system.codename).toEqual(codename);
  });
 
  it(`Verifies taxonomy element - '${taxonomyElement}'`, () => {
    var releaseCategoryElement = response.type.elements.find(m => m.codename === taxonomyElement);

    expect(releaseCategoryElement).toBeDefined();
    expect(releaseCategoryElement.taxonomyGroup).toBeDefined();
    expect(releaseCategoryElement.taxonomyGroup).toEqual('releasecategory');
  });

  it(`Verifies multiple_choice element - '${multipleChoiceElement}'`, () => {
    var categoryElement = response.type.elements.find(m => m.codename === multipleChoiceElement);

    expect(categoryElement).toBeDefined();
    expect(categoryElement.options).toBeDefined();
    expect(categoryElement.options.length).toBeGreaterThan(0);
    expect(categoryElement.options[0].codename).toBeDefined();
    expect(categoryElement.options[0].name).toBeDefined();
  });

});


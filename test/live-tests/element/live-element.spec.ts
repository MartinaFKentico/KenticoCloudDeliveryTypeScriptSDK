// setup
import { setup, Context } from '../../setup';

// models
import { FieldModels, ElementResponses } from '../../../lib';

// tests
describe('Live element', () => {

  var context = new Context();
  setup(context);

  var typeCodename: string = 'movie';

  var textElementCodename: string = 'title';
  var multipleChoiceElementCodename: string = 'category';
  var taxonomyElementCodename: string = 'releasecategory';

  var textElementResponse: ElementResponses.ElementResponse;
  var multipleChoiceElementResponse: ElementResponses.ElementResponse;
  var taxonomyElementResponse: ElementResponses.ElementResponse;


  beforeAll((done) => {
    context.deliveryClient.element(typeCodename, textElementCodename)
      .get()
      .map(r => textElementResponse = r as ElementResponses.ElementResponse)
      .flatMap(() => context.deliveryClient.element(typeCodename, multipleChoiceElementCodename).get())
      .map(r => multipleChoiceElementResponse = r as ElementResponses.ElementResponse)
      .flatMap(() => context.deliveryClient.element(typeCodename, taxonomyElementCodename).get())
      .map(r => taxonomyElementResponse = r as ElementResponses.ElementResponse)
      .subscribe(() => {
        done();
      })
  });

  it(`element responses should be defined`, () => {
    expect(textElementResponse).toBeDefined();
    expect(multipleChoiceElementResponse).toBeDefined();
    expect(taxonomyElementResponse).toBeDefined();
  });

  it(`element inside responses should be defined`, () => {
    expect(textElementResponse.element).toBeDefined();
    expect(multipleChoiceElementResponse.element).toBeDefined();
    expect(taxonomyElementResponse.element).toBeDefined();
  });

  it(`element taxonomy field should contain valid taxonomy group property`, () => {
    expect(taxonomyElementResponse.element.taxonomyGroup).toBeDefined();
    expect(taxonomyElementResponse.element.taxonomyGroup).toEqual(jasmine.any(String));
  });

  it(`multiple choice field should contain options`, () => {
    expect(multipleChoiceElementResponse.element.options).toBeDefined();
    expect(multipleChoiceElementResponse.element.options.length).toBeGreaterThan(0);
  });

  it(`element field should have all required properties defined`, () => {
    expect(textElementResponse.element.codename).toBeDefined();
    expect(textElementResponse.element.name).toBeDefined();
    expect(textElementResponse.element.type).toBeDefined();
  });

});


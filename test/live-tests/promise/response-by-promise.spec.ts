// setup
import { setup, Context, Movie } from '../../setup';

// models
import { FieldModels, ItemResponses } from '../../../lib';

// tests
describe('Response with Promises', () => {

  const context = new Context();
  setup(context);

  let response: ItemResponses.DeliveryItemListingResponse<Movie>;

  beforeAll((done) => {
    context.deliveryClient.items<Movie>()
      .getPromise()
      .then(xResponse => {
        response = xResponse;
        done();
      })
  });

  it(`Response items should be retrieved and mapped just like with Promise`, () => {
    expect(response).toEqual(jasmine.any(ItemResponses.DeliveryItemListingResponse));
  });
});


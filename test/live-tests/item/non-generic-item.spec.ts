// setup
import { setup, Context, Actor, Movie } from '../../setup';

// models
import { ItemResponses, FieldModels, IContentItem, ContentItem, ContentItemSystemAttributes } from '../../../lib';


// dev tests
describe('Non generic item tests', () => {

    const context = new Context();
    // remove type resolvers for testing
    context.typeResolvers = [];
    setup(context);

    const movieCodename: string = 'warrior';
    let response: ItemResponses.DeliveryItemResponse<ContentItem>;

    beforeAll((done) => {
        context.deliveryClient.item<ContentItem>(movieCodename)
            .get()
            .subscribe(r => {
                response = r;
                done();
            })
    });

    it(`ContentItem should be returned if `, () => {
        expect(response.item).toEqual(jasmine.any(ContentItem));
    });

    it(`ContentItem should contain typed properties even though they are not defined as properties in class`, () => {
        expect(response.item['title'].text.toLowerCase()).toEqual('warrior');
    });

    it(`System attributes property should be set`, () => {
        expect(response.item.system).toEqual(jasmine.any(ContentItemSystemAttributes));
    });

});


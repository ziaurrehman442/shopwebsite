// third-party
import queryString from 'query-string';
import { GetServerSidePropsContext } from 'next';
import { Store } from 'redux';
// application
import { AppDispatch } from '~/store/types';
import { IFilterValues, IListOptions } from '~/interfaces/list';
import { IRootState } from '~/store/root/rootTypes';
import { shopInitThunk } from '~/store/shop/shopActions';

export function parseQueryOptions(query: string) {
    const queryObject = queryString.parse(query);
    const optionValues: IListOptions = {};

    if (typeof queryObject.limit === 'string') {
        optionValues.limit = parseFloat(queryObject.limit);
    }
    if (typeof queryObject.sort === 'string') {
        optionValues.sort = queryObject.sort;
    }

    // Page based navigation
    if (typeof queryObject.page === 'string') {
        optionValues.page = parseFloat(queryObject.page);
    }

    // Cursor based navigation
    if (typeof queryObject.after === 'string') {
        optionValues.after = queryObject.after;
    } else if (typeof queryObject.before === 'string') {
        optionValues.before = queryObject.before;
    }

    return optionValues;
}

export function parseQueryFilters(query: string) {
    const queryObject = queryString.parse(query);
    const filterValues: IFilterValues = {};

    Object.keys(queryObject).forEach((param) => {
        const value = queryObject[param];
        const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/);

        if (!mr || typeof value !== 'string') {
            return;
        }

        const filterSlug = mr[1];

        filterValues[filterSlug] = value;
    });

    return filterValues;
}

export function buildQuery(options: IListOptions, filters: IFilterValues, defaults: { [key: string]: any } = {}) {
    const params: { [key: string]: any } = defaults;

    if (options.limit !== 12) {
        params.limit = options.limit;
    }
    if (options.sort !== 'default') {
        params.sort = options.sort;
    }

    // Page based navigation
    if (options.page !== 1) {
        params.page = options.page;
    }

    // Cursor based navigation
    if (options.after) {
        params.after = options.after;
    } else if (options.before) {
        params.before = options.before;
    }

    Object.keys(filters).filter((x) => x !== 'category' && !!filters[x]).forEach((filterSlug) => {
        params[`filter_${filterSlug}`] = filters[filterSlug];
    });

    return queryString.stringify(params, { encode: false });
}

export default async function getShopPageData(
    store: Store<IRootState>,
    context: GetServerSidePropsContext,
    slug?: string,
): Promise<void> {
    const categorySlug = slug || (typeof context.params?.slug === 'string' ? context.params.slug : null);

    if (typeof context.req.url === 'string') {
        const query = queryString.stringify(queryString.parseUrl(context.req.url).query);
        const options = parseQueryOptions(query);
        const filters = parseQueryFilters(query);
        const dispatch = store.dispatch as AppDispatch;

        await dispatch(shopInitThunk(categorySlug, options, filters));
    }
}

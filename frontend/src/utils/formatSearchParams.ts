import {IFormattedSearchParams, Platform, Genre, Sort} from '../types';

function formatSearchParams(searchParams: readonly Platform[] | readonly Genre[] | readonly Sort[]): IFormattedSearchParams[] {
    return searchParams.map(item => {
      return {
        value: item,
        label: item
      }
    });
}

export default formatSearchParams;
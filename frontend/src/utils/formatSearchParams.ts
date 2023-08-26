import {IFormattedSearchParams, Platform, Genre, Sort} from '../types';

function formatSearchParams(searchParams: Platform[] | Genre[] | Sort[]): IFormattedSearchParams[] {
    return searchParams.map(item => {
      return {
        value: item,
        label: item
      }
    });
}

export default formatSearchParams;
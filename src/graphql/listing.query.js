import gql from 'graphql-tag';

import { LISTING_FRAGMENT, LISTING_FRAGMENT_MIN } from './listing.fragment';

export const LISTING_QUERY = gql`
  query listing($id: ID!, $passport: Passport) {
    listing(id: $id, passport: $passport) {
      ... ListingFragment
    }
  }
  ${LISTING_FRAGMENT}
`;

export const ALL_LISTINGS_QUERY = gql`
  query {
    allListings {
      ... ListingFragmentMin
    }
  }
  ${LISTING_FRAGMENT_MIN}
`;

export const SEARCH_LISTINGS_QUERY = gql`
  query searchListings($pagination: InputPagination!, $searchArea: InputSearchArea, $term: String,
                       $tagsIds: [ID], $priceOptionIds: [ID], $minPrice: Int, $maxPrice: Int,
                       $shippingOptionIds: [ID], $publishedStateIds: [ID], $resultOrder: InputResultOrder,
                       $storeId: ID, $passport: Passport) {
    searchListings(pagination: $pagination, searchArea: $searchArea, term: $term,
                  tagIds: $tagsIds, priceOptionIds: $priceOptionIds, minPrice: $minPrice, maxPrice: $maxPrice,
                  shippingOptionIds: $shippingOptionIds, publishedStateIds: $publishedStateIds, resultOrder: $resultOrder,
                  storeId: $storeId, passport: $passport) {
      pagination {
        total
      },
      records {
        ... ListingFragmentMin
      }
    }
  }
  ${LISTING_FRAGMENT_MIN}
`;

export const FAVORITED_LISTINGS_QUERY = gql`
  query user($id: ID!, $passport: Passport!){
    user(id: $id, passport: $passport) {
      favorited {
        ...on Listing {
          ... ListingFragmentMin
        }
      }
    }
  }
  ${LISTING_FRAGMENT_MIN}
`;

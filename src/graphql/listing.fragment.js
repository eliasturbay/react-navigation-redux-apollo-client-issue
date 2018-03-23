import gql from 'graphql-tag';

export const LISTING_FRAGMENT_MIN = gql`
  fragment ListingFragmentMin on Listing {
    id
    title
    price
    priceOption {
      id
      name
    }
    shippingOptions {
      id
    }
    images {
      url
      dimensions
    }
    location {
      lat
      lng
    }
    store {
      id
      name
      location {
        lat
        lng
      }
    }
    publishedStateId
    closedReason {
      id
      name
    }
  }
`;

export const LISTING_FRAGMENT = gql`
  fragment ListingFragment on Listing {
    id
    insertedAt
    title
    body
    tags {
      id
      name
    }
    location {
      lat
      lng
    }
    locationPrivacy
    price
    priceOption {
      id
      name
    }
    shippingOptions {
      id
      name
    }
    shippingDetails
    images {
      id
      url
    }
    publishedState {
      id
      name
    }
    store {
      id
      name
      owner {
        userId
        picture
      }
      location {
        lat
        lng
      }
      image {
        url
      }
    }
    currentThread {
      id
    }
    closedReason {
      id
      name
    }
  }
`;

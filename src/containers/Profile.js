import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import update from 'immutability-helper';

import { SEARCH_LISTINGS_QUERY } from '../graphql/listing.query';
import ProfileScreen from '../components/ProfileScreen';

const config = {
  options: ownProps => ({
    variables: {
      pagination: {
        offset: 0,
        pageSize: 10
      },
      publishedStateIds: ['PUBLISHED'],
      resultOrder: {
        order: 'desc',
        sortBy: 'insertedAt'
      }
    }
  }),
  props: ({
    data: {
      loading, networkStatus, refetch, error, searchListings, fetchMore
    }
  }) => ({
    loading,
    networkStatus,
    refetch,
    error,
    searchListings,
    loadMoreEntries() {
      return fetchMore({
        variables: {
          pagination: {
            offset: searchListings.records.length,
            pageSize: 10
          }
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) { return previousResult; }

          // push results
          return update(previousResult, {
            searchListings: {
              records: { $push: fetchMoreResult.searchListings.records }
            }
          });
        }
      });
    }
  })
};

export default connect(
  state => ({
    isLoggedIn: state.auth.isLoggedIn
  })
)(compose(
  graphql(SEARCH_LISTINGS_QUERY, config)
)(ProfileScreen));

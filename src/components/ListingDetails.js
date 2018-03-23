import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { LISTING_QUERY } from '../graphql/listing.query'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class ListingDetails extends React.Component {
  render() {
    if (this.props.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
          <Text>
            Loading listing id: {this.props.navigation.state.params.listingId}
          </Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text>
          `Listing id: ${this.props.navigation.state.params.listingId}\nTitle: ${this.props.listing.title}` 
        </Text>
      </View>
    );
  }
}

ListingDetails.navigationOptions = {
  title: 'Listing Details',
};

ListingDetails.propTypes = {
  navigation: PropTypes.object.isRequired
};

ListingDetails.defaultProps = {
};

const config = {
  options: ownProps => ({
    variables: {
      id: ownProps.navigation.state.params.listingId
    }
  }),
  props: ({
    data: {
      loading, networkStatus, refetch, error, listing
    }
  }) => ({
    loading,
    networkStatus,
    refetch,
    error,
    listing
  })
};

export default connect(
  state => ({
    isLoggedIn: state.auth.isLoggedIn
  })
)(compose(
  graphql(LISTING_QUERY, config)
)(ListingDetails));

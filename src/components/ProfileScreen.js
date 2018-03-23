import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import { ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list: {
    flex: 1,
    width: Dimensions.get('window').width
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.openListingDetails = this.openListingDetails.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchListings) {
      this.setState({ isLoading: false });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.searchListings === null) {
      console.log('nextProps.searchListings === null !!!!');
    }
    return true;
  }

  openListingDetails(id) {
    console.log('openListingDetails: ' + id);
    this.props.navigation.navigate('ListingDetails', { listingId: id });
  }

  onEndReached() {
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
      const { records, pagination } = this.props.searchListings;
      if (records.length < pagination.total) {
        this.props.loadMoreEntries();
      }
    }
  }

  onRefresh() {
    this.props.refetch();
  }

  renderItem({ item, index }) {
    return (
      <ListItem
        key={item.id}
        title={item.title}
        onPress={() => {
          console.log('ListItem onPress: ' + item.id);
          this.openListingDetails(item.id);
        }}
      />
    );
  }

  render() {
    if (this.props.loading) {
      return (
        <ActivityIndicator animating={true} />
      )
    }
    return (
      <View style={styles.container}>
        <Button
          title="Open Details"
          onPress={() => {
            this.props.navigation.navigate('ListingDetails', { listingId: this.props.searchListings.records[0].id });
          }}
        />
        <FlatList
          style={styles.list}
          data={this.props.searchListings.records}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
          refreshing={this.props.networkStatus === 4}
        />
        <Text style={styles.welcome}>
          Listing count: { this.props.searchListings.records.length }
        </Text>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: 'Listings',
};

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object, //eslint-disable-line
  networkStatus: PropTypes.number,
  refetch: PropTypes.func,
  loadMoreEntries: PropTypes.func,
  searchListings: PropTypes.shape({
    records: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        priceOption: PropTypes.shape({
          name: PropTypes.string.isRequired
        }),
        price: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string
          })
        ).isRequired,
        store: PropTypes.shape({
          name: PropTypes.string
        })
      })
    )
  })
};

ProfileScreen.defaultProps = {
  isLoggedIn: false,
  loading: true,
  error: null,
  networkStatus: 0,
  refetch: null,
  searchListings: null
};

export default ProfileScreen;

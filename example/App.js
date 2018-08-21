import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import DeviceInfo from 'react-native-device-info';
import DatePicker from 'react-native-date-picker-x';
import locales from './locales';
import examples from './examples';

export default class App extends Component {

  state = {
    picker: undefined,
    backgroundColor: undefined,
  }

  render() {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: this.state.backgroundColor }]}
        contentContainerStyle={styles.content}>
        <Text style={styles.header}>Examples</Text>
        {!this.state.picker && this.renderButtons()}
        {!!this.state.picker && this.renderBackButton()}
        {!!this.state.picker && this.renderPicker()}
      </ScrollView>
    );
  }

  setBackgroundColor = backgroundColor => this.setState({ backgroundColor })

  renderPicker = () => {
    const Picker = examples[this.state.picker].component;
    return <Picker backgroundColor={this.state.backgroundColor} setBackground={this.setBackgroundColor} />
  }

  renderButtons = () =>
    Object.keys(examples)
      .filter(key => key !== this.state.picker)
      .map(this.renderButton)

  renderButton = (key) => (
    <TouchableOpacity
      key={key}
      onPress={() => this.setState({ picker: key })}
      style={{ margin: 10 }}
    >
      <Text style={styles.text}>{examples[key].buttonTitle}</Text>
    </TouchableOpacity>
  )

  renderBackButton = (key) => (
    <TouchableOpacity
      onPress={() => this.setState({ picker: undefined })}
      style={{ margin: 10 }}
    >
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#abcdef',
    marginTop: 15,
  },
  content: {
    alignItems: 'center',
  },
  text: {
    color: 'dodgerblue',
    fontSize: 16,
  },
  header: {
    color: 'black',
    fontSize: 22,
    margin: 20,
  }
})

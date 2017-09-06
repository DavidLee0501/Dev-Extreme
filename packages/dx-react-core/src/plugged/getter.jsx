import React from 'react';
import PropTypes from 'prop-types';
import {
  isTrackedDependenciesChanged,
  getAvaliableGetters,
  getAvaliableActions,
} from '../utils/plugin-helpers';

export const UPDATE_CONNECTION = 'updateConnection';

export class Getter extends React.PureComponent {
  componentWillMount() {
    const { pluginHost } = this.context;
    const { name } = this.props;

    let lastComputed;
    let lastTrackedDependencies = {};
    let lastResult;

    this.plugin = {
      position: () => this.props.position(),
      [`${name}Getter`]: (original) => {
        const { value, computed } = this.props;
        if (value !== undefined) return value;

        const getGetterValue = getterName => ((getterName === name)
          ? original
          : pluginHost.get(`${getterName}Getter`, this.plugin));

        if (computed === lastComputed &&
          !isTrackedDependenciesChanged(pluginHost, lastTrackedDependencies, getGetterValue)) {
          return lastResult;
        }

        const { getters, trackedDependencies } = getAvaliableGetters(pluginHost, getGetterValue);
        const actions = getAvaliableActions(pluginHost);

        lastComputed = computed;
        lastTrackedDependencies = trackedDependencies;
        lastResult = computed(getters, actions);
        return lastResult;
      },
    };

    pluginHost.registerPlugin(this.plugin);
  }
  componentDidUpdate() {
    const { pluginHost } = this.context;

    pluginHost.broadcast(UPDATE_CONNECTION);
  }
  componentWillUnmount() {
    const { pluginHost } = this.context;

    pluginHost.unregisterPlugin(this.plugin);
  }
  render() {
    return null;
  }
}

Getter.propTypes = {
  position: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  computed: PropTypes.func,
};

Getter.defaultProps = {
  value: undefined,
  computed: null,
  position: null,
};

Getter.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
};

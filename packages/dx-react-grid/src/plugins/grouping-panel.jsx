import React from 'react';
import PropTypes from 'prop-types';

import { Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';
import { groupingPanelItems } from '@devexpress/dx-grid-core';

export class GroupingPanel extends React.PureComponent {
  render() {
    const {
      groupPanelTemplate,
      allowSorting,
      allowDragging,
      allowUngroupingByClick,
    } = this.props;

    return (
      <PluginContainer
        pluginName="GroupingPanel"
        dependencies={[
          { pluginName: 'GroupingState' },
          { pluginName: 'SortingState', optional: !allowSorting },
        ]}
      >
        <Template
          name="header"
          connectGetters={getter => ({
            columns: getter('columns'),
            grouping: getter('draftGrouping'),
            sorting: getter('sorting'),
            sortingScope: getter('draftGrouping').map(columnGrouping => columnGrouping.columnName),
          })}
          connectActions={action => ({
            groupByColumn: action('groupByColumn'),
            changeSortingDirection: ({ columnName, keepOther, cancel, scope }) =>
              action('setColumnSorting')({ columnName, keepOther, cancel, scope }),
            draftGroupingChange: groupingChange => action('draftGroupingChange')(groupingChange),
            cancelGroupingChange: () => action('cancelGroupingChange')(),
          })}
        >
          {({
            columns,
            grouping,
            changeSortingDirection,
            sortingScope,
            ...restParams
            }) => (
              <div>
                {groupPanelTemplate({
                  changeSortingDirection: params => changeSortingDirection({
                    ...params,
                    scope: sortingScope,
                  }),
                  allowSorting,
                  allowDragging,
                  allowUngroupingByClick,
                  groupingPanelItems: groupingPanelItems(columns, grouping),
                  ...restParams,
                })}
                <TemplatePlaceholder />
              </div>
            )}
        </Template>
      </PluginContainer>
    );
  }
}

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  allowDragging: PropTypes.bool,
  allowUngroupingByClick: PropTypes.bool,
  groupPanelTemplate: PropTypes.func.isRequired,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  allowDragging: false,
  allowUngroupingByClick: false,
};

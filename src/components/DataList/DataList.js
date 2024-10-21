import './DataList.scss';
import find from 'lodash/find';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import orderBy from 'lodash/orderBy';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import * as utils from '../../utils/common';
import uuid from '../../utils/uuid';
import Checkbox from '../Checkbox';
import { ErrorMessage, NoData, Pending } from './Boxes';
import Header from './Header';
import Link from './Link';
import Paginator from './Paginator';
import Rows from './Rows';

class DataList extends PureComponent {
  static getCheckedItems(list, checked) {
    if (typeof checked === 'function') {
      return list.filter(checked);
    } else if (Array.isArray(checked)) {
      return checked;
    }
    return undefined;
  }

  static isItemChecked(item) {
    return item._checked === true;
  }

  static isCheckable(checkable, item) {
    return typeof checkable !== 'function' || checkable(item._source);
  }

  static getSelectedItems(list, selected) {
    if (typeof selected === 'function') {
      return list.filter(selected);
    } else if (Array.isArray(selected)) {
      return selected;
    } else if (typeof selected === 'object') {
      return [selected];
    }
    return undefined;
  }

  static convertColumns(columns, prevColumns = [], onCheck) {
    const tpmColumns = [];
    let translateIndex = 0;

    if (prevColumns.some(col => col._onChange)) {
      translateIndex = 1;
    }

    if (typeof onCheck === 'function') {
      tpmColumns.push({
        _index: '_checkbox_column',
        _onChange: onCheck,
      });
      translateIndex = 1;
    }

    columns.forEach((column, i) => {
      tpmColumns.push(
        Object.assign(
          {
            _index: get(prevColumns, `[${i + translateIndex}]._index`) || uuid(),
          },
          column
        )
      );
    });

    return tpmColumns;
  }

  static toItems(list, columns, selected, checked, checkable, prevItems, prevList = []) {
    const reduceColumns = (row, _rowIndex, _position) => (prev, column) => {
      const { func, key, link, _index, _onChange } = column;
      const originalValue = get(row._source, key);
      let value = originalValue;
      let component = null;

      if (typeof func === 'function') {
        value = func(value, row._source, _position);
      }

      if (typeof link === 'function') {
        component = <Link onClick={() => link(row._source[key], row._source)}>{value}</Link>;
      } else if (_onChange && DataList.isCheckable(checkable, row)) {
        component = <Checkbox onChange={() => _onChange(_rowIndex)} round />;
      }

      const isTextContent = typeof value === 'string' || typeof value === 'number';

      return Object.assign({}, prev, {
        [_index]: {
          originalValue,
          value: isTextContent ? value : null,
          component,
        },
      });
    };

    return list.map((item, _position) => {
      const prevRow = isEqual(item, prevList[_position])
        ? find(prevItems, { _position })
        : {
          _position,
          _index: uuid(),
          _source: item,
          _visible: true,
        };

      prevRow._selected = selected
        ? selected.some(select => isEqual(select, item))
        : get(prevItems, `[${_position}]._selected`);
      prevRow._checked = checked
        ? checked.some(check => isEqual(check, item))
        : get(prevItems, `[${_position}]._checked`);
      prevRow.data = columns.reduce(reduceColumns(prevRow, prevRow._index, _position), {});

      return prevRow;
    });
  }

  static filterItems(items, columns, filters) {
    const filtersByKey = filters.filter(item => item.value !== '');
    return items.map(item => ({
      ...item,
      _visible: filtersByKey.every(filter => {
        const { _index, value } = filter;
        const cell = get(item.data[_index], 'value');
        return typeof cell === 'string' ? cell.toLowerCase().includes(value.toLowerCase()) : false;
      }),
    }));
  }

  static sortItems(items, asc, _index) {
    const getContentAtIndex = key => item => {
      const value = get(item.data[key], 'value');
      return value === null ? get(item.data[key], 'originalValue') : value;
    };
    return orderBy(items, getContentAtIndex(_index), asc ? 'asc' : 'desc');
  }

  static getSortColumn(label, columns) {
    let sortColumn;
    columns.some(column => {
      if (!column._onChange && column.sortable !== false) {
        sortColumn = column._index;
        return true;
      }
      return false;
    });

    if (label !== undefined) {
      const columnByLabel = find(
        columns,
        column => column.label === label && column.sortable !== false
      );
      sortColumn = get(columnByLabel, '_index');
    }
    return sortColumn;
  }

  static getFilters(filters, _index, value) {
    const filter = find(filters, { _index });
    if (!filter) {
      return [...filters, { _index, value: value || '' }];
    }

    if (value !== undefined) {
      const index = filters.indexOf(filter);
      return [...filters.slice(0, index), { _index, value }, ...filters.slice(index + 1)];
    }

    if (filter.value === '') {
      const index = filters.indexOf(filter);
      return [...filters.slice(0, index), ...filters.slice(index + 1)];
    }
    return filters;
  }

  static getAmountOfPages(pageSize, items) {
    return Math.ceil(items.length / pageSize);
  }

  static getVisibleItems(items) {
    return items.filter(item => item._visible);
  }

  constructor(props) {
    super(props);

    const {
      columns,
      checked,
      list,
      selected,
      sortAsc = true,
      sortColumn,
      onCheck,
      pageSize,
      checkable,
    } = props;

    this._pageSize = pageSize;
    this._columns = DataList.convertColumns(columns, [], onCheck ? this.onItemCheck : undefined);

    const checkedItems = checked && DataList.getCheckedItems(list, checked);
    const selectedItems = selected && DataList.getSelectedItems(list, selected);

    const items = DataList.toItems(list, this._columns, selectedItems, checkedItems, checkable);

    this.state = {
      items: DataList.sortItems(items, sortAsc, DataList.getSortColumn(sortColumn, this._columns)),
      sortAsc,
      sortColumn: DataList.getSortColumn(sortColumn, this._columns),
      filters: [],
      selectedPage: 1,
    };

    this.bindMethods();
  }

  bindMethods() {
    this.onSortClick = this.onSortClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onFilterBlur = this.onFilterBlur.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onHeaderCheckboxChange = this.onHeaderCheckboxChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onItemCheck = this.onItemCheck.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { list, columns, selected, checked, checkable, onCheck, filters } = this.props;
    const { sortAsc, sortColumn } = this.state;
    const didColumnsChange = prevProps.columns !== columns;
    const didListChange = prevProps.list !== list;

    if (didColumnsChange || prevProps.onCheck !== onCheck) {
      this._columns = DataList.convertColumns(
        columns,
        this._columns,
        onCheck ? this.onItemCheck : undefined
      );
    }

    if (
      didColumnsChange ||
      didListChange ||
      prevProps.checked !== checked ||
      prevProps.selected !== selected ||
      prevProps.filters !== filters
    ) {
      const checkedItems = DataList.getCheckedItems(list, checked);
      const selectedItems = DataList.getSelectedItems(list, selected);
      const items = DataList.toItems(list, this._columns, selectedItems, checkedItems, checkable);

      const filteredItems = DataList.filterItems(
        items,
        this._columns,
        filters || this.state.filters
      );
      this.setState({
        items: DataList.sortItems(filteredItems, sortAsc, sortColumn),
        filters: filters || this.state.filters,
      });
    }
  }

  onSortClick(sortColumn) {
    const { sortAsc } = this.state;
    const items = DataList.sortItems(this.state.items, !sortAsc, sortColumn);

    this.setState({ sortAsc: !sortAsc, sortColumn, items });
  }

  onFilterChange(_index, value) {
    const { filters, items } = this.state;
    const updatedFilters = DataList.getFilters(filters, _index, value);
    const updatedItems = DataList.filterItems(items, this._columns, updatedFilters);

    this.setState(
      {
        items: updatedItems,
        filters: updatedFilters,
        selectedPage: 1,
      },
      () => {
        const { onFilter } = this.props;
        if (onFilter) {
          onFilter({
            items: DataList.getVisibleItems(updatedItems).map(i => i._source),
            filters: updatedFilters,
          });
        }
      }
    );
  }

  onFilterBlur(_index) {
    const { filters } = this.state;
    const updatedFilters = DataList.getFilters(filters, _index);
    this.setState({ filters: updatedFilters });
  }

  onFilterClick(_index) {
    const { filters } = this.state;
    const updatedFilters = DataList.getFilters(filters, _index);
    this.setState({ filters: updatedFilters });
  }

  onItemClick(id) {
    const { items } = this.state;
    const { onSelect, onUnselect } = this.props;
    const item = find(items, { _index: id });
    const eventHandler = item._selected ? onUnselect : onSelect;
    if (typeof eventHandler === 'function') {
      eventHandler(item._source);
    }
  }

  onItemCheck(id) {
    const { items } = this.state;
    const idx = items.findIndex(c => c._index === id);
    const updatedItem = { ...items[idx], _checked: !items[idx]._checked };
    const updatedItems = [...items];
    updatedItems[idx] = updatedItem;

    this.setState({ items: updatedItems }, this.onChange);
  }

  onHeaderCheckboxChange(value) {
    const { items } = this.state;
    const { checkable } = this.props;
    const setCheckIfCheckable = _checked => item => ({
      ...item,
      _checked: DataList.isCheckable(checkable, item) ? _checked : false,
    });

    this.setState(
      {
        items: items.map(setCheckIfCheckable(value)),
      },
      this.onChange
    );
  }

  onChange() {
    const { items } = this.state;
    const { onCheck } = this.props;
    const sourceCheckedItems = items.filter(item => item._checked).map(item => item._source);

    onCheck(sourceCheckedItems);
  }

  onPageClick(selectedPage) {
    this.setState({ selectedPage });
  }

  render() {
    const { flex, isPending, noData, errorMsg, hasError, checkable, paginatorSize } = this.props;
    const { items, sortAsc, sortColumn, filters, selectedPage } = this.state;

    const className = utils.composeClassNames([
      'mb-element',
      'el-datalist',
      flex && 'el-datalist--flexible',
    ]);

    const checkableItems = items.filter(item => DataList.isCheckable(checkable, item));
    const isAllChecked = checkableItems.length > 0 && checkableItems.every(DataList.isItemChecked);
    const isSomeChecked = checkableItems.length > 0 && checkableItems.some(DataList.isItemChecked);

    let content;
    if (isPending) {
      content = <Pending />;
    } else if (hasError) {
      content = <ErrorMessage message={errorMsg} />;
    } else if (items.length === 0 && filters.length === 0) {
      content = <NoData message={noData} />;
    } else {
      let paginator;
      let data = items;

      if (this._pageSize > 0) {
        data = DataList.getVisibleItems(data);
        const pages = DataList.getAmountOfPages(this._pageSize, data);

        if (pages > 1 && selectedPage >= 1 && selectedPage <= pages) {
          const start = (selectedPage - 1) * this._pageSize;
          data = data.slice(start, start + this._pageSize);

          paginator = (
            <Paginator
              key="datalist-paginator"
              count={paginatorSize}
              pages={pages}
              selectedPage={selectedPage}
              onPageClick={this.onPageClick}
            />
          );
        }
      }

      content = [
        <Header
          key="datalist-header"
          columns={this._columns}
          sortColumn={sortColumn}
          sortAsc={sortAsc}
          onSortClick={this.onSortClick}
          filters={filters}
          checked={isAllChecked}
          semiChecked={isSomeChecked}
          disabledCheck={checkableItems.length === 0}
          onCheckboxChange={this.onHeaderCheckboxChange}
          onFilterChange={this.onFilterChange}
          onFilterBlur={this.onFilterBlur}
          onFilterClick={this.onFilterClick}
        />,
        <Rows key="datalist-rows" items={data} columns={this._columns} onItemClick={this.onItemClick} />,
        paginator,
      ];
    }

    return <div className={className}>{content}</div>;
  }
}

DataList.defaultProps = {
  flex: true,
  pageSize: undefined,
  paginatorSize: 7,
  columns: [],
  list: [],
  sortAsc: true,
  sortColumn: undefined,
  isPending: false,
  hasError: false,
  selected: undefined,
  checked: undefined,
  checkable: undefined,
  noData: 'No items',
  errorMsg: 'There was an error',
  onSelect: undefined,
  onUnselect: undefined,
  onCheck: undefined,
  onFilter: undefined,
};

DataList.propTypes = {
  flex: PropTypes.bool,
  pageSize: PropTypes.number,
  paginatorSize: PropTypes.number,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      disableTooltip: PropTypes.bool,
      label: PropTypes.string,
      key: PropTypes.string,
      func: PropTypes.func,
      className: PropTypes.string,
      link: PropTypes.func,
      sortable: PropTypes.bool,
      searchable: PropTypes.bool,
    })
  ),
  list: PropTypes.arrayOf(PropTypes.shape()),
  sortAsc: PropTypes.bool,
  sortColumn: PropTypes.string,
  isPending: PropTypes.bool,
  hasError: PropTypes.bool,
  selected: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape(),
    PropTypes.arrayOf(PropTypes.shape()),
  ]),
  checked: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.shape())]),
  checkable: PropTypes.func,
  noData: PropTypes.string,
  errorMsg: PropTypes.string,
  onSelect: PropTypes.func,
  onUnselect: PropTypes.func,
  onCheck: PropTypes.func,
  onFilter: PropTypes.func,
};

export default DataList;

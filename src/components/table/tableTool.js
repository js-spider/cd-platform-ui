import Vue from 'vue';
import moment from 'moment';
import { Badge } from 'ant-design-vue';
import { get } from 'lodash/object';

moment.locale('zh-cn');
const tableInnerVue = new Vue({
  components: { Badge },
});


const handleStatusHandle = (colItem) => {
  if (!colItem.customRender && !colItem.scopedSlots) {
    const {
      colors, pointColors, link, dataIndex,
    } = colItem;
    colItem.customRender = (text, record) => {
      const keys = Object.keys(colors || pointColors);
      const dIndex = link || dataIndex;
      const valueOfDIndex = get(record, dIndex);
      const findIt = keys.filter((it) => record[valueOfDIndex] === it);
      let formatData = text;
      if (findIt.length) {
        const h = tableInnerVue.$createElement;
        if (colItem.colors) {
          const color = colors[findIt[0]];
          formatData = h('span', { style: { color } }, text);
        } else if (colItem.pointColors) {
          const color = pointColors[findIt[0]];
          formatData = h('Badge', { props: { status: color, text } });
        }
      }
      return formatData;
    };
    delete colItem.color;
    delete colItem.link;
  }
};

const dateFormatHandle = (colItem) => {
  let customRender = null;
  if (colItem.fromNow) {
    customRender = (text, record) => {
      const valueOFDIndex = get(record, colItem.dataIndex);
      const dateFormat = moment(valueOFDIndex).fromNow();
      return dateFormat;
    };
    delete colItem.fromNow;
  } else if (colItem.format) {
    const { format } = colItem;
    const curFormat = format === true ? 'YYYY-MM-DD HH-mm-ss' : format;
    customRender = (text, record) => {
      const valueOFDIndex = get(record, colItem.dataIndex);
      const dateFormat = moment(valueOFDIndex).format(curFormat);
      return dateFormat;
    };
    delete colItem.format;
  }
  if (customRender) {
    colItem.customRender = customRender;
  }
};

const checkMapHandle = (colItem) => {
  const { link, dataIndex, map } = colItem;
  colItem.customRender = (text, record) => {
    const valueOfDIndex = get(record, link || dataIndex);
    const result = map.find((item) => item[0] === valueOfDIndex);
    return result ? result[1] : '';
  };
  delete colItem.map;
};

const checkClickHandle = (colItem) => {
  colItem.customRender = (text, record) => {
    const h = tableInnerVue.$createElement;
    return h('a', { on: { click: () => colItem.click(text, record) } }, text);
  };
};

const reducers = [
  function checkStatus(colItem) {
    if (typeof colItem.colors === 'object' || typeof colItem.pointColors === 'object') {
      handleStatusHandle(colItem);
    }
  },
  function checkDate(colItem) {
    if (colItem.fromNow || colItem.format) {
      dateFormatHandle(colItem);
    }
  },
  function checkMap(colItem) {
    if (colItem.map) {
      checkMapHandle(colItem);
    }
  },
  function checkClick(colItem) {
    if (typeof colItem.click === 'function') {
      checkClickHandle(colItem);
    }
  },
];


export const formatColumns = (columns) => {
  columns.forEach((item) => {
    reducers.reduce((result, reducer) => reducer(item), () => {});
  });
  console.log('tableTool.js: 39 >>>>> ', columns);
  return columns;
};

export default {};

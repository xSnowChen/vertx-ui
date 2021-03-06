import U from 'underscore';
import Log from '../monitor/Mt.Logger';

/**
 * 读取Tabular专用数据，读取所有数据，一般用于Rxjs
 * @method rxDatum
 * @param data 从响应数据中读取
 * @param orderBy 排序字段
 */
const rxDatum = (data, orderBy = 'order') => {
    const result = {};
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const hittedKey = `tabular.${key.replace(/\./g, '_')}`;
            result[hittedKey] = data[key].sort((left, right) => left[orderBy] - right[orderBy]);
        }
    }
    Log.debug(result, data);
    return result;
};
/**
 * 读取Assist专用数据，指定某个key，一般用于Rxjs
 * @method rxAssist
 * @param data 从数据中转换
 * @param orderBy 排序字段
 * @param key
 */
const rxAssist = (data, key, orderBy = 'order') => {
    const result = {};
    const hittedKey = `assist.${key.replace(/\./g, '_')}`;
    if (!U.isArray(data)) {
        if (data.list) {
            data = data.list;
        } else {
            data = [];
        }
    }
    result[hittedKey] = data.sort((left, right) => left[orderBy] - right[orderBy]);
    Log.debug(result, data);
    return result;
};
const rxData = (data) => ({"datum.data": data});
const rxGrid = (data) => ({"grid.list": data});
const rxCircle = (data) => ({"grid.circle": data});
const rxTree = (data) => ({"grid.tree": U.isArray(data) ? data : (U.isArray(data.list) ? data.list : [])});
const rxFilter = (data) => ({"grid.query": data});

export default {
    rxDatum,
    rxAssist,
    rxData,
    rxGrid,
    rxFilter,
    rxTree,
    // TreeTable组件专用
    rxCircle,
};

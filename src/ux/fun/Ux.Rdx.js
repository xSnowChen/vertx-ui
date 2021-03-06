import E from "../Ux.Error";
import U from "underscore";
import Prop from "../prop/";
import Dialog from "../Ux.Dialog";
import Op from '../op';
import Value from '../Ux.Value';

const rdxSubmitting = (reference, loading = true) => {
    // 写Redux中的status.submitting的前提是reference.props中包含了$submitting变量
    const state = {};
    state[`status.submitting`] = {loading};
    const $state = Value.clone(state);
    Prop.writeTree(reference, $state);
    // FIX：解决双重提交的Bug，修改掉reference中的loading状态，保证非Redux也生效
    reference.setState({$loading: loading});
};
const rdxReject = (message) => Promise.reject({data: {info: message}});
/**
 * 专写方法，更新list.items
 * @param reference
 * @param values
 * @param addKey
 */
const rdxListItem = (reference, values = {}, addKey) => {
    const {fnListItem} = reference.props;
    //E.fxTerminal(!fnListItem, 10087, fnListItem);
    if (U.isFunction(fnListItem)) {
        const ref = Prop.onReference(reference, 1);
        if (ref) {
            const key = Prop.itemKey(ref);
            // 是否包含了 $inited.key
            if (key) {
                fnListItem(key, values);
            } else {
                // 传入了添加的addKey
                if (addKey) {
                    fnListItem(addKey, values);
                }
            }
        }
    }
};
const rdxClear = (reference) => {
    const {fnClear} = reference.props;
    E.fxTerminal(!fnClear, 10086, fnClear);
    if (U.isFunction(fnClear)) {
        fnClear();
    }
};
const rdxTree = (reference, values, isDeleted = false) => {
    const treeData = Op.pipeTree(reference, values, isDeleted);
    Prop.writeTree(reference, {"grid.tree": treeData});
};
const rdxClose = (reference) => {
    rdxClear(reference);
    Dialog.closeWindow(reference);
};
export default {
    // 防重复提交专用方法，写status.submitting节点
    rdxSubmitting,
    // 返回Promise的reject结果
    rdxReject,
    // 更新特殊节点list.items，调用fnListItem方法
    rdxListItem,
    // 更新Tree相关节点专用
    rdxTree,
    // 清除editKey，调用fnClear方法
    rdxClear,
    // 关闭窗口专用，调用fnClose方法
    rdxClose,
};
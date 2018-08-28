import ENV from "./Ux.Env";
import AJAX from "./Ux.Ajax";
import LOGGER from "./Ux.Log";
import JSX from "./Ux.Jsx";
import OP from "./Ux.Op";
import NORM from "./Ux.Normalize";
import TYPES from "./Ux.Type";
import COLUMN from "./Ux.Column";
import DIALOG from "./Ux.Dialog";
import VALUE from "./Ux.Value";
import AI from './ai/AI';
import CHART from './Ux.Chart';
import TERMINAL from './Ux.Terminal';
import FORM from './Ux.Form';
import CONTROL from './jt/Jt';
import Uarr from "./structure/Ux.Uarr";
import Uson from "./structure/Ux.Uson";
import E from './Ux.Error';

import Util from './util';
import Prop from './prop';
import Fun from './fun';
import Op from './op';
import System from './system'
import Trigger from './trigger'

export default {
    ...CONTROL,
    // 优化Form处理
    ...FORM,
    // 专用打断
    ...TERMINAL,
    // 图表专用
    ...CHART,
    // 列处理
    ...COLUMN,
    // 环境变量
    ...ENV,
    // Ajax函数
    ...AJAX,
    // Log函数
    Logger: LOGGER,
    E,
    // JSX渲染
    ...JSX,
    // OP操作
    ...OP,
    // Normalize 标准化
    ...NORM,
    // 类型处理
    ...TYPES,
    // Redux专用
    ...DIALOG,
    // Uson/Uarr
    ...VALUE,
    // 新组件用于AI化处理
    ...AI,
    Uarr,
    Uson,
    /**
     * 触发控件专用
     */
    ...Trigger,
    /**
     * Global全局数据处理
     */
    ...System,
    /**
     * Action Run专用,
     * 按钮Connect专用
     * On绑定专用
     * pipe 专用方法
     */
    ...Op,
    /**
     * rdx - 系列方法
     * rt - Ajax响应处理专用方法
     * ir - 分页列表系列方法
     * parse - 解析专用
     */
    ...Fun,
    /**
     * Attribute：属性处理
     * Field：异步验证
     * Form：Ant Design Form中的相关操作
     * Hoc：高阶组件专用方法
     * State：状态处理
     * Prop：属性处理
     * Validator：验证器处理
     */
    ...Prop,
    /**
     * Encrypt：加密库
     * Format：Format格式化
     * Random：随机数生成
     * Sorter：列排序专用
     * Expr：表达式格式化
     * Sign：签名处理
     * Html：专用Html属性处理
     * Icon：图标处理
     */
    ...Util,
};

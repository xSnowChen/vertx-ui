import Prop from '../prop';
import Sure from './Ai.Stream.Sure';
import Meta from './Ai.Stream.Tab.json';
import Ai from '../ai/AI';
import Value from '../Ux.Value';
import React from 'react';
import {Button} from 'antd';
import U from 'underscore';

const aiExpr = (reference) => {
    // 读取Hoc配置信息
    let tabs = Prop.fromHoc(reference, "tabs");
    tabs = Value.clone(tabs);
    if ("string" === typeof tabs) {
        // 最简化的操作
        tabs = Ai.aiExprTabs(tabs.split(','));
    } else {
        if (U.isArray(tabs.items)) {
            tabs.items = Ai.aiExprTabs(tabs.items);
        }
    }
    // tabBarExtraContent解析（和PageCard一致）
    if (tabs.tabBarExtraContent) {
        const content = Ai.aiExprButton(tabs.tabBarExtraContent, reference.props);
        const fnSingle = (item = {}) => {
            const {text, disabledKey, ...rest} = item;
            // 必须包含activeState
            if (reference.state && tabs.activeState) {
                const key = reference.state[tabs.activeState];
                rest.disabled = key !== disabledKey;
            }
            return (<Button {...rest}>{text}</Button>);
        };
        if (0 < content.length) {
            if (1 === content.length) {
                tabs.tabBarExtraContent = fnSingle(content[0]);
            } else {
                tabs.tabBarExtraContent = (
                    <Button.Group>
                        {content.map(fnSingle)}
                    </Button.Group>
                );
            }
        }
    }
    return tabs;
};

class Tab {
    constructor(reference) {
        this.reference = reference;
        this._extraVisible = true;  // 默认显示
    }

    init() {
        this.config = aiExpr(this.reference);
        if (!this.config) this.config = {};
        this.config = Value.clone(this.config);
        return this;
    }

    disabled(disabled = [], byKey = false) {
        Sure.ensureStream(this);
        const {items = []} = this.config;
        items.forEach((item, index) => {
            // 两种运算
            if (byKey) {
                // byKey的时候，disabled里面是key
                const $disabled = Value.immutable(disabled);
                item.disabled = $disabled.contains(item.key);
            } else {
                item.disabled = !!disabled[index];
            }
        });
        return this;
    }

    mount(target = "", value) {
        const configRef = this.config;
        Sure.itSwitch(target, value, (k, v) => configRef[k] = v, Meta.supported.tabs);
        return this;
    }

    type(value) {
        this.config.type = value;
        return this;
    }

    add(tabs) {
        if (tabs) {
            const itemRef = this.config.items;
            if (U.isArray(tabs)) {
                tabs.forEach(item => itemRef.push(item));
            } else {
                itemRef.push(tabs);
            }
        }
        return this;
    }

    extra(value) {
        this.config.tabBarExtraContent = value;
        return this;
    }

    extraVisible(visible = true) {
        this._extraVisible = visible;
        return this;
    }

    switch(fnSwitch) {
        if (U.isFunction(fnSwitch)) {
            this.config.onTabChange = fnSwitch;
        }
        return this;
    }

    connect(tabs) {
        if (tabs && 0 < tabs.length) {
            tabs = tabs.filter(item => "string" === typeof item);
            const $tabs = Value.immutable(tabs);
            this._filter = (item) => $tabs.contains(item.key);
        }
        return this;
    }

    onChange(fnChange) {
        if (U.isFunction(fnChange)) {
            this.config.onChange = fnChange;
        }
        return this;
    }

    to(...children) {
        Sure.ensureStream(this);
        const {items = [], activeState, ...rest} = this.config;
        let $items = items;
        if (this._filter) {
            $items = $items.filter(this._filter);
        }
        const fnOriginal = rest['onChange'];
        if (activeState) {
            rest.onChange = (item) => {
                // 变更Key
                let state = this.reference.state;
                state[activeState] = item;
                state = Value.clone(state);
                this.reference.setState(state);
                if (U.isFunction(fnOriginal)) {
                    fnOriginal(item);
                }
            };
        }
        // 如果长度为1
        const jsx = [];
        if (1 === children.length) {
            if (U.isArray(children[0])) {
                children[0].forEach(child => jsx.push(child));
            } else {
                jsx.push(children[0]);
            }
        } else {
            children.forEach(child => jsx.push(child));
        }
        // 是否显示
        if (!this._extraVisible && rest.hasOwnProperty('tabBarExtraContent')) {
            delete rest.tabBarExtraContent;
        }
        return Ai.aiTabs.apply(null, [$items, rest]
            .concat(jsx));
    }
}

export default Tab;
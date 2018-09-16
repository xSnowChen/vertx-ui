import Init from "./Op.Init";

const isPreAdd = (reference, item) => {
    const options = Init.readOptions(reference);
    const level = options.hasOwnProperty("tree.level") ? options['tree.level'] : 1000;
    if (isDialog(reference)) {
        return (item._level <= level);
    } else {
        const {iKey} = reference.state;
        return !iKey && (item._level <= level);
    }
};
const isPreEdit = (reference, item) => {
    if (isDialog(reference)) {
        return "_ROOT_" !== item.key;
    } else {
        const {iKey} = reference.state;
        return !iKey && "_ROOT_" !== item.key;
    }
};
const isFast = (reference, item) => {
    if (isDialog(reference)) {
        return false;
    } else {
        const {iKey} = reference.state;
        return iKey === item.key;
    }
};
const isVisible = (reference, item, isAdd = true) => {
    const {iKey, iAdd} = reference.state;
    return iKey === item.key && iAdd === isAdd;
};
const isDialog = (reference) => {
    const options = Init.readOptions(reference);
    return options["tree.dialog.mode"];
};

export default {
    isDialog,
    isFast,
    isPreAdd,
    isPreEdit,
    isVisible
}
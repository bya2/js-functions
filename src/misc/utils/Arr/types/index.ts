import IAscending from "./IAscending";
import IMovable from "./IMovable";
import ISet from "./ISet";

type IArr<T> = IMovable<T> & ISet;

export default IArr;

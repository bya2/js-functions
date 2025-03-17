import IASCII from "./IASCII";
import { IBinary32 } from "./IBinary";
import IComparable from "./IComparable";
import IComposite from "./IComposite";
import ISaturating from "./ISaturating";

export default interface INum
  extends IASCII,
    IBinary32,
    IComparable,
    IComposite,
    ISaturating {}

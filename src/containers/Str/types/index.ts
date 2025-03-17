import { IEnclose } from "../IEnclose";
import IEng from "./IEng";
import IKor from "./IKor";

type IStr = IEnclose &
  IEng &
  IKor & {
    isPalindrome(): boolean;
    max(deleteCount: number): number;
    mid(): string;
  };

export default IStr;

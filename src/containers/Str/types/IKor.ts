interface IKorString {}

interface IKorWord {}

interface IKorSentence {}

type IKor = IKorString & IKorWord & IKorSentence;

export default IKor;

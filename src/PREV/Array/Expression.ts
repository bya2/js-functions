export default class Expression extends Array<string | number> {
  /**
   * 피연산자의 타입을 정수형으로 변환
   */
  convertOperandsToNumber() {
    for (let i = 0, len = this.length; i < len; ++i) {
      if (typeof +this[i] === "number") this[i] = +this[i];
    }
  }

  /**
   * 인덱스에 따라 산술 계산
   * @param this 연산자(string)와 피연산자(number)로 이루어진 배열
   * @param index 위치
   */
  calculate(index: number): void {
    const operator = this[index];
    const operand1 = this[index - 1] as number;
    const operand2 = this[index + 1] as number;
    switch (operator) {
      case "+":
        this.splice(index - 1, 3, operand1 + operand2);
        break;
      case "-":
        this.splice(index - 1, 3, operand1 - operand2);
        break;
      case "*":
        this.splice(index - 1, 3, operand1 * operand2);
        break;
      case "/":
        this.splice(index - 1, 3, operand1 / operand2);
        break;
      case "%":
        this.splice(index - 1, 3, operand1 % operand2);
        break;
    }
  }

  /**
   * 연산자의 순서에 따라 산술 계산한 결과를 리턴
   * @param order 사용할 연산자의 순서
   * @param dict 각 연산자의 남은 갯수
   */
  getCalculation(order: string | string[], dict: { [key: string]: number }): number {
    if (typeof order === "string") {
      order = [...order];
    }

    for (const operator of order) {
      for (let i = 1; i < this.length; ) {
        if (this[i] === operator) {
          this.calculate(i);
          if (dict[operator] === 0) break;
          continue;
        }
        i += 2;
      }
    }

    return this[0] as number;
  }
}

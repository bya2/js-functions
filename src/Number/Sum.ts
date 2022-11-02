export default class Sum {
  /**
   * 'from'부터 'to'까지의 합을 리턴
   * @param _from
   * @param _to
   */
  static between(_from: number, _to: number): number {
    return ((_from + _to) * (Math.abs(_from - _to) + 1)) / 2;
  }

  /**
   * 'value'까지의 합을 리턴
   * @param _value
   * @param _cost
   */
  static upTo(_value: number, _cost: number = 1): number {
    return ((_value * (_value + 1)) / 2) * _cost;
  }
}

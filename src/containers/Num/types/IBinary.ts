export interface IBinary32 {
  /**
   *
   */
  countZeros(): number;

  /**
   *
   */
  countOnes(): number;
  countLeadingZeros(): number;
  countLeadingOnes(): number;
  countTrailingZeros(): number;
  countTrailingOnes(): number;
}

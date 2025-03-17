// 진약수: 어떤 자연수를 n이라고 할 때 n n의 약수 중 n n을 제외한 모든 약수

// 최대공약수

// function approximatedSqrt(n: number): number {
//   let numBits =
// }

// export function getDivisors(n: number): number[] {
//   let _0 = 0;
//   let _1 = 1;
//   let _2 = 2;

//   let _n = n;
//   let v: number[] = [];

//   let countFactor2 = 0;
//   while ((n & 1) === 0) {
//     v.push(2 << countFactor2);
//     ++countFactor2;
//     _n >>= 1;
//   }

//   let x = 3;
//   let;
// }

interface IDivisible {
  divisors(): number[];
}

// pub fn approximated_sqrt<T: Num>(n: T) -> T {
//   let _0: T = T::zero();
//   let _1: T = T::one();
//   let mut num_bits = (std::mem::size_of::<T>() << 3) - 1;
//   while ((n >> num_bits) & _1) == _0 {
//       num_bits -= 1;
//   }

//   _1 << ((num_bits >> 1) + 1)
// }

import process from "node:process";

const obj = {
  byte: 0,
  kb: 1,
  mb: 2,
  gb: 3,
  tb: 4,
};

// # 메모리
// 입력
// - 단위
// -

class Memory {
  constructor(unit: string) {
    const dict = {
      kb: 1,
      mb: 2,
      gb: 3,
      tb: 4,
    };
  }
}

type TUnit = "";

class MemoryUsage {
  divisor: number;

  constructor(unit: number) {
    this.divisor = unit;
  }

  now(): NodeJS.MemoryUsage {
    const usage = { ...process.memoryUsage() };
    for (const [k, v] of Object.entries(usage)) {
      usage[k] = v / this.divisor;
    }
    return usage;
  }

  // `heapTotal` and `heapUsed` refer to V8's memory usage.
  // V8의 메모리 사용량을 나타냅니다.

  // `external` refers to the memory usage of C++ objects bound to JavaScript objects managed by V8.
  // V8에서 관리하는 JavaScript 객체에 바인딩된 C++ 객체의 메모리 사용량을 나타냅니다.

  // rss, Resident Set Size, is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the process, including all C++ and JavaScript objects and code.
  // rss(Resident Set Size)는 모든 C++ 및 JavaScript 객체와 코드를 포함하여 프로세스의 주 메모리 장치(할당된 총 메모리의 하위 집합)에서 차지하는 공간의 양입니다.

  /**
   * arrayBuffers refers to memory allocated for ArrayBuffers and SharedArrayBuffers, including all Node.js Buffers. This is also included in the external value. When Node.js is used as an embedded library, this value may be 0 because allocations for ArrayBuffers may not be tracked in that case.
   * arrayBuffers는 모든 Node.js 버퍼를 포함하여 ArrayBuffers 및 SharedArrayBuffers에 할당된 메모리를 참조합니다.
   * 이 값은 외부 값에도 포함됩니다.
   * Node.js를 임베디드 라이브러리로 사용하는 경우 이 값은 0이 될 수 있는데, 이 경우 ArrayBuffers 할당을 추적하지 못할 수 있기 때문입니다.
   */
  get rss() {
    return process.memoryUsage.rss();
  }
}

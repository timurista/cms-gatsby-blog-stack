import { instantiateStreaming } from "assemblyscript/lib/loader";
import { useEffect, useState } from "react";

// example file: for ml in browser
// https://github.com/YeasterEgg/kmeans-plusplus

// function fibonacci(num: any) {
//   var a = 1,
//     b = 0,
//     temp;

//   while (num >= 0) {
//     temp = a;
//     a = a + b;
//     b = temp;
//     num--;
//   }

//   return b;
// }

async function loadWasm() {
  const imports = {};
  const response = await fetch("/untouched.wasm");
  const wasmModule: any = await instantiateStreaming(response, imports);
  //   console.time();
  //   console.log(wasmModule, wasmModule.add(1, 2));
  //   console.log(wasmModule, wasmModule.fib(10000020));
  //   console.timeEnd();

  //   console.time();
  //   console.log(fibonacci(10000020));
  //   console.timeEnd();

  return wasmModule;
}

export function AssemblyScriptExample() {
  const [res, setRes] = useState();
  useEffect(() => {
    loadWasm().then(setRes);
  }, [setRes]);
  if (res) {
    console.log("WASM MODULE IN BROWSER!", res.add);
  }
  return null;
}

export default AssemblyScriptExample;

export function createLogger(name) {
  return function ({}:any){
    console.log(`🏞️ [@${name}]`, ...arguments)
  }
}

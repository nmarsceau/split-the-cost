package main

import "syscall/js"

func main() {
	done := make(chan struct{}, 0)
	js.Global().Set("wasmSplitCost", js.FuncOf(splitCost))
	<-done
}

func splitCost(this js.Value, args []js.Value) interface{} {
	participants := args[0]
	return map[string]interface{}{
		"value I received": args[0].String(),
	}
}

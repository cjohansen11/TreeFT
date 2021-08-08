package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("../client/dist"))
	http.Handle("/", fs)

	log.Println("Starting server on port 3000")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("Error:", err)
	}
}

package services

import (
	"fmt"
	"github.com/Yaon-C2H8N2/go-glusterfs/pkg/eventListener"
	"github.com/gin-gonic/gin"
	"net/http"
	"sync"
)
import "github.com/gorilla/websocket"

func MapEventRoutes(router *gin.Engine) {
	router.GET("/events/socket", GetSocket)
	router.GET("/events/test", TestNotify)
}

func InitEventService(listener *eventListener.EventListener) {
	onPeerUpdate := func(event eventListener.PeerEvent) {
		fmt.Printf("Peer event: %v\n", event)
		broadcastPeerEvent(event)
	}
	onVolumeUpdate := func(event eventListener.VolumeEvent) {
		fmt.Printf("Volume event: %v\n", event)
		broadcastVolumeEvent(event)
	}
	listener.OnPeerUpdate = onPeerUpdate
	listener.OnVolumeUpdate = onVolumeUpdate
}

func broadcastVolumeEvent(event eventListener.VolumeEvent) {
	for client := range clients {
		err := client.WriteJSON(event)
		if err != nil {
			client.Close()
			delete(clients, client)
		}
	}
}

func broadcastPeerEvent(event eventListener.PeerEvent) {
	for client := range clients {
		err := client.WriteJSON(event)
		if err != nil {
			client.Close()
			delete(clients, client)
		}
	}
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}
var mutex = &sync.Mutex{}
var clients = make(map[*websocket.Conn]bool)

func GetSocket(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(500, gin.H{
			"message": "Failed to upgrade connection",
			"error":   err.Error(),
		})
		return
	}

	mutex.Lock()
	clients[conn] = true
	mutex.Unlock()
	for {
		//keep the connection alive
		_, _, err := conn.ReadMessage()
		if err != nil {
			break
		}
	}
	conn.Close()
	mutex.Lock()
	delete(clients, conn)
	mutex.Unlock()

	c.JSON(200, gin.H{
		"message": "GetSocket",
	})
}

var testListener *eventListener.EventListener

func SetTestListener(listener *eventListener.EventListener) {
	testListener = listener
}

func TestNotify(c *gin.Context) {
	event := eventListener.VolumeEvent{
		Type: eventListener.VOLUME_CREATE,
	}
	testListener.OnVolumeUpdate(event)
	c.JSON(200, gin.H{
		"message": "TestNotify",
	})
}

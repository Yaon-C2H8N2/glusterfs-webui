package main

import (
	"github.com/Yaon-C2H8N2/glusterfs-webui/services"
	"github.com/Yaon-C2H8N2/go-glusterfs/pkg/eventListener"
	"github.com/gin-gonic/gin"
)

func main() {
	glusterEventListener := eventListener.Default()
	glusterEventListener.SetPollingTimeout(100)
	router := gin.Default()

	services.MapPeerRoutes(router)
	services.MapVolumeRoutes(router)
	services.MapEventRoutes(router)
	services.InitEventService(&glusterEventListener)

	err := glusterEventListener.Start()
	if err != nil {
		panic(err)
	}

	err = router.Run(":8081")
	if err != nil {
		panic(err)
	}
}

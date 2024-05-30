package main

import (
	"github.com/Yaon-C2H8N2/glusterfs-webui/services"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	services.MapPeerRoutes(router)
	services.MapVolumeRoutes(router)
	err := router.Run(":8080")
	if err != nil {
		panic(err)
	}
}

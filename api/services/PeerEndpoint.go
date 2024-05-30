package services

import (
	"github.com/Yaon-C2H8N2/go-glusterfs/pkg/peer"
	"github.com/gin-gonic/gin"
)

func MapPeerRoutes(router *gin.Engine) {
	router.GET("/peers", ListPeers)
}

func ListPeers(c *gin.Context) {
	peers, err := peer.ListPeers()

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Failed to list peers",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "ListPeers",
		"peers":   peers,
	})
}

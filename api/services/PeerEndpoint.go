package services

import (
	"github.com/Yaon-C2H8N2/glusterfs-webui/models"
	"github.com/Yaon-C2H8N2/go-glusterfs/pkg/brick"
	"github.com/Yaon-C2H8N2/go-glusterfs/pkg/peer"
	"github.com/Yaon-C2H8N2/go-glusterfs/pkg/volume"
	"github.com/gin-gonic/gin"
)

func MapPeerRoutes(router *gin.Engine) {
	router.GET("/peers", ListPeers)
	router.GET("/peer/:hostname", PeerInfo)
	router.POST("/peers/probe", ProbePeer)
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

func ProbePeer(c *gin.Context) {
	var body models.PeerProbRequest
	err := c.BindJSON(&body)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid request",
			"error":   err.Error(),
		})
		return
	}
	err = peer.PeerProbe(body.Hostname)
	if err != nil {
		c.JSON(500, gin.H{
			"message": "Failed to probe peer",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "ProbePeer",
	})
}

func PeerInfo(c *gin.Context) {
	hostname, _ := c.Params.Get("hostname")
	peers, err := peer.ListPeers()
	if err != nil {
		c.JSON(500, gin.H{
			"message": "Failed to get peer info",
			"error":   err.Error(),
		})
		return
	}

	resultPeer := peer.Peer{}
	for _, p := range peers {
		if p.Hostname == hostname {
			resultPeer = p
			break
		}
	}

	if resultPeer.Hostname == "" {
		c.JSON(404, gin.H{
			"message": "Peer not found",
		})
		return
	}

	bricks := []brick.Brick{}
	volumes, err := volume.ListVolumes()
	for _, vol := range volumes {
		for _, brick := range vol.Bricks {
			if brick.Peer.Hostname == resultPeer.Hostname {
				bricks = append(bricks, brick)
				break
			}
		}
	}

	c.JSON(200, gin.H{
		"message": "PeerInfo",
		"peer":    resultPeer,
		"bricks":  bricks,
	})
}

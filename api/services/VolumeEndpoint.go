package services

import (
	"github.com/Yaon-C2H8N2/go-glusterfs/pkg/volume"
	"github.com/gin-gonic/gin"
)

func MapVolumeRoutes(router *gin.Engine) {
	router.GET("/volumes", ListVolumes)
	router.GET("/volumes/:name", GetVolume)
}

func ListVolumes(c *gin.Context) {
	volumes, err := volume.ListVolumes()
	if err != nil {
		c.JSON(500, gin.H{
			"message": "Failed to list volumes",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "ListVolumes",
		"volumes": volumes,
	})
}

func GetVolume(c *gin.Context) {
	volumeName, _ := c.Params.Get("name")
	vol, err := volume.GetVolume(volumeName)
	if err != nil {
		c.JSON(500, gin.H{
			"message": "Failed to get volume",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "GetVolume",
		"volume":  vol,
	})
}

package services

import (
	"github.com/Yaon-C2H8N2/glusterfs-webui/models"
	"github.com/Yaon-C2H8N2/go-glusterfs/pkg/volume"
	"github.com/gin-gonic/gin"
)

func MapVolumeRoutes(router *gin.Engine) {
	router.GET("/volumes", ListVolumes)
	router.GET("/volumes/:name", GetVolume)
	router.GET("/volumes/:name/:status", ChangeVolumeStatus)
	router.POST("/volumes/create", CreateVolume)
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

func CreateVolume(c *gin.Context) {
	var vol models.CreateVolumeRequest
	err := c.BindJSON(&vol)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Failed to bind JSON",
			"error":   err.Error(),
		})
		return
	}
	createdVol, err := volume.CreateReplicatedVolume(vol.Name, vol.Bricks)
	if err != nil {
		c.JSON(500, gin.H{
			"message": "Failed to create volume",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "CreateVolume",
		"volume":  createdVol,
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

func ChangeVolumeStatus(c *gin.Context) {
	volumeName, _ := c.Params.Get("name")
	status, _ := c.Params.Get("status")
	vol, err := volume.GetVolume(volumeName)
	var actions = map[string]func() error{
		"start": vol.Start,
		"stop":  vol.Stop,
	}
	if err != nil {
		c.JSON(500, gin.H{
			"message": "Failed to get volume",
			"error":   err.Error(),
		})
		return
	}
	err = actions[status]()
	if err != nil {
		c.JSON(500, gin.H{
			"message": "Failed to change volume status",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "ChangeVolumeStatus",
	})
}

package models

import "github.com/Yaon-C2H8N2/go-glusterfs/pkg/brick"

type CreateVolumeRequest struct {
	Name   string        `json:"name"`
	Type   string        `json:"type"`
	Bricks []brick.Brick `json:"bricks"`
}

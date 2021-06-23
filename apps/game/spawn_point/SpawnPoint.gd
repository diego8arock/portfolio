extends Position2D

var direction setget , get_direction

onready var line = $Line2D
var screen_size

func _ready() -> void:
	screen_size = get_viewport_rect().size

func get_direction() -> Vector2:
	var point = to_global(line.points[1]).normalized()
	if point.x < screen_size.x or point.x > screen_size.x:
		point.x = point.x *-1
	if point.y < screen_size.y or point.y > screen_size.y:
		point.y = point.y *-1
	return point
	

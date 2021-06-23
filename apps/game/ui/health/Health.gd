extends NinePatchRect

onready var container = $HBoxContainer

var hit_points : Array

func _ready() -> void:
	for node in container.get_children():
		if "HP" in node.name:
			hit_points.push_back(node)
	#hit_points.invert()

func update_health(value) -> void:
	var counter = hit_points.size()
	for index in counter:
		if index > value - 1:
			var button : TextureButton = hit_points[index]
			button.disabled = true
		
	

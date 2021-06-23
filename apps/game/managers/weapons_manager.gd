extends Node

var weapons_container: Node2D

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


func add_weapon(_weapon) -> void:
	weapons_container.call_deferred("add_child", _weapon)

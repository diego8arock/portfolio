extends Node

var score = 0
var ui

func _ready() -> void:
	pass # Replace with function body.

func player_dead()-> void:
	print("game over")

func add_score(value) -> void:
	score += value
	ui.update_score(score)
	
func update_health(value) -> void:
	ui.update_health(value)

extends Control


onready var score_ui = $Score
onready var health_ui = $Health

func _ready() -> void:
	pass # Replace with function body.

func update_score(value) -> void:
	score_ui.update_score(value)

func update_health(value) -> void:
	health_ui.update_health(value)

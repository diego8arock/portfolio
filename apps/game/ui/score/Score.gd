extends NinePatchRect

onready var score_value = $HBoxContainer/ScoreValue

func _ready() -> void:
	pass # Replace with function body.

func update_score(value) -> void:
	score_value.text = str(value)

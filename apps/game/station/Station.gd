extends StaticBody2D

export var health = 50

func _ready() -> void:
	pass # Replace with function body.

func _on_Area2D_body_entered(body: Node) -> void:
	if body.is_in_group("asteroids"):
		health -= body.damage
		body.call_deferred("free")
	if health <= 0:		
		call_deferred("free")

extends RigidBody2D


onready var notifier = $VisibilityNotifier2D

export var speed : float = 200.0

var damage
var velocity = Vector2()

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	global_position += velocity * delta
	
func shoot(_position: Vector2, _rotation: Vector2):
	global_position = _position
	global_rotation = _rotation.angle() + deg2rad(90)
	velocity = _rotation * speed

func _on_VisibilityNotifier2D_screen_exited() -> void:
	call_deferred("free")

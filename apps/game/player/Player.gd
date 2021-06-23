extends KinematicBody2D

onready var bullet: PackedScene = preload("res://weapons/Bullet.tscn")
onready var muzzle = $Muzzle
onready var firerate = $FireRate

var direction: Vector2 = Vector2.UP
var velocity: Vector2
var rotation_speed: float = 2.0
var current_speed: float = 0.0
var max_speed: float = 5.0
var min_speed: float = -5.0
var acceleration: float = 2.5
var velocity_rotation: float = 0.0

export var health = 5 
export var damage = 3

func _ready() -> void:
	pass # Replace with function body.

func _process(delta: float) -> void:
	if Input.is_action_pressed("player_forward"):
		current_speed += acceleration * delta
		current_speed = clamp(current_speed, min_speed, max_speed)
	
	if Input.is_action_pressed("player_backwards"):
		current_speed -= acceleration * delta
		current_speed = clamp(current_speed, min_speed, max_speed)
		
	if Input.is_action_pressed("player_shoot") and firerate.time_left == 0:
		var new_bullet = bullet.instance()
		var shoot_direction = Vector2.UP.rotated(muzzle.global_rotation)
		new_bullet.shoot(muzzle.global_position, shoot_direction) 	
		new_bullet.damage = damage
		new_bullet.add_to_group("player_bullet")	
		WeaponsManager.add_weapon(new_bullet)
		firerate.start()
			
func _physics_process(delta: float) -> void:	
	look_at(get_global_mouse_position())
	rotation_degrees = rotation_degrees + 90
	direction = get_global_mouse_position() - self.position
	velocity = direction.normalized() * current_speed
	var distance = global_position.distance_to(get_global_mouse_position())
	if distance > 10:
		move_and_collide(velocity)

func _on_Area2D_body_entered(body: Node) -> void:
	if body.is_in_group("asteroids"):
		health -= body.damage
		GameManager.update_health(health)
	if health <= 0:
		GameManager.player_dead()
		call_deferred("free")

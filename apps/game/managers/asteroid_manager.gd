extends Node

onready var asteroid = preload("res://asteroids/Asteroid.tscn")

var max_asteroids = 5
var asteroids: Array
var asteroid_container: Node2D
var spawn_points: Array
var timer: Timer

func _ready() -> void:
	timer = Timer.new()
	timer.connect("timeout",self,"on_Timer_timeout")
	timer.one_shot = true
	timer.wait_time = 3
	add_child(timer)
	timer.start()

func _input(event: InputEvent) -> void:
	
	if event.is_action_pressed("add_asteroid"):
		print("add asteroid by input")
		create_asteroid()
			
func create_asteroid() -> void:
	randomize()
	var sp = spawn_points[randi() % spawn_points.size()]
	var new_asteroid = asteroid.instance()		
	asteroid_container.add_child(new_asteroid)
	new_asteroid.create('big', sp.global_position)
	new_asteroid.add_force(Vector2(rand_range(10,10),0), sp.direction * rand_range(8,12))	
	asteroids.push_back(new_asteroid)
	new_asteroid.add_to_group("asteroids")

func on_Timer_timeout() -> void:	
	if asteroids.size() < max_asteroids:
		print("add asteroid by timer")
		create_asteroid()
	timer.start()

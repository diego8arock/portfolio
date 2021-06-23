extends Node2D

onready var station = $Station

func _ready() -> void:
	AsteroidManager.asteroid_container = $AsteroidContainer
	WeaponsManager.weapons_container = $WeaponsContainer
	GameManager.ui = $UI
	var sp_containers = $SpawnPointsContainer.get_children()
	for container in sp_containers:
		var sps = container.get_children() 
		for sp in sps:
			AsteroidManager.spawn_points.push_back(sp)

func _input(event: InputEvent) -> void:
	if event.is_action_pressed("ui_cancel"):
		get_tree().quit()

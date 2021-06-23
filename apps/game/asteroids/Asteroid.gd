extends RigidBody2D

onready var sprite = $Sprite
onready var collision = $CollisionShape2D
onready var timer = $WrapfTimer

var health = 10
var damage = 1
var score = 10
var entered_screen = false
var screen_size
var extents
var textures = {'big': [
	"res://assets/meteors/meteor_detailedLarge.png",
	"res://assets/meteors/meteor_large.png",
	"res://assets/meteors/meteor_squareLarge.png",
	"res://assets/meteors/meteor_squareDetailedLarge.png"
	], 
	'small':[
	"res://assets/meteors/meteor_detailedSmall.png",
	"res://assets/meteors/meteor_small.png",
	"res://assets/meteors/meteor_squareDetailedSmall.png",
	"res://assets/meteors/meteor_squareSmall.png"
	]}

func _ready() -> void:
	randomize()
	screen_size = get_viewport_rect().size

func create(size, pos) -> void:
	var texture = load(textures[size][randi() % textures[size].size()])
	sprite.texture = texture
	extents = texture.get_size() / 2
	collision.shape.set_radius(min(texture.get_width()/2.7, texture.get_height()/2.7))
	global_position = pos

func _physics_process(delta: float) -> void:
	if entered_screen:
		global_position.x = wrapf(global_position.x,-extents.x,screen_size.x + extents.x)
		global_position.y = wrapf(global_position.y,-extents.y,screen_size.y + extents.y)	

func _on_VisibilityNotifier2D_screen_entered() -> void:
	timer.start()

func _on_WrapfTimer_timeout() -> void:
	entered_screen = true

func _on_Asteroid_body_entered(body: Node) -> void:
	if body.is_in_group("player_bullet"):
		health -= body.damage
		body.call_deferred("free")
		if health <= 0:
			GameManager.add_score(score)
			call_deferred("free")
